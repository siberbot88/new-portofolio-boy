import { ArchiveList } from "@/components/ArchiveList";
import { projects } from "@/data/projects";

export const metadata = {
  title: "Archive - Mohammad Bayu Rizki",
  description:
    "Complete archive of portfolio projects by Mohammad Bayu Rizki across analytics, web apps, data science, and interactive products."
};

export default function ArchivePage() {
  return <ArchiveList projects={projects} />;
}
