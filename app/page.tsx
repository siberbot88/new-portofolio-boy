import { ProjectIndexTable } from "@/components/ProjectIndexTable";
import dynamic from "next/dynamic";
import { projects } from "@/data/projects";

const DesignUiUxGallery = dynamic(
  () => import("@/components/DesignUiUxGallery").then((mod) => mod.DesignUiUxGallery),
  { ssr: true }
);
export default function Home() {
  return (
    <main>
      <ProjectIndexTable projects={projects} />

      <section
        id="archive"
        className="min-h-[60vh] bg-[var(--background)] px-4 py-12 text-[var(--foreground)] md:px-8 md:py-16"
      >
        <div className="grid gap-8 md:grid-cols-12">
          <p className="text-[12px] uppercase text-[color:var(--muted)] md:col-span-3">
            Archive Summary
          </p>
          <p className="max-w-3xl text-2xl leading-tight md:col-span-6">
            A compact working archive across web platforms, analytics, machine
            learning, learning tools, and interactive game prototypes. Every
            case study is reachable from this index in one click.
          </p>
          <p className="text-[12px] uppercase text-[color:var(--muted)] md:col-span-3 md:text-right">
            Flat Architecture
          </p>
        </div>

        <DesignUiUxGallery />
      </section>
    </main>
  );
}
