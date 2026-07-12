import { ArchiveList } from "@/components/ArchiveList";
import { projects } from "@/data/projects";
import type { Metadata } from "next";
import { SITE_URL, PERSON, archiveItemListJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Archive",
  description:
    "Complete archive of 22+ portfolio projects by Mohammad Bayu Rizki across analytics, web apps, data science, machine learning, and interactive products.",
  keywords: [
    "Mohammad Bayu Rizki",
    "project archive",
    "portfolio",
    "case studies",
    "dashboards",
    "web apps",
    "machine learning",
    "data science"
  ],
  alternates: {
    canonical: `${SITE_URL}/archive`
  },
  openGraph: {
    type: "website",
    title: `Archive — ${PERSON.name}`,
    description:
      "Complete archive of portfolio projects by Mohammad Bayu Rizki across analytics, web apps, data science, and interactive products.",
    url: `${SITE_URL}/archive`,
    siteName: `${PERSON.name} Portfolio`,
    images: [
      {
        url: "/projects/logo.png",
        width: 512,
        height: 512,
        alt: `${PERSON.name} — Project Archive`
      }
    ]
  }
};

export default function ArchivePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(archiveItemListJsonLd(projects))
        }}
      />
      <ArchiveList projects={projects} />
    </>
  );
}
