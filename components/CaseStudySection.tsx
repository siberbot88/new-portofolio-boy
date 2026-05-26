import type { ReactNode } from "react";

type CaseStudySectionProps = {
  label: string;
  title: string;
  children: ReactNode;
};

export function CaseStudySection({
  label,
  title,
  children
}: CaseStudySectionProps) {
  return (
    <section
      data-case-section
      className="case-study-section border-b border-[color:var(--border)] px-4 py-12 md:px-8 md:py-16"
    >
      <div className="mx-auto grid max-w-[1600px] gap-6 md:grid-cols-12">
        <p className="text-[11px] uppercase text-[color:var(--muted)] md:col-span-3">
          {label}
        </p>
        <div className="md:col-span-9">
          <h2 data-case-heading className="mb-7 text-2xl font-medium">
            {title}
          </h2>
          {children}
        </div>
      </div>
    </section>
  );
}
