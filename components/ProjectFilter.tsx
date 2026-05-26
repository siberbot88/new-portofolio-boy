import { cn } from "@/lib/utils";

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
      className="flex flex-wrap gap-x-5 gap-y-3 text-[11px] uppercase"
    >
      {categories.map((category) => {
        const active = activeCategory === category;

        return (
          <button
            key={category}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(category)}
            className={cn(
              "inline-flex items-center gap-2 text-[color:var(--muted)] transition-colors",
              "hover:text-[var(--accent)] focus-visible:text-[var(--accent)]",
              active && "text-[var(--accent)]"
            )}
          >
            <span>{category}</span>
            <span className="text-[10px]">
              {String(countByCategory[category] ?? 0).padStart(2, "0")}
            </span>
          </button>
        );
      })}
    </div>
  );
}
