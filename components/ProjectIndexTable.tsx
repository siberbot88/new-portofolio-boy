"use client";

import Image from "next/image";
import Link from "next/link";
import type { FocusEvent, PointerEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ProjectFilter } from "@/components/ProjectFilter";
import { ProjectHoverPreview } from "@/components/ProjectHoverPreview";
import type { Project } from "@/data/projects";

const ALL_CATEGORY = "All";

type ViewMode = "index" | "visual";

type ProjectIndexTableProps = {
  projects: Project[];
};

type PreviewState = {
  project: Project | null;
  position: {
    x: number;
    y: number;
  };
};

export function ProjectIndexTable({ projects }: ProjectIndexTableProps) {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);
  const [viewMode, setViewMode] = useState<ViewMode>("index");
  const [preview, setPreview] = useState<PreviewState>({
    project: null,
    position: { x: 0, y: 0 }
  });
  const visualScrollerRef = useRef<HTMLDivElement | null>(null);
  const visualTrackRef = useRef<HTMLDivElement | null>(null);
  const activePreviewIdRef = useRef<string | null>(null);

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

  const showPreview = (project: Project, x: number, y: number) => {
    activePreviewIdRef.current = project.id;
    setPreview({
      project,
      position: { x, y }
    });
  };

  const movePreview = (
    project: Project,
    event: PointerEvent<HTMLAnchorElement>
  ) => {
    if (activePreviewIdRef.current !== project.id) {
      showPreview(project, event.clientX, event.clientY);
    }
  };

  const focusPreview = (
    project: Project,
    event: FocusEvent<HTMLAnchorElement>
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    showPreview(project, rect.left + rect.width * 0.62, rect.top + rect.height * 0.5);
  };

  const hidePreview = () => {
    activePreviewIdRef.current = null;
    setPreview((current) => ({
      ...current,
      project: null
    }));
  };

  useEffect(() => {
    const viewport = visualScrollerRef.current;
    const track = visualTrackRef.current;

    if (!viewport || !track || viewMode !== "visual") {
      return;
    }

    let setWidth = 0;
    let offset = 0;
    let velocity = 0.44;
    let direction = 1;
    let animationId = 0;
    let lastFrame = performance.now();

    const measure = () => {
      const firstSet = track.firstElementChild;

      if (!(firstSet instanceof HTMLElement)) {
        return;
      }

      const previousSetWidth = setWidth;
      setWidth = firstSet.getBoundingClientRect().width;

      if (!previousSetWidth && setWidth) {
        offset = setWidth;
      }
    };

    const wrapOffset = () => {
      if (!setWidth) {
        return;
      }

      while (offset >= setWidth * 2) {
        offset -= setWidth;
      }

      while (offset < setWidth) {
        offset += setWidth;
      }
    };

    const animate = (time: number) => {
      const frameDelta = Math.min(2.2, Math.max(0.45, (time - lastFrame) / 16.67));
      const cruise = direction * 0.44;
      lastFrame = time;

      if (!setWidth) {
        measure();
      }

      velocity += (cruise - velocity) * (1 - Math.pow(0.955, frameDelta));
      offset += velocity * frameDelta;
      wrapOffset();

      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      animationId = window.requestAnimationFrame(animate);
    };

    const wheel = (event: WheelEvent) => {
      const dominantDelta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;

      if (!dominantDelta) {
        return;
      }

      event.preventDefault();
      direction = dominantDelta >= 0 ? 1 : -1;
      velocity += dominantDelta * 0.088;
      velocity = Math.max(-58, Math.min(58, velocity));
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(viewport);
    resizeObserver.observe(track);
    viewport.addEventListener("wheel", wheel, { passive: false });
    animationId = window.requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        window.cancelAnimationFrame(animationId);
      }

      resizeObserver.disconnect();
      viewport.removeEventListener("wheel", wheel);
    };
  }, [filteredProjects, viewMode]);

  return (
    <section id="selected" className="relative">
      <button
        type="button"
        aria-label={
          viewMode === "index"
            ? "Switch to visual view"
            : "Switch to index view"
        }
        aria-pressed={viewMode === "visual"}
        onClick={() =>
          setViewMode((current) => (current === "index" ? "visual" : "index"))
        }
        className="fixed right-4 top-[6.25rem] z-[70] flex h-5 w-9 items-center rounded-full border border-[color:var(--foreground)]/75 px-1 transition-colors hover:border-[var(--accent)] focus-visible:border-[var(--accent)] md:right-8 md:top-6"
      >
        <span
          className={`h-2.5 w-2.5 rounded-full bg-[var(--foreground)] transition-transform duration-300 ${
            viewMode === "visual" ? "translate-x-4 bg-[var(--accent)]" : ""
          }`}
        />
      </button>

      {viewMode === "visual" ? (
        <div className="pb-16 pt-24 md:pb-0 md:pt-[15vh]">
          <div
            ref={visualScrollerRef}
            className="project-carousel overflow-hidden pl-4 pr-4 md:pl-8 md:pr-8"
          >
            <div ref={visualTrackRef} className="flex will-change-transform">
              {[0, 1, 2].map((copyIndex) => (
                <div
                  key={copyIndex}
                  className="flex shrink-0"
                  aria-hidden={copyIndex !== 1}
                >
                  {filteredProjects.map((project, index) => (
                    <Link
                      key={`${copyIndex}-${project.id}`}
                      href={`/projects/${project.slug}`}
                      tabIndex={copyIndex === 1 ? undefined : -1}
                      className="group grid min-h-[74svh] w-[82vw] shrink-0 grid-rows-[auto_1fr] pr-6 md:min-h-[78svh] md:w-[38vw] md:min-w-[520px] md:pr-0"
                      aria-label={`Open project case study: ${project.title}`}
                    >
                      <article className="flex min-h-44 flex-col justify-end pb-8 pr-8 md:min-h-56">
                        <h2 className="max-w-md text-2xl font-medium leading-[1.05] text-[var(--foreground)] transition-colors duration-200 group-hover:text-[var(--accent)] group-focus-visible:text-[var(--accent)] md:text-[2rem]">
                          {project.title}
                        </h2>
                        <p className="mt-6 max-w-xs text-sm leading-5 text-[color:var(--muted)]">
                          {project.client}
                          <br />
                          {project.category}
                        </p>
                      </article>

                      <div className="relative min-h-[420px] overflow-hidden bg-[var(--surface)] md:min-h-0">
                        <Image
                          src={project.thumbnail}
                          alt={`${project.title} project preview`}
                          fill
                          priority={copyIndex === 1 && index < 3}
                          sizes="(max-width: 768px) 82vw, 38vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.035] group-focus-visible:scale-[1.035]"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="px-4 pb-20 pt-12 md:px-8 md:pb-24 md:pt-[10vh]">
          <div className="grid min-h-[52svh] content-between gap-14 md:grid-cols-12">
            <div className="md:col-span-8">
              <p
                data-animate="fade-up"
                className="mb-5 text-[12px] uppercase text-[color:var(--muted)]"
              >
                Mohammad Bayu Rizki
              </p>
              <h1 className="max-w-6xl text-[clamp(3.6rem,10vw,10.5rem)] font-medium leading-[0.88]">
                <span data-animate="hero-line" className="block">
                  Business
                </span>
                <span data-animate="hero-line" className="block">
                  Analysis &
                </span>
                <span data-animate="hero-line" className="block">
                  Digital Builds
                </span>
              </h1>
            </div>

            <div className="self-end md:col-span-3 md:col-start-10">
              <p
                data-animate="fade-up"
                className="max-w-sm text-sm leading-6 text-[color:var(--muted)]"
              >
                Selected case studies across dashboards, platforms, machine
                learning, learning tools, and interactive prototypes.
              </p>
              <p
                data-animate="fade-up"
                className="mt-6 text-[12px] uppercase leading-5 text-[color:var(--muted)]"
              >
                {filteredProjects.length.toString().padStart(2, "0")} Selected
                <br />
                {projects.length.toString().padStart(2, "0")} Total
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-12 md:items-start">
            <p
              data-animate="fade-up"
              className="text-[11px] uppercase text-[color:var(--muted)] md:col-span-2"
            >
              Filters
            </p>
            <div data-animate="fade-up" className="md:col-span-10">
              <ProjectFilter
                categories={categories}
                activeCategory={activeCategory}
                countByCategory={countByCategory}
                onChange={setActiveCategory}
              />
            </div>
          </div>

          <div
            data-animate="fade-up"
            className="mt-14"
            onMouseLeave={hidePreview}
          >
            <div className="space-y-2">
              {filteredProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  data-project-row
                  aria-label={`Open project case study: ${project.title}`}
                  onPointerEnter={(event) => movePreview(project, event)}
                  onPointerMove={(event) => movePreview(project, event)}
                  onPointerLeave={hidePreview}
                  onFocus={(event) => focusPreview(project, event)}
                  onBlur={hidePreview}
                  className="group grid gap-4 py-5 text-[color:var(--muted)] transition-colors duration-200 hover:text-[var(--foreground)] focus-visible:text-[var(--foreground)] md:grid-cols-12 md:gap-8 md:py-6"
                >
                  <span className="text-[11px] uppercase leading-5 md:col-span-1">
                    {project.number}
                  </span>

                  <span className="md:col-span-7">
                    <span className="block max-w-5xl text-[clamp(2rem,4.6vw,5.6rem)] font-medium leading-[0.92] text-[var(--foreground)] transition-colors duration-200 group-hover:text-[var(--accent)] group-focus-visible:text-[var(--accent)]">
                      {project.title}
                    </span>
                  </span>

                  <span className="text-sm leading-5 md:col-span-2">
                    {project.client}
                    <span className="mt-1 block text-[11px] uppercase text-[color:var(--muted)]">
                      {project.category}
                    </span>
                  </span>

                  <span className="text-sm leading-5 md:col-span-2 md:text-right">
                    Case-study
                    <span className="mt-1 block text-[11px] uppercase text-[color:var(--muted)]">
                      {project.year}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <ProjectHoverPreview
            project={preview.project}
            initialPosition={preview.position}
          />
        </div>
      )}

      {filteredProjects.length === 0 ? (
        <div className="px-4 py-16 text-[color:var(--muted)] md:px-8">
          No projects match this view.
        </div>
      ) : null}
    </section>
  );
}
