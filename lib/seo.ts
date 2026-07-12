import type { Project } from "@/data/projects";

export const SITE_URL = "https://mhdbayurizki.web.id";

export const PERSON = {
  name: "Mohammad Bayu Rizki",
  jobTitle: "Business Analyst & Digital Developer",
  email: "mohammadbayurizkii@gmail.com",
  github: "https://github.com/siberbot88",
  linkedin: "https://id.linkedin.com/in/mohammadbayurizki",
  scholar: "https://scholar.google.co.id/citations?user=_x5e--kAAAAJ",
  image: `${SITE_URL}/projects/logo.png`
};

/**
 * JSON-LD structured data for the Person (homepage).
 * Helps Google Knowledge Panel and AI understand who Mohammad Bayu Rizki is.
 */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSON.name,
    jobTitle: PERSON.jobTitle,
    url: SITE_URL,
    image: PERSON.image,
    email: `mailto:${PERSON.email}`,
    sameAs: [
      PERSON.github,
      PERSON.linkedin,
      PERSON.scholar
    ],
    knowsAbout: [
      "Business Analysis",
      "Data Visualization",
      "UX Research",
      "Web Development",
      "Machine Learning",
      "Dashboard Design",
      "Data Storytelling",
      "Full-Stack Development",
      "Teknologi Informasi",
      "Sistem Informasi",
      "Next.js",
      "React",
      "Laravel",
      "Python",
      "D3.js"
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Universitas Pembangunan Nasional Veteran Jawa Timur"
    },
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "Pengaruh Penggunaan AI terhadap Kompetensi dan Motivasi Belajar Mahasiswa",
        credentialCategory: "Scholarly Article"
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "Perancangan Sistem Informasi Geografis Wilayah Rawan Pembegalan Menggunakan Metode AAOD",
        credentialCategory: "Scholarly Article"
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "Model Adopsi DeepSeek AI pada Mahasiswa di Surabaya Menggunakan TAM",
        credentialCategory: "Scholarly Article"
      }
    ]
  };
}

/**
 * JSON-LD ProfilePage for the portfolio homepage.
 * Signals to search engines this is a person's profile page.
 */
export function profilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `${PERSON.name} — Portfolio`,
    url: SITE_URL,
    mainEntity: personJsonLd(),
    description:
      "Portfolio of Mohammad Bayu Rizki — Business Analyst and Digital Developer. Showcasing dashboards, web platforms, machine learning projects, and interactive prototypes."
  };
}

/**
 * JSON-LD WebSite for sitelinks search box and site identity.
 */
export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${PERSON.name} Portfolio`,
    url: SITE_URL,
    description:
      "Portfolio website of Mohammad Bayu Rizki showcasing business analysis, data science, and digital development projects.",
    author: personJsonLd()
  };
}

/**
 * JSON-LD CreativeWork for individual project case studies.
 */
export function projectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    url: `${SITE_URL}/projects/${project.slug}`,
    image: `${SITE_URL}${project.heroImage}`,
    description: project.summary,
    author: {
      "@type": "Person",
      name: PERSON.name,
      url: SITE_URL
    },
    datePublished: `${project.year}-01-01`,
    genre: project.category,
    keywords: [
      project.category,
      project.discipline,
      ...project.techStack
    ].join(", "),
    sourceOrganization: {
      "@type": "Organization",
      name: project.client
    }
  };
}

/**
 * JSON-LD BreadcrumbList for project detail pages.
 */
export function projectBreadcrumbJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Portfolio",
        item: SITE_URL
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Archive",
        item: `${SITE_URL}/archive`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `${SITE_URL}/projects/${project.slug}`
      }
    ]
  };
}

/**
 * JSON-LD ItemList for the archive/collection page.
 */
export function archiveItemListJsonLd(projects: Project[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Project Archive — Mohammad Bayu Rizki",
    url: `${SITE_URL}/archive`,
    description:
      "Complete archive of portfolio projects by Mohammad Bayu Rizki across analytics, web apps, data science, and interactive products.",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.title,
        url: `${SITE_URL}/projects/${project.slug}`
      }))
    }
  };
}
