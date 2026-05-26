"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { Project } from "@/data/projects";

type DetailItem = {
  label: string;
  value: string;
  note: string;
  image: string;
  position: string;
};

type ProjectDetailMatrixProps = {
  project: Project;
};

function DetailVisual({
  item,
  projectTitle,
  state
}: {
  item: DetailItem;
  projectTitle: string;
  state: "in" | "out";
}) {
  return (
    <div
      className={`absolute inset-0 bg-[#061817] ${
        state === "in" ? "archive-card-in" : "archive-card-out"
      }`}
    >
      <div className="absolute inset-4 md:inset-8">
        <Image
          src={item.image}
          alt={`${projectTitle} ${item.label} visual`}
          fill
          sizes="(max-width: 768px) 100vw, 42vw"
          className="object-contain"
          style={{ objectPosition: item.position }}
          priority={state === "in"}
        />
      </div>
    </div>
  );
}

export function ProjectDetailMatrix({ project }: ProjectDetailMatrixProps) {
  const items = useMemo<DetailItem[]>(
    () => [
      {
        label: "Client",
        value: project.client,
        note: "Context and business domain",
        image: project.heroImage,
        position: "center"
      },
      {
        label: "Task",
        value: project.summary,
        note: project.category,
        image: project.solution[0]?.image ?? project.heroImage,
        position: "top"
      },
      {
        label: "Role",
        value: project.role,
        note: project.discipline,
        image: project.solution[1]?.image ?? project.thumbnail,
        position: "center"
      },
      {
        label: "Stack",
        value: project.techStack.join(" / "),
        note: "Technical delivery",
        image: project.thumbnail,
        position: "bottom"
      }
    ],
    [project]
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [previousItem, setPreviousItem] = useState<DetailItem | null>(null);
  const [visualVersion, setVisualVersion] = useState(0);
  const activeItem = items[activeIndex];

  useEffect(() => {
    if (!previousItem) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setPreviousItem(null);
    }, 680);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [previousItem, visualVersion]);

  const activateItem = (index: number) => {
    if (index === activeIndex) {
      return;
    }

    setPreviousItem(activeItem);
    setActiveIndex(index);
    setVisualVersion((current) => current + 1);
  };

  return (
    <section className="border-b border-[color:var(--border)]">
      <div className="grid gap-0 md:grid-cols-12">
        <div className="border-r border-[color:var(--border)] md:col-span-7">
          <div className="px-4 py-8 md:px-8 md:py-10">
            <p data-animate="fade-up" className="text-[11px] uppercase text-[color:var(--muted)]">
              {project.number} / {project.year} / {project.category}
            </p>
            <h1 data-animate="hero-line" className="mt-3 max-w-4xl text-4xl font-medium leading-[1.02] md:text-6xl">
              {project.title}
            </h1>
            <p data-animate="fade-up" className="mt-6 max-w-2xl text-base leading-7 text-[color:var(--muted)]">
              {project.challenge}
            </p>
            <div data-animate="fade-up" className="mt-8 flex flex-wrap gap-3 text-sm">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-[color:var(--border)] px-4 py-3 transition-colors hover:bg-[var(--accent)] hover:text-[var(--background)]"
                >
                  Live
                </a>
              ) : null}
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="border border-[color:var(--border)] px-4 py-3 transition-colors hover:bg-[var(--accent)] hover:text-[var(--background)]"
              >
                Repository
              </a>
            </div>
          </div>

          <div className="border-t border-[color:var(--border)]">
            {items.map((item, index) => (
              <button
                key={item.label}
                type="button"
                data-detail-row
                onMouseEnter={() => activateItem(index)}
                onFocus={() => activateItem(index)}
                className="group grid w-full gap-4 border-b border-[color:var(--border)] px-4 py-6 text-left text-[color:var(--muted)] transition-colors duration-300 last:border-b-0 hover:bg-[var(--accent)] hover:text-[var(--background)] focus-visible:bg-[var(--accent)] focus-visible:text-[var(--background)] md:grid-cols-[8rem_1fr] md:px-8"
              >
                <span className="text-[11px] uppercase">{item.label}</span>
                <span>
                  <span className="block text-xl leading-tight text-[var(--foreground)] transition-colors duration-300 group-hover:text-[var(--background)] group-focus-visible:text-[var(--background)]">
                    {item.value}
                  </span>
                  <span className="mt-2 block text-sm">{item.note}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative min-h-[420px] md:col-span-5 md:min-h-[calc(100svh-84px)]">
          <div className="sticky top-[84px] h-[calc(100svh-84px)] min-h-[520px] overflow-hidden">
            {previousItem ? (
              <DetailVisual
                key={`previous-${previousItem.label}-${visualVersion}`}
                item={previousItem}
                projectTitle={project.title}
                state="out"
              />
            ) : null}
            <DetailVisual
              key={`current-${activeItem.label}-${visualVersion}`}
              item={activeItem}
              projectTitle={project.title}
              state="in"
            />
            <div className="absolute inset-0 bg-[var(--accent)] opacity-0 mix-blend-screen transition-opacity duration-300 hover:opacity-60" />
            <div className="absolute bottom-8 left-8 max-w-[72%] bg-[var(--accent)] px-4 py-3 text-[var(--background)]">
              <p className="text-[11px] uppercase">{activeItem.label}</p>
              <p className="mt-1 text-base leading-tight">{activeItem.note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
