import type { Project } from "@/data/projects";

type ProjectMetaTableProps = {
  project: Project;
};

export function ProjectMetaTable({ project }: ProjectMetaTableProps) {
  const meta = [
    {
      label: "Client / Industry",
      value: project.client
    },
    {
      label: "Duration",
      value: project.duration
    },
    {
      label: "Role",
      value: project.role
    },
    {
      label: "Links",
      value: (
        <span className="inline-flex flex-wrap gap-3">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--accent-bright)] underline-offset-4 hover:underline"
            >
              Live
            </a>
          ) : null}
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[var(--accent-bright)] underline-offset-4 hover:underline"
          >
            Repository
          </a>
        </span>
      )
    }
  ];

  return (
    <section className="border-b border-[color:var(--border)]">
      <div className="mx-auto grid max-w-[1600px] gap-6 px-4 py-8 md:grid-cols-12 md:px-6">
        <div className="md:col-span-6">
          <p className="text-[11px] uppercase text-[color:var(--muted)]">
            {project.number} / {project.year} / {project.category}
          </p>
          <h1 className="mt-2 text-3xl font-medium leading-tight">
            {project.title}
          </h1>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-[color:var(--muted)] md:col-span-6">
          {project.summary}
        </p>
      </div>

      <dl className="mx-auto grid max-w-[1600px] border-t border-[color:var(--border)] md:grid-cols-4">
        {meta.map((item) => (
          <div
            key={item.label}
            className="border-b border-[color:var(--border)] px-4 py-4 last:border-b-0 md:border-b-0 md:border-r md:px-6 md:last:border-r-0"
          >
            <dt className="text-[11px] uppercase text-[color:var(--muted)]">
              {item.label}
            </dt>
            <dd className="mt-2 text-sm leading-6">{item.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mx-auto max-w-[1600px] border-t border-[color:var(--border)] px-4 py-4 text-[11px] uppercase text-[color:var(--muted)] md:px-6">
        Stack / {project.techStack.join(" / ")}
      </div>
    </section>
  );
}
