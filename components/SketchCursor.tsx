"use client";

import { useEffect, useRef } from "react";

type Stroke = {
  x: number;
  y: number;
  life: number;
  maxLife: number;
  width: number;
  speed: number;
  wobble: number;
};

const BRUSH_GREEN = "#bfffa3";
const CORE_GREEN = "#e7ffd7";
const MAX_POINTS = 220;

type RibbonEdge = {
  leftX: number;
  leftY: number;
  rightX: number;
  rightY: number;
};

export function SketchCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const strokesRef = useRef<Stroke[]>([]);
  const targetRef = useRef<{ x: number; y: number } | null>(null);
  const cursorRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const canDraw = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const context = canvas.getContext("2d");
    let frame = 0;
    let animationId = 0;

    if (!context) {
      return;
    }

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * ratio);
      canvas.height = Math.floor(window.innerHeight * ratio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const pushStrokePoint = (x: number, y: number, distance: number) => {
      strokesRef.current.push({
        x,
        y,
        life: 88,
        maxLife: 88,
        width: 32 + Math.min(distance * 0.34, 22),
        speed: distance,
        wobble: Math.random() * Math.PI * 2
      });

      if (strokesRef.current.length > MAX_POINTS) {
        strokesRef.current.splice(0, strokesRef.current.length - MAX_POINTS);
      }
    };

    const addStrokePoint = (x: number, y: number) => {
      if (!canDraw.matches || reducedMotion.matches) {
        return;
      }

      const previous = strokesRef.current[strokesRef.current.length - 1];
      const distance = previous ? Math.hypot(x - previous.x, y - previous.y) : 999;
      if (distance < 1.4) {
        return;
      }

      if (!previous) {
        pushStrokePoint(x, y, 10);
        return;
      }

      const steps = Math.max(1, Math.min(16, Math.ceil(distance / 8)));

      for (let step = 1; step <= steps; step += 1) {
        const progress = step / steps;
        pushStrokePoint(
          previous.x + (x - previous.x) * progress,
          previous.y + (y - previous.y) * progress,
          distance / steps
        );
      }
    };

    const resetTarget = () => {
      targetRef.current = null;
      cursorRef.current = null;
    };

    const getRibbonEdges = (points: Stroke[], widthRatio: number) => {
      return points.map<RibbonEdge>((point, index) => {
        const previous = points[Math.max(0, index - 1)];
        const next = points[Math.min(points.length - 1, index + 1)];
        const deltaX = next.x - previous.x;
        const deltaY = next.y - previous.y;
        const length = Math.hypot(deltaX, deltaY) || 1;
        const normalX = -deltaY / length;
        const normalY = deltaX / length;
        const lifeRatio = Math.max(0, point.life / point.maxLife);
        const taperedWidth =
          point.width * widthRatio * Math.pow(lifeRatio, 0.62);
        const wobble =
          Math.sin(frame * 0.035 + point.wobble + point.x * 0.004) *
          Math.min(2.4, 0.7 + point.speed * 0.04);

        return {
          leftX: point.x + normalX * taperedWidth + normalX * wobble,
          leftY: point.y + normalY * taperedWidth + normalY * wobble,
          rightX: point.x - normalX * taperedWidth - normalX * wobble,
          rightY: point.y - normalY * taperedWidth - normalY * wobble
        };
      });
    };

    const fillRibbon = (
      points: Stroke[],
      widthRatio: number,
      color: string,
      alpha: number,
      blur: number
    ) => {
      if (points.length < 3) {
        return;
      }

      const edges = getRibbonEdges(points, widthRatio);

      context.save();
      context.globalAlpha = alpha;
      context.shadowColor = color;
      context.shadowBlur = blur;
      context.fillStyle = color;
      context.beginPath();
      context.moveTo(edges[0].leftX, edges[0].leftY);

      for (let index = 1; index < edges.length; index += 1) {
        context.lineTo(edges[index].leftX, edges[index].leftY);
      }

      for (let index = edges.length - 1; index >= 0; index -= 1) {
        context.lineTo(edges[index].rightX, edges[index].rightY);
      }

      context.closePath();
      context.fill();
      context.restore();
    };

    const drawCoreLine = (points: Stroke[]) => {
      if (points.length < 3) {
        return;
      }

      context.save();
      context.globalAlpha = 0.82;
      context.shadowColor = CORE_GREEN;
      context.shadowBlur = 7;
      context.strokeStyle = CORE_GREEN;
      context.lineCap = "butt";
      context.lineJoin = "round";
      context.lineWidth = 6;
      context.beginPath();
      context.moveTo(points[0].x, points[0].y);

      for (let index = 1; index < points.length - 1; index += 1) {
        const current = points[index];
        const next = points[index + 1];
        const midX = (current.x + next.x) / 2;
        const midY = (current.y + next.y) / 2;
        context.quadraticCurveTo(current.x, current.y, midX, midY);
      }

      context.stroke();
      context.restore();
    };

    const draw = () => {
      frame += 1;
      const target = targetRef.current;

      if (target && canDraw.matches && !reducedMotion.matches) {
        const cursor = cursorRef.current ?? target;

        cursorRef.current = {
          x: cursor.x + (target.x - cursor.x) * 0.24,
          y: cursor.y + (target.y - cursor.y) * 0.24
        };

        addStrokePoint(cursorRef.current.x, cursorRef.current.y);
      }

      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const strokes = strokesRef.current.filter((stroke) => stroke.life > 0);

      fillRibbon(strokes, 0.62, BRUSH_GREEN, 0.68, 18);
      fillRibbon(strokes, 0.34, CORE_GREEN, 0.42, 8);
      drawCoreLine(strokes);

      strokesRef.current = strokes.filter((stroke) => {
        stroke.life -= 1;
        return stroke.life > 0;
      });

      context.globalAlpha = 1;
      context.shadowBlur = 0;
      animationId = window.requestAnimationFrame(draw);
    };

    resize();
    draw();

    const handlePointerMove = (event: PointerEvent) => {
      targetRef.current = {
        x: event.clientX,
        y: event.clientY
      };

      if (!cursorRef.current) {
        cursorRef.current = targetRef.current;
        addStrokePoint(event.clientX, event.clientY);
      }
    };

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", resetTarget);
    window.addEventListener("blur", resetTarget);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", resetTarget);
      window.removeEventListener("blur", resetTarget);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="cursor-inversion-canvas pointer-events-none fixed inset-0 z-[80]"
    />
  );
}
