import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

const categoryColor: Record<string, string> = {
  All: "var(--accent)",
  "Web App / Platform": "var(--accent-bright)",
  "Dashboard / Analytics": "var(--accent-blue)",
  "Game / Interactive": "var(--accent-red)",
  "Data Science / ML": "var(--accent-green)",
  "Learning / Storytelling": "var(--accent-yellow)",
  "Research / Journey Mapping": "var(--accent-pink)",
  "Automation / Operations": "var(--accent-warm)"
};

type ProjectFilterProps = {
  categories: string[];
  activeCategory: string;
  countByCategory: Record<string, number>;
  onChange: (category: string) => void;
};

export function ProjectFilter({
  categories,
  activeCategory,
  countByCategory,
  onChange
}: ProjectFilterProps) {
  return (
    <div
      aria-label="Filter projects by category"
      className="flex flex-wrap gap-x-4 gap-y-2 border-b border-[color:var(--border)] pb-4 text-[11px] uppercase"
    >
      {categories.map((category) => {
        const active = activeCategory === category;

        return (
          <button
            key={category}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(category)}
            style={
              {
                "--filter-color": categoryColor[category] ?? "var(--accent)"
              } as CSSProperties
            }
            className={cn(
              "inline-flex items-center gap-2 text-[color:var(--muted)] transition-colors",
              "hover:text-[var(--filter-color)] focus-visible:text-[var(--filter-color)]",
              active && "text-[var(--filter-color)]"
            )}
          >
            <span>{category}</span>
            <span
              aria-hidden="true"
              className={cn(
                "h-1.5 w-1.5 border border-[color:var(--border)]",
                active && "border-[var(--filter-color)] bg-[var(--filter-color)]"
              )}
            />
            <span className="text-[color:var(--muted)]">
              {countByCategory[category] ?? 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}
