"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ProjectFilter } from "@/components/ProjectFilter";
import type { Project } from "@/data/projects";

const ALL_CATEGORY = "All";

type ProjectIndexTableProps = {
  projects: Project[];
};

export function ProjectIndexTable({ projects }: ProjectIndexTableProps) {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);

  const categories = useMemo(
    () => [
      ALL_CATEGORY,
      ...Array.from(new Set(projects.map((project) => project.category)))
    ],
    [projects]
  );

  const countByCategory = useMemo(() => {
    return projects.reduce<Record<string, number>>(
      (counts, project) => {
        counts[ALL_CATEGORY] += 1;
        counts[project.category] = (counts[project.category] ?? 0) + 1;
        return counts;
      },
      { [ALL_CATEGORY]: 0 }
    );
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === ALL_CATEGORY) {
      return projects;
    }

    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory, projects]);

  return (
    <section id="selected" className="min-h-[calc(100svh-84px)] overflow-hidden px-4 pb-16 pt-14 md:px-8 md:pb-10 md:pt-[12vh]">
      <div className="grid gap-8 md:grid-cols-12 md:items-end">
        <p data-animate="fade-up" className="text-[12px] uppercase text-[color:var(--muted)] md:col-span-2">
          Selected work / 2024-2026
        </p>
        <div className="md:col-span-5">
          <h1 className="max-w-3xl text-5xl font-medium leading-none md:text-7xl">
            <span data-animate="hero-line" className="block">
              Business systems,
            </span>
            <span data-animate="hero-line" className="block">
              research, and digital
            </span>
            <span data-animate="hero-line" className="block">
              products.
            </span>
          </h1>
        </div>
        <p data-animate="fade-up" className="max-w-lg text-base leading-6 text-[color:var(--muted)] md:col-span-3">
          Index-based portfolio with permanent project visuals, shallow
          navigation, and direct case-study entry.
        </p>
        <p data-animate="fade-up" className="text-[12px] uppercase leading-5 text-[color:var(--muted)] md:col-span-2 md:text-right">
          {filteredProjects.length.toString().padStart(2, "0")} visible
          <br />
          {projects.length.toString().padStart(2, "0")} total
        </p>
      </div>

      <div data-animate="fade-up" className="mt-16">
        <ProjectFilter
          categories={categories}
          activeCategory={activeCategory}
          countByCategory={countByCategory}
          onChange={setActiveCategory}
        />
      </div>

      <div
        data-project-carousel
        className="project-carousel mt-10 flex min-h-[46vh] snap-x snap-mandatory overflow-x-auto scroll-smooth border-y border-[color:var(--border)]"
      >
        {filteredProjects.map((project, index) => (
          <Link
            key={project.id}
            href={`/projects/${project.slug}`}
            data-project-card
            className="group relative grid min-h-[620px] w-[82vw] shrink-0 snap-start grid-rows-[minmax(300px,auto)_minmax(260px,1fr)] overflow-hidden border-r border-[color:var(--border)] last:border-r-0 md:min-h-[64vh] md:w-[30rem] lg:w-[27vw]"
          >
            <article className="relative z-10 flex flex-col justify-end p-6 md:p-8">
              <p className="mb-6 text-[12px] uppercase text-[color:var(--muted)]">
                {project.number} / {project.year}
              </p>
              <h2 data-project-title className="max-w-md text-3xl font-medium leading-[1.08] md:text-[2.35rem]">
                {project.title}
              </h2>
              <p className="mt-5 text-sm leading-6 text-[color:var(--muted)]">
                {project.client}
                <br />
                {project.category}
              </p>
            </article>

            <div className="relative overflow-hidden bg-black">
              <Image
                src={project.thumbnail}
                alt={`${project.title} project preview`}
                fill
                data-project-visual
                priority={index === 0}
                sizes="(max-width: 768px) 78vw, (max-width: 1024px) 28rem, 25vw"
                className="object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-100"
              />
              <span
                data-project-invert
                aria-hidden="true"
                className="absolute inset-0 bg-[#bfffa3] opacity-0 mix-blend-screen"
              />
              <span
                data-project-annotation
                className="invisible absolute left-0 top-0 z-20 inline-flex items-center gap-2 bg-[#bfffa3] px-3 py-2 text-sm leading-none text-[#071a19] opacity-0 shadow-[0_0_22px_rgba(191,255,163,0.38)]"
              >
                <span className="h-3 w-3 rounded-full bg-[#071a19]" />
                <span>
                  {project.number} / View case
                </span>
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[var(--background)] to-transparent"
              />
            </div>
          </Link>
        ))}
      </div>

      {filteredProjects.length === 0 ? (
        <div className="border-b border-[color:var(--border)] py-16 text-[color:var(--muted)]">
          No projects match this view.
        </div>
      ) : null}
    </section>
  );
}
