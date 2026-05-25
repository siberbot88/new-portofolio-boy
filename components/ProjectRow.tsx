"use client";

import Link from "next/link";
import type { CSSProperties, MouseEvent } from "react";
import type { Project } from "@/data/projects";

const categoryColor: Record<string, string> = {
  "Web App / Platform": "var(--accent-bright)",
  "Dashboard / Analytics": "var(--accent-blue)",
  "Research / Journey Mapping": "var(--accent-pink)",
  "Automation / Operations": "var(--accent-warm)"
};

type ProjectRowProps = {
  project: Project;
  onHoverStart: (project: Project, x: number, y: number) => void;
  onHoverMove: (x: number, y: number) => void;
  onHoverEnd: () => void;
};

export function ProjectRow({
  project,
  onHoverStart,
  onHoverMove,
  onHoverEnd
}: ProjectRowProps) {
  const handleMouseEnter = (event: MouseEvent<HTMLAnchorElement>) => {
    onHoverStart(project, event.clientX, event.clientY);
  };

  const handleMouseMove = (event: MouseEvent<HTMLAnchorElement>) => {
    onHoverMove(event.clientX, event.clientY);
  };

  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={`Open project case study: ${project.title}`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={onHoverEnd}
      style={
        {
          "--row-color": categoryColor[project.category] ?? "var(--accent)"
        } as CSSProperties
      }
      className="group relative grid gap-1 border-b border-[color:var(--border)] py-4 transition-colors hover:bg-[rgba(17,17,17,0.035)] focus-visible:bg-[rgba(17,17,17,0.035)] md:grid-cols-12 md:gap-0 md:py-5"
    >
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 top-0 w-1 origin-left scale-x-0 bg-[var(--row-color)] transition-transform duration-200 group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />
      <span className="text-[11px] uppercase text-[color:var(--muted)] md:col-span-2">
        {project.number} / {project.year}
      </span>
      <span className="text-lg font-medium leading-tight md:col-span-4 md:text-base">
        {project.title}
        <span className="mt-1 block text-[12px] font-normal text-[color:var(--muted)]">
          {project.client}
        </span>
      </span>
      <span className="text-sm text-[color:var(--muted)] md:col-span-3 md:text-[13px]">
        {project.category}
      </span>
      <span className="text-sm text-[color:var(--muted)] md:col-span-3 md:text-[13px]">
        {project.role} / {project.discipline}
      </span>
    </Link>
  );
}
