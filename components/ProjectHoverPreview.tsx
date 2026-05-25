"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Project } from "@/data/projects";

type CursorPosition = {
  x: number;
  y: number;
};

type ProjectHoverPreviewProps = {
  project: Project | null;
  position: CursorPosition;
};

export function ProjectHoverPreview({
  project,
  position
}: ProjectHoverPreviewProps) {
  const [canHover, setCanHover] = useState(false);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");

    const update = () => {
      setCanHover(media.matches);
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    update();
    media.addEventListener("change", update);
    window.addEventListener("resize", update);

    return () => {
      media.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  if (!project || !canHover) {
    return null;
  }

  const width = 340;
  const height = 220;
  const offset = 20;
  const left = Math.min(
    position.x + offset,
    Math.max(16, viewport.width - width - 16)
  );
  const top = Math.min(
    position.y + offset,
    Math.max(16, viewport.height - height - 16)
  );

  return (
    <div
      className="pointer-events-none fixed z-[60] border border-[color:var(--foreground)] bg-[var(--surface)] transition-opacity"
      style={{
        left,
        top,
        width,
        height
      }}
      aria-hidden="true"
    >
      <Image
        src={project.thumbnail}
        alt=""
        fill
        sizes="340px"
        className="object-cover"
      />
    </div>
  );
}
