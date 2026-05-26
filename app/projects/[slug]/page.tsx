import Image from "next/image";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { CaseStudySection } from "@/components/CaseStudySection";
import { FooterNextProject } from "@/components/FooterNextProject";
import { ProjectDesignSystem } from "@/components/ProjectDesignSystem";
import { ProjectDetailMatrix } from "@/components/ProjectDetailMatrix";
import { getProjectBySlug, projects } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found"
    };
  }

  return {
    title: `${project.title} - Mohammad Bayu Rizki`,
    description: project.summary
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const nextProject = getProjectBySlug(project.nextProjectSlug) ?? projects[0];

  return (
    <main>
      <ProjectDetailMatrix project={project} />
      <ProjectDesignSystem project={project} />

      <CaseStudySection label="01 / Challenge" title="The Challenge">
        <p
          data-case-reveal
          className="max-w-4xl text-[1.65rem] leading-tight md:text-[2.35rem]"
        >
          {project.challenge}
        </p>
      </CaseStudySection>

      <CaseStudySection label="02 / Methodology" title="Methodology / Experiment">
        <ol className="grid gap-3">
          {project.methodology.map((step, index) => (
            <li
              key={step.title}
              data-case-reveal
              data-methodology-step
              className="methodology-card grid gap-5 border border-[color:var(--border)] bg-[var(--surface)] p-5 md:grid-cols-12 md:p-6"
            >
              <span className="text-[11px] uppercase text-[color:var(--muted)] md:col-span-1">
                0{index + 1}
              </span>
              <div className="md:col-span-7">
                <h3 className="text-xl font-medium">{step.title}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[color:var(--muted)]">
                  {step.description}
                </p>
              </div>
              <div className="md:col-span-4">
                <div className="methodology-signal border border-[color:var(--border)] bg-[var(--background)] p-4">
                  <div className="mb-2 flex items-center justify-between text-[11px] uppercase text-[color:var(--muted)]">
                    <span>{step.artifact}</span>
                    <span>{step.signal}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden bg-[rgba(248,248,248,0.1)]">
                    <div
                      data-progress-bar
                      className="methodology-signal-fill h-2 bg-[var(--accent)]"
                      style={
                        {
                          width: step.signal
                        } as CSSProperties
                      }
                    />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </CaseStudySection>

      <CaseStudySection label="03 / Solution" title="The Solution">
        <div className="grid gap-4 md:grid-cols-2">
          {project.solution.map((item) => (
            <figure
              key={item.title}
              data-case-reveal
              data-solution-card
              className="solution-card overflow-hidden border border-[color:var(--border)] bg-[var(--surface)]"
            >
              <div className="relative aspect-video border-b border-[color:var(--border)] bg-[var(--background)]">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="p-5 md:p-6">
                <h3 className="text-lg font-medium">{item.title}</h3>
                <p className="mt-3 text-base leading-7 text-[color:var(--muted)]">
                  {item.description}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </CaseStudySection>

      <CaseStudySection label="04 / Impact" title="Impact & Metrics">
        <div className="grid gap-3 md:grid-cols-3">
          {project.impactMetrics.map((metric) => (
            <div
              key={metric.label}
              data-case-reveal
              data-impact-card
              className="impact-card border border-[color:var(--border)] bg-[var(--surface)] p-5 md:p-6"
            >
              <p className="text-4xl font-medium leading-none text-[var(--accent)]">
                {metric.value}
              </p>
              <h3 className="mt-6 text-lg font-medium">{metric.label}</h3>
              <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                {metric.description}
              </p>
            </div>
          ))}
        </div>
      </CaseStudySection>

      <FooterNextProject project={nextProject} />
    </main>
  );
}
