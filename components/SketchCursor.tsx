"use client";

import { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
};

const PALE_GREEN = "#c9fbc6";
const CHAIN_LENGTH = 34;
const HEAD_RADIUS = 8;

function lerp(current: number, target: number, amount: number) {
  return current + (target - current) * amount;
}

export function SketchCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const targetRef = useRef<Point | null>(null);
  const chainRef = useRef<Point[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", {
      alpha: true,
      desynchronized: true
    });

    if (!canvas || !context) {
      return;
    }

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationId = 0;
    let lastFrame = performance.now();
    let visible = false;
    let lastTarget: Point | null = null;
    let speed = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(window.innerWidth * ratio);
      canvas.height = Math.floor(window.innerHeight * ratio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const seedChain = (point: Point) => {
      chainRef.current = Array.from({ length: CHAIN_LENGTH }, () => ({
        x: point.x,
        y: point.y
      }));
    };

    const updateChain = (target: Point, frameDelta: number) => {
      const chain = chainRef.current;

      if (chain.length !== CHAIN_LENGTH) {
        seedChain(target);
      }

      const head = chain[0];
      const headEase = reducedMotion.matches
        ? 1
        : 1 - Math.pow(1 - 0.74, frameDelta);

      head.x = lerp(head.x, target.x, headEase);
      head.y = lerp(head.y, target.y, headEase);

      for (let index = 1; index < chain.length; index += 1) {
        const previous = chain[index - 1];
        const current = chain[index];
        const ease = reducedMotion.matches
          ? 1
          : 1 - Math.pow(1 - Math.max(0.12, 0.34 - index * 0.0048), frameDelta);

        current.x = lerp(current.x, previous.x, ease);
        current.y = lerp(current.y, previous.y, ease);
      }
    };

    const drawVariableRibbon = (chain: Point[]) => {
      if (chain.length < 3) {
        return;
      }

      const visibleLength = Math.min(
        chain.length,
        Math.max(12, Math.floor(18 + speed * 0.18))
      );

      context.save();
      context.strokeStyle = PALE_GREEN;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.globalCompositeOperation = "source-over";

      for (let index = visibleLength - 1; index >= 2; index -= 1) {
        const before = chain[index - 2];
        const previous = chain[index - 1];
        const current = chain[index];
        const progress = 1 - index / visibleLength;
        const startX = (before.x + previous.x) / 2;
        const startY = (before.y + previous.y) / 2;
        const endX = (previous.x + current.x) / 2;
        const endY = (previous.y + current.y) / 2;
        const pullIntoDot = Math.pow(progress, 1.9);

        context.globalAlpha = 0.86;
        context.lineWidth =
          2.4 + pullIntoDot * (10 + Math.min(speed * 0.04, 11));
        context.beginPath();
        context.moveTo(startX, startY);
        context.quadraticCurveTo(previous.x, previous.y, endX, endY);
        context.stroke();
      }

      context.restore();
    };

    const drawHead = (point: Point) => {
      context.save();
      context.fillStyle = PALE_GREEN;
      context.globalAlpha = 1;
      context.beginPath();
      context.arc(point.x, point.y, HEAD_RADIUS, 0, Math.PI * 2);
      context.fill();
      context.restore();
    };

    const draw = (time: number) => {
      const frameDelta = Math.min(2.2, Math.max(0.45, (time - lastFrame) / 16.67));
      lastFrame = time;

      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const target = targetRef.current;

      if (visible && target && finePointer.matches) {
        if (lastTarget) {
          const instantSpeed = Math.hypot(
            target.x - lastTarget.x,
            target.y - lastTarget.y
          );
          speed = lerp(speed, instantSpeed, 1 - Math.pow(1 - 0.28, frameDelta));
        }

        lastTarget = target;
        updateChain(target, frameDelta);
        drawVariableRibbon(chainRef.current);
        drawHead(target);
      } else {
        speed = 0;
      }

      animationId = window.requestAnimationFrame(draw);
    };

    const move = (event: PointerEvent) => {
      const point = {
        x: event.clientX,
        y: event.clientY
      };

      targetRef.current = point;

      if (!visible || chainRef.current.length !== CHAIN_LENGTH) {
        seedChain(point);
        lastTarget = point;
      }

      visible = true;
    };

    const hide = () => {
      visible = false;
      targetRef.current = null;
      lastTarget = null;
      speed = 0;
      chainRef.current = [];
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };

    resize();
    animationId = window.requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="custom-cursor-canvas pointer-events-none fixed inset-0 z-[999]"
    />
  );
}
