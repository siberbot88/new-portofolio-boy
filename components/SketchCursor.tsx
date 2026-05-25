"use client";

import { useEffect, useRef } from "react";

type Stroke = {
  x: number;
  y: number;
  life: number;
  maxLife: number;
  width: number;
  wobble: number;
};

const NEON_GREEN = "#ccff00";

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

    const addStrokePoint = (x: number, y: number) => {
      if (!canDraw.matches || reducedMotion.matches) {
        return;
      }

      const previous = strokesRef.current[strokesRef.current.length - 1];
      const distance = previous ? Math.hypot(x - previous.x, y - previous.y) : 999;
      if (distance < 1.15) {
        return;
      }

      strokesRef.current.push({
        x,
        y,
        life: 72,
        maxLife: 72,
        width: 9,
        wobble: Math.random() * Math.PI * 2
      });

      if (strokesRef.current.length > 220) {
        strokesRef.current.splice(0, strokesRef.current.length - 220);
      }
    };

    const resetTarget = () => {
      targetRef.current = null;
      cursorRef.current = null;
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
      context.lineCap = "round";
      context.lineJoin = "round";

      const strokes = strokesRef.current;

      for (let index = 1; index < strokes.length; index += 1) {
        const previous = strokes[index - 1];
        const stroke = strokes[index];
        const opacity = Math.max(0, stroke.life / stroke.maxLife);
        const wobble =
          Math.sin(frame * 0.08 + stroke.wobble + stroke.x * 0.012) * 1.2;
        const controlX = (previous.x + stroke.x) / 2 + wobble;
        const controlY = (previous.y + stroke.y) / 2 - wobble;

        context.globalAlpha = opacity * 0.34;
        context.shadowColor = NEON_GREEN;
        context.shadowBlur = 18;
        context.strokeStyle = NEON_GREEN;
        context.lineWidth = stroke.width * 1.6 * opacity;
        context.beginPath();
        context.moveTo(previous.x, previous.y);
        context.quadraticCurveTo(controlX, controlY, stroke.x, stroke.y);
        context.stroke();

        context.globalAlpha = opacity * 0.72;
        context.shadowBlur = 8;
        context.strokeStyle = "#f3ffd0";
        context.lineWidth = stroke.width * 0.42 * opacity;
        context.beginPath();
        context.moveTo(previous.x, previous.y);
        context.quadraticCurveTo(controlX, controlY, stroke.x, stroke.y);
        context.stroke();
      }

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
      className="pointer-events-none fixed inset-0 z-[80] mix-blend-screen"
    />
  );
}
