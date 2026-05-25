"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ProjectFilter } from "@/components/ProjectFilter";
import type { Project } from "@/data/projects";

const ALL_CATEGORY = "All";

type ArchiveListProps = {
  projects: Project[];
};

type PreviewState = {
  current: Project | null;
  previous: Project | null;
  version: number;
  direction: "down" | "up";
  index: number | null;
};

function ArchivePreviewCard({
  project,
  state,
  direction
}: {
  project: Project;
  state: "in" | "out";
  direction: "down" | "up";
}) {
  return (
    <div
      className={`absolute inset-0 ${
        state === "in"
          ? `archive-card-in-${direction}`
          : `archive-card-out-${direction}`
      }`}
    >
      <Image
        src={project.thumbnail}
        alt=""
        fill
        sizes="30vw"
        quality={76}
        className="object-cover"
        loading="lazy"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-[#bfffa3] opacity-0 mix-blend-screen transition-opacity duration-300"
      />
    </div>
  );
}

export function ArchiveList({ projects }: ArchiveListProps) {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);
  const [preview, setPreview] = useState<PreviewState>({
    current: null,
    previous: null,
    version: 0,
    direction: "down",
    index: null
  });

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

  useEffect(() => {
    if (!preview.previous) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setPreview((currentPreview) => ({
        ...currentPreview,
        previous: null
      }));
    }, 680);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [preview.previous, preview.version]);

  const showPreview = (project: Project, index: number) => {
    setPreview((currentPreview) => {
      if (currentPreview.current?.id === project.id) {
        return currentPreview;
      }

      const direction =
        currentPreview.index !== null && index < currentPreview.index
          ? "up"
          : "down";

      return {
        current: project,
        previous: currentPreview.current,
        version: currentPreview.version + 1,
        direction,
        index
      };
    });
  };

  const hidePreview = () => {
    setPreview((currentPreview) => {
      if (!currentPreview.current) {
        return currentPreview;
      }

      return {
        current: null,
        previous: currentPreview.current,
        version: currentPreview.version + 1,
        direction: currentPreview.direction,
        index: null
      };
    });
  };

  const previewVisible = preview.current || preview.previous;

  return (
    <main>
      <section className="min-h-[54svh] px-4 pb-10 pt-[12vh] md:px-8">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <p data-animate="fade-up" className="text-[12px] uppercase text-[color:var(--muted)] md:col-span-2">
            Archive / 2024-2026
          </p>
          <div className="md:col-span-6">
            <h1 className="max-w-4xl text-5xl font-medium leading-none md:text-7xl">
              <span data-animate="hero-line" className="block">
                The ongoing record
              </span>
              <span data-animate="hero-line" className="block">
                of practical builds.
              </span>
            </h1>
          </div>
          <p data-animate="fade-up" className="max-w-lg text-base leading-6 text-[color:var(--muted)] md:col-span-3">
            A full archive of shipped interfaces, dashboards, learning tools,
            and systems. Hover a row to inspect the visual.
          </p>
          <p data-animate="fade-up" className="text-[12px] uppercase leading-5 text-[color:var(--muted)] md:col-span-1 md:text-right">
            {filteredProjects.length.toString().padStart(2, "0")}
            <br />
            visible
          </p>
        </div>
      </section>

      <section className="relative border-t border-[color:var(--border)]">
        <div className="sticky top-[80px] z-30 bg-[var(--background)] px-4 py-4 md:px-8">
          <ProjectFilter
            categories={categories}
            activeCategory={activeCategory}
            countByCategory={countByCategory}
            onChange={setActiveCategory}
          />
          <p className="mt-3 text-right text-[11px] uppercase text-[color:var(--muted)]">
            Change view
          </p>
        </div>

        <div className="pointer-events-none sticky top-[180px] z-20 hidden h-0 md:block">
          <div className="ml-auto mr-[11vw] w-[30vw] max-w-[460px]">
            <div
              className="archive-preview relative aspect-[0.88] overflow-hidden bg-black transition-opacity duration-300"
              style={{ opacity: previewVisible ? 1 : 0 }}
            >
              {preview.previous ? (
                <ArchivePreviewCard
                  key={`previous-${preview.previous.id}-${preview.version}`}
                  project={preview.previous}
                  state="out"
                  direction={preview.direction}
                />
              ) : null}
              {preview.current ? (
                <ArchivePreviewCard
                  key={`current-${preview.current.id}-${preview.version}`}
                  project={preview.current}
                  state="in"
                  direction={preview.direction}
                />
              ) : null}
            </div>
          </div>
        </div>

        <div
          className="border-t border-[color:var(--border)]"
          onMouseLeave={hidePreview}
        >
          <div className="hidden grid-cols-[5rem_1.5fr_1.5fr_8rem_1fr] border-b border-[color:var(--border)] px-4 py-4 text-[11px] uppercase text-[color:var(--muted)] md:grid md:px-8">
            <span>No.</span>
            <span>Client</span>
            <span>Delivery</span>
            <span>Action</span>
            <span>Details</span>
          </div>

          {filteredProjects.map((project, index) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              data-archive-row
              onMouseEnter={() => showPreview(project, index)}
              onFocus={() => showPreview(project, index)}
              className="group relative grid min-h-28 gap-3 border-b border-[color:var(--border)] px-4 py-6 text-[color:var(--muted)] transition-colors duration-300 hover:bg-[#bfffa3] hover:text-[#071a19] focus-visible:bg-[#bfffa3] focus-visible:text-[#071a19] md:grid-cols-[5rem_1.5fr_1.5fr_8rem_1fr] md:items-center md:px-8"
            >
              <span className="text-[11px] uppercase">
                {project.number}
              </span>
              <span className="text-2xl leading-tight text-[var(--foreground)] transition-colors duration-300 group-hover:text-[#071a19] group-focus-visible:text-[#071a19]">
                {project.title}
              </span>
              <span className="text-lg">{project.category}</span>
              <span className="text-sm uppercase">View</span>
              <span className="max-w-sm text-sm leading-5">
                {project.client}
              </span>
              <span className="absolute left-1/2 top-1/2 hidden -translate-y-1/2 items-center gap-2 bg-[#071a19] px-3 py-2 text-sm leading-none text-[#bfffa3] opacity-0 transition-opacity duration-300 group-hover:flex group-hover:opacity-100 md:flex">
                <span className="h-3 w-3 rounded-full bg-[#bfffa3]" />
                {project.discipline}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
