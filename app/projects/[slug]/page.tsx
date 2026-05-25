import Image from "next/image";
import { notFound } from "next/navigation";
import { CaseStudySection } from "@/components/CaseStudySection";
import { FooterNextProject } from "@/components/FooterNextProject";
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

      <CaseStudySection label="01 / Challenge" title="The Challenge">
        <p className="max-w-4xl text-[1.6rem] leading-tight">
          {project.challenge}
        </p>
      </CaseStudySection>

      <CaseStudySection label="02 / Methodology" title="Methodology / Experiment">
        <ol className="border-t border-[color:var(--border)]">
          {project.methodology.map((step, index) => (
            <li
              key={step.title}
              className="grid gap-4 border-b border-[color:var(--border)] py-5 md:grid-cols-12"
            >
              <span className="text-[11px] text-[color:var(--muted)] md:col-span-1">
                {(index + 1).toString().padStart(2, "0")}
              </span>
              <div className="md:col-span-7">
                <h3 className="text-base font-medium">{step.title}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[color:var(--muted)]">
                  {step.description}
                </p>
              </div>
              <div className="md:col-span-4">
                <div className="border border-[color:var(--border)] bg-[var(--surface)] p-3">
                  <div className="mb-2 flex items-center justify-between text-[11px] uppercase text-[color:var(--muted)]">
                    <span>{step.artifact}</span>
                    <span>{step.signal}</span>
                  </div>
                  <div className="h-2 w-full bg-[rgba(17,17,17,0.08)]">
                    <div
                      className="h-2 bg-[var(--accent)]"
                      style={{ width: step.signal }}
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
              className="border border-[color:var(--border)] bg-[var(--surface)]"
            >
              <div className="relative aspect-video border-b border-[color:var(--border)]">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="p-4">
                <h3 className="font-medium">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
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
              className="border border-[color:var(--border)] bg-[var(--surface)] p-4"
            >
              <p className="text-3xl font-medium leading-none text-[var(--accent)]">
                {metric.value}
              </p>
              <h3 className="mt-4 font-medium">{metric.label}</h3>
              <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
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
