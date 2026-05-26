"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import type { Project } from "@/data/projects";

const palette = [
  {
    name: "Deep Slate",
    value: "#0D1B1E"
  },
  {
    name: "Graphite",
    value: "#3D3D3D"
  },
  {
    name: "Clear White",
    value: "#F8F8F8"
  },
  {
    name: "Soft Signal",
    value: "#C9FBC6"
  }
];

type ProjectDesignSystemProps = {
  project: Project;
};

type ColorIndexes = {
  background: number;
  panel: number;
  shape: number;
  line: number;
};

function getReadableTextColor(color: string) {
  return color === "#F8F8F8" || color === "#C9FBC6" ? "#0D1B1E" : "#F8F8F8";
}

function getShuffledColorIndexes() {
  const keys = ["background", "panel", "shape", "line"] as const;
  const result: ColorIndexes = {
    background: 0,
    panel: 2,
    shape: 3,
    line: 1
  };

  palette
    .map((_, index) => index)
    .sort(() => Math.random() - 0.5)
    .forEach((index, order) => {
      result[keys[order]] = index;
    });

  return result;
}

export function ProjectDesignSystem({ project }: ProjectDesignSystemProps) {
  const [colorIndexes, setColorIndexes] = useState({
    background: 0,
    panel: 2,
    shape: 3,
    line: 1
  });

  useEffect(() => {
    let timeout = 0;

    const cycle = () => {
      setColorIndexes(getShuffledColorIndexes());

      timeout = window.setTimeout(cycle, 1200 + Math.random() * 850);
    };

    timeout = window.setTimeout(cycle, 900);

    return () => {
      window.clearTimeout(timeout);
    };
  }, []);

  const cssVariables = useMemo(
    () =>
      ({
        "--system-bg": palette[colorIndexes.background].value,
        "--system-bg-text": getReadableTextColor(
          palette[colorIndexes.background].value
        ),
        "--system-panel": palette[colorIndexes.panel].value,
        "--system-panel-text": getReadableTextColor(
          palette[colorIndexes.panel].value
        ),
        "--system-shape": palette[colorIndexes.shape].value,
        "--system-shape-text": getReadableTextColor(
          palette[colorIndexes.shape].value
        ),
        "--system-line": palette[colorIndexes.line].value,
        "--system-line-text": getReadableTextColor(
          palette[colorIndexes.line].value
        )
      }) as CSSProperties,
    [colorIndexes]
  );

  return (
    <section
      data-design-system
      data-case-reveal
      className="project-system border-b border-[color:var(--border)] px-4 py-12 md:px-8 md:py-16"
      style={cssVariables}
    >
      <div className="grid gap-8 md:grid-cols-12">
        <p className="text-[11px] uppercase text-[color:var(--muted)] md:col-span-2">
          00 / Design System
        </p>

        <div className="md:col-span-5">
          <div className="project-system-abstract relative min-h-[440px] overflow-hidden bg-[var(--system-bg)] text-[var(--system-bg-text)]">
            <span className="project-system-abstract__ring" />
            <span className="project-system-abstract__slash" />
            <span className="project-system-abstract__dot" />
            <span className="project-system-abstract__grid" />
            <div className="absolute bottom-5 left-5 right-5 z-10 flex items-end justify-between gap-6">
              <div>
                <p className="text-[11px] uppercase">Palette Logic</p>
                <p className="mt-2 max-w-xs text-2xl font-medium leading-tight">
                  {project.category}
                </p>
              </div>
              <p className="text-right text-[11px] uppercase leading-5">
                {project.number}
                <br />
                {project.year}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:col-span-5">
          <div className="project-system-panel bg-[var(--system-panel)] p-5 text-[var(--system-panel-text)]">
            <p className="text-[11px] uppercase opacity-70">Typography</p>
            <h2 className="mt-6 text-4xl font-medium leading-none md:text-6xl">
              Inter
            </h2>
            <p className="mt-8 max-w-xl text-xl leading-tight">
              Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu
              Vv Ww Xx Yy Zz 0123456789
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="project-system-panel bg-[var(--system-line)] p-5 text-[var(--system-line-text)]">
              <p className="text-[11px] uppercase opacity-70">Layout Grid</p>
              <div className="mt-8 grid h-40 grid-cols-12 gap-1">
                {Array.from({ length: 12 }).map((_, index) => (
                  <span
                    key={index}
                    className="block bg-current opacity-[0.18]"
                  />
                ))}
              </div>
              <p className="mt-4 text-sm leading-5">
                12-column responsive index structure.
              </p>
            </div>

            <div className="grid gap-2">
              {palette.map((color) => (
                <div
                  key={color.value}
                  className="grid min-h-20 content-between p-4"
                  style={{
                    backgroundColor: color.value,
                    color:
                      color.value === "#F8F8F8" || color.value === "#C9FBC6"
                        ? "#0D1B1E"
                        : "#F8F8F8"
                  }}
                >
                  <p className="text-sm font-medium">{color.name}</p>
                  <p className="text-[11px] uppercase opacity-70">
                    {color.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="project-system-panel bg-[var(--system-bg)] p-5 text-[var(--system-bg-text)]">
            <p className="text-[11px] uppercase opacity-70">Connected System</p>
            <p className="mt-6 max-w-2xl text-2xl leading-tight">
              {project.discipline} connects the visual language, interaction
              rhythm, and evidence structure for this case study.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
