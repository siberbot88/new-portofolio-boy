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
    <section className="border-b border-[color:var(--border)] px-4 py-10 md:px-6 md:py-14">
      <div className="mx-auto grid max-w-[1600px] gap-6 md:grid-cols-12">
        <p className="text-[11px] uppercase text-[color:var(--muted)] md:col-span-3">
          {label}
        </p>
        <div className="md:col-span-9">
          <h2 className="mb-6 text-xl font-medium">{title}</h2>
          {children}
        </div>
      </div>
    </section>
  );
}
