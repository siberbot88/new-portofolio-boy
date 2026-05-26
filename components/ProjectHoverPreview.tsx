"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";

type CursorPosition = {
  x: number;
  y: number;
};

type ProjectHoverPreviewProps = {
  project: Project | null;
  initialPosition: CursorPosition;
};

const PREVIEW_WIDTH = 360;
const PREVIEW_HEIGHT = 232;
const OFFSET = 24;

export function ProjectHoverPreview({
  project,
  initialPosition
}: ProjectHoverPreviewProps) {
  const previewRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef(initialPosition);
  const currentRef = useRef(initialPosition);
  const viewportRef = useRef({ width: 0, height: 0 });
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");

    const update = () => {
      setCanHover(media.matches);
      viewportRef.current = {
        width: window.innerWidth,
        height: window.innerHeight
      };
    };

    update();
    media.addEventListener("change", update);
    window.addEventListener("resize", update);

    return () => {
      media.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    targetRef.current = initialPosition;
    currentRef.current = initialPosition;
  }, [initialPosition, project?.id]);

  useEffect(() => {
    if (!project || !canHover) {
      return;
    }

    let animationId = 0;
    let lastFrame = performance.now();

    const clampPosition = (point: CursorPosition) => {
      const viewport = viewportRef.current;

      return {
        x: Math.min(
          point.x + OFFSET,
          Math.max(16, viewport.width - PREVIEW_WIDTH - 16)
        ),
        y: Math.min(
          point.y + OFFSET,
          Math.max(16, viewport.height - PREVIEW_HEIGHT - 16)
        )
      };
    };

    const move = (event: PointerEvent) => {
      targetRef.current = {
        x: event.clientX,
        y: event.clientY
      };
    };

    const render = (time: number) => {
      const preview = previewRef.current;
      const frameDelta = Math.min(2, Math.max(0.4, (time - lastFrame) / 16.67));
      lastFrame = time;

      if (preview) {
        const current = currentRef.current;
        const target = targetRef.current;
        const ease = 1 - Math.pow(1 - 0.34, frameDelta);

        currentRef.current = {
          x: current.x + (target.x - current.x) * ease,
          y: current.y + (target.y - current.y) * ease
        };

        const position = clampPosition(currentRef.current);
        preview.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`;
      }

      animationId = window.requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", move, { passive: true });
    animationId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("pointermove", move);
    };
  }, [canHover, project]);

  if (!project || !canHover) {
    return null;
  }

  return (
    <div
      ref={previewRef}
      className="pointer-events-none fixed left-0 top-0 z-[60] overflow-hidden bg-[var(--surface)] shadow-[0_24px_80px_rgba(0,0,0,0.42)]"
      style={{
        width: PREVIEW_WIDTH,
        height: PREVIEW_HEIGHT,
        transform: `translate3d(${initialPosition.x + OFFSET}px, ${
          initialPosition.y + OFFSET
        }px, 0)`
      }}
      aria-hidden="true"
    >
      <Image
        src={project.thumbnail}
        alt=""
        fill
        sizes={`${PREVIEW_WIDTH}px`}
        className="object-cover"
      />
    </div>
  );
}
