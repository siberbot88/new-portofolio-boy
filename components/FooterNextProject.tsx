import Link from "next/link";
import type { Project } from "@/data/projects";

type FooterNextProjectProps = {
  project: Project;
};

export function FooterNextProject({ project }: FooterNextProjectProps) {
  return (
    <footer className="border-t border-[color:var(--border)]">
      <Link
        href={`/projects/${project.slug}`}
        className="mx-auto grid max-w-[1600px] gap-4 px-4 py-10 transition-colors hover:bg-[rgba(17,17,17,0.035)] focus-visible:bg-[rgba(17,17,17,0.035)] md:grid-cols-12 md:px-6 md:py-14"
      >
        <span className="text-[11px] uppercase text-[color:var(--muted)] md:col-span-3">
          Next Project
        </span>
        <span className="text-3xl font-medium leading-tight md:col-span-9">
          {project.title} -&gt;
        </span>
      </Link>
    </footer>
  );
}
