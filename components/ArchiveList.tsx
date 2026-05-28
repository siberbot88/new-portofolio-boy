"use client";

import Image from "next/image";
import Link from "next/link";
import type { MouseEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ProjectFilter } from "@/components/ProjectFilter";
import type { Project } from "@/data/projects";

const ALL_CATEGORY = "All";
const ARCHIVE_VISUAL_POSITIONS = ["left center", "center center", "right center"];
const ARCHIVE_HOVER_NOTES: Record<string, string> = {
  "davis-presentation": "Read the business signal",
  "dashboard-analitik-superstore": "Trace the data pattern",
  "bullet-forge-commandos": "Enter the prototype",
  "koperasi-sembako-platform": "Open the commerce flow",
  "early-warning-system": "Inspect the risk signal",
  "ets-storytelling": "Follow the learning path",
  "website-sajak-kopi": "Step into the brand",
  "web-blogging-siberbot88": "Open the writing space",
  "liora-match-platform": "Trace the learning match",
  "machine-learning-tracker": "Follow the weekly roadmap",
  "legacy-portfolio": "View the earlier portfolio",
  "academic-web-portfolio": "Open the course submission",
  "current-portfolio-system": "Inspect the archive system",
  "sokoban-game-python": "Push the puzzle logic",
  "ucommodity-ecommerce": "Browse the agriculture store",
  "personal-academic-manager": "Check the study rhythm",
  "insta-nutri-calc": "Count the daily macros",
  "harvestfarm-mobile": "Open the farm commerce app",
  "bbi-hub-applications": "Review the operations hub",
  "ngekoss-app-laravel": "Browse the kost listings",
  "unitunes-music-management": "Manage the music catalog"
};

type ArchiveListProps = {
  projects: Project[];
};

type ArchiveViewMode = "table" | "visual";

type PreviewState = {
  current: Project | null;
  previous: Project | null;
  version: number;
  direction: "down" | "up";
  index: number | null;
};

function getArchiveVisuals(project: Project) {
  const candidates = [
    {
      src: project.heroImage,
      alt: `${project.title} main archive visual`
    },
    ...project.solution.map((item) => ({
      src: item.image,
      alt: item.alt
    })),
    {
      src: project.thumbnail,
      alt: `${project.title} archive preview`
    }
  ];

  const visuals = candidates.slice(0, 3);

  while (visuals.length < 3) {
    visuals.push(candidates[0]);
  }

  return visuals;
}

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
        className="absolute inset-0 bg-[var(--accent)] opacity-0 mix-blend-screen transition-opacity duration-300"
      />
    </div>
  );
}

export function ArchiveList({ projects }: ArchiveListProps) {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);
  const [viewMode, setViewMode] = useState<ArchiveViewMode>("table");
  const visualListRef = useRef<HTMLDivElement | null>(null);
  const cursorCueRef = useRef<HTMLSpanElement | null>(null);
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

  useEffect(() => {
    if (viewMode !== "visual") {
      return;
    }

    const visualList = visualListRef.current;

    if (!visualList) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;

    const updateVisualRows = () => {
      animationFrame = 0;

      const rows = Array.from(
        visualList.querySelectorAll<HTMLElement>("[data-archive-visual-row]")
      );

      if (reducedMotion.matches) {
        rows.forEach((row) => {
          row.style.removeProperty("--archive-visual-row-height");
          row.style.removeProperty("--archive-visual-image-height");
          row.style.removeProperty("--archive-visual-detail-opacity");
          row.style.removeProperty("--archive-visual-detail-reveal");
          row.style.removeProperty("--archive-visual-detail-max-height");
          row.style.removeProperty("--archive-visual-detail-gap");
          row.style.removeProperty("--archive-visual-detail-y");
          row.style.removeProperty("--archive-visual-meta-y");
          row.style.removeProperty("--archive-visual-image-scale");
        });
        return;
      }

      const viewportHeight = window.innerHeight || 720;
      const wideViewport = window.innerWidth >= 768;
      const baseHeight = wideViewport
        ? Math.min(Math.max(viewportHeight * 0.68, 520), 740)
        : Math.min(Math.max(viewportHeight * 0.58, 420), 560);
      const collapsedHeight = wideViewport
        ? Math.min(Math.max(viewportHeight * 0.24, 210), 300)
        : Math.min(Math.max(viewportHeight * 0.38, 320), 420);
      const archiveTopLine = wideViewport ? 156 : 128;

      rows.forEach((row) => {
        const rect = row.getBoundingClientRect();

        if (rect.bottom < -baseHeight || rect.top > viewportHeight + baseHeight) {
          return;
        }

        const scrolledPastTop = archiveTopLine - rect.top;
        const rawProgress = scrolledPastTop / (baseHeight * 0.5);
        const clampedProgress = Math.max(0, Math.min(1, rawProgress));
        const easedProgress =
          clampedProgress * clampedProgress * (3 - 2 * clampedProgress);
        const rowMidpoint = rect.top + baseHeight * 0.5;
        const detailProgress = Math.max(
          0,
          Math.min(1, (archiveTopLine - rowMidpoint) / (baseHeight * 0.16))
        );
        const detailReveal = 1 - detailProgress;
        const rowHeight =
          baseHeight - (baseHeight - collapsedHeight) * easedProgress;
        const imageHeight = wideViewport
          ? Math.max(150, rowHeight - 118)
          : Math.max(210, rowHeight - 170);

        row.style.setProperty(
          "--archive-visual-row-height",
          `${rowHeight.toFixed(2)}px`
        );
        row.style.setProperty(
          "--archive-visual-image-height",
          `${imageHeight.toFixed(2)}px`
        );
        row.style.setProperty(
          "--archive-visual-detail-opacity",
          `${detailReveal.toFixed(3)}`
        );
        row.style.setProperty(
          "--archive-visual-detail-reveal",
          `${detailReveal.toFixed(3)}`
        );
        row.style.setProperty(
          "--archive-visual-detail-max-height",
          `${(detailReveal * 3.6).toFixed(3)}rem`
        );
        row.style.setProperty(
          "--archive-visual-detail-gap",
          `${(0.35 + detailReveal * 0.45).toFixed(3)}rem`
        );
        row.style.setProperty(
          "--archive-visual-detail-y",
          `${((1 - detailReveal) * -12).toFixed(2)}px`
        );
        row.style.setProperty(
          "--archive-visual-meta-y",
          `${(easedProgress * -18).toFixed(2)}px`
        );
        row.style.setProperty(
          "--archive-visual-image-scale",
          `${(1 - easedProgress * 0.035).toFixed(4)}`
        );
      });
    };

    const requestVisualUpdate = () => {
      if (animationFrame) {
        return;
      }

      animationFrame = window.requestAnimationFrame(updateVisualRows);
    };

    requestVisualUpdate();
    window.addEventListener("scroll", requestVisualUpdate, { passive: true });
    window.addEventListener("resize", requestVisualUpdate);

    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }

      window.removeEventListener("scroll", requestVisualUpdate);
      window.removeEventListener("resize", requestVisualUpdate);
    };
  }, [filteredProjects, viewMode]);

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

  const showCursorCue = (
    project: Project,
    event: MouseEvent<HTMLElement>
  ) => {
    const cue = cursorCueRef.current;

    if (!cue) {
      return;
    }

    const maxX = Math.max(0, window.innerWidth - 230);
    const maxY = Math.max(0, window.innerHeight - 64);
    const x = Math.min(event.clientX + 20, maxX);
    const y = Math.min(event.clientY + 18, maxY);

    cue.textContent = ARCHIVE_HOVER_NOTES[project.slug] ?? project.discipline;
    cue.style.opacity = "1";
    cue.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const hideCursorCue = () => {
    const cue = cursorCueRef.current;

    if (!cue) {
      return;
    }

    cue.style.opacity = "0";
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
        <div className="archive-filter-bar sticky top-[76px] z-40 bg-[var(--background)] px-4 py-4 md:px-8">
          <ProjectFilter
            categories={categories}
            activeCategory={activeCategory}
            countByCategory={countByCategory}
            onChange={setActiveCategory}
          />
          <button
            type="button"
            aria-pressed={viewMode === "visual"}
            onClick={() => {
              setViewMode((currentMode) =>
                currentMode === "table" ? "visual" : "table"
              );
              hidePreview();
              hideCursorCue();
            }}
            className="archive-view-toggle ml-auto mt-3 block text-[11px] uppercase text-[color:var(--muted)] transition-colors hover:text-[var(--accent)] focus-visible:text-[var(--accent)]"
          >
            Change view
          </button>
        </div>

        {viewMode === "table" ? (
          <>
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
                  className="group relative grid min-h-28 gap-3 border-b border-[color:var(--border)] px-4 py-6 text-[color:var(--muted)] transition-colors duration-300 hover:bg-[var(--accent)] hover:text-[var(--background)] focus-visible:bg-[var(--accent)] focus-visible:text-[var(--background)] md:grid-cols-[5rem_1.5fr_1.5fr_8rem_1fr] md:items-center md:px-8"
                >
                  <span className="text-[11px] uppercase">
                    {project.number}
                  </span>
                  <span className="text-2xl leading-tight text-[var(--foreground)] transition-colors duration-300 group-hover:text-[var(--background)] group-focus-visible:text-[var(--background)]">
                    {project.title}
                  </span>
                  <span className="text-lg">{project.category}</span>
                  <span className="text-sm uppercase">View</span>
                  <span className="max-w-sm text-sm leading-5">
                    {project.client}
                  </span>
                  <span className="absolute left-1/2 top-1/2 hidden -translate-y-1/2 items-center gap-2 bg-[var(--background)] px-3 py-2 text-sm leading-none text-[var(--accent)] opacity-0 transition-opacity duration-300 group-hover:flex group-hover:opacity-100 md:flex">
                    <span className="h-3 w-3 rounded-full bg-[var(--accent)]" />
                    {project.discipline}
                  </span>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="archive-visual-view">
            <div className="archive-visual-head">
              <span>No.</span>
              <span>Details</span>
              <span>Visuals</span>
            </div>

            <div
              ref={visualListRef}
              className="archive-visual-list"
              onMouseLeave={hideCursorCue}
            >
              {filteredProjects.map((project, index) => {
                const visuals = getArchiveVisuals(project);

                return (
                  <Link
                    key={project.id}
                    href={`/projects/${project.slug}`}
                    data-archive-row
                    data-archive-visual-row
                    aria-label={`Open project case study: ${project.title}`}
                    onMouseEnter={(event) => showCursorCue(project, event)}
                    onMouseMove={(event) => showCursorCue(project, event)}
                    onMouseLeave={hideCursorCue}
                    onFocus={hideCursorCue}
                    className="archive-visual-row group"
                  >
                    <span className="archive-visual-number">
                      {project.number}
                    </span>

                    <span className="archive-visual-details">
                      <span className="archive-visual-title">
                        {project.title}
                      </span>
                      <span className="archive-visual-client">
                        {project.client}
                      </span>
                      <span className="archive-visual-discipline">
                        {project.category}
                        <br />
                        {project.discipline}
                      </span>
                      <span className="archive-visual-case">
                        Case study <span aria-hidden="true">-&gt;</span>
                      </span>
                    </span>

                    <span className="archive-visual-images">
                      {visuals.map((visual, visualIndex) => (
                        <span
                          key={`${project.id}-${visualIndex}-${visual.src}`}
                          className="archive-visual-image-frame"
                        >
                          <Image
                            src={visual.src}
                            alt={visual.alt}
                            fill
                            unoptimized
                            priority={index === 0 && visualIndex === 0}
                            sizes="(max-width: 768px) 92vw, 19vw"
                            className="archive-visual-image"
                            style={{
                              objectPosition:
                                ARCHIVE_VISUAL_POSITIONS[visualIndex]
                            }}
                          />
                        </span>
                      ))}
                    </span>
                  </Link>
                );
              })}
            </div>

            <span
              ref={cursorCueRef}
              className="archive-cursor-cue"
            />
          </div>
        )}
      </section>
    </main>
  );
}
