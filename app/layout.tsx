/* eslint-disable @next/next/no-css-tags -- Explicit stylesheet fallback for the current Next/Webpack runtime. */
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { FloatingMenu } from "@/components/FloatingMenu";
import { Header } from "@/components/Header";
import { MotionSystem } from "@/components/MotionSystem";
import { PageTransitionSystem } from "@/components/PageTransitionSystem";
import { SketchCursor } from "@/components/SketchCursor";
import { SiteFooter } from "@/components/SiteFooter";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE_URL, PERSON, profilePageJsonLd, webSiteJsonLd } from "@/lib/seo";

const siteTitle = "Mohammad Bayu Rizki — Business Analyst & Digital Developer";
const siteDescription =
  "Portfolio of Mohammad Bayu Rizki — Business Analyst, UX Researcher, and Full-Stack Developer. Showcasing 22+ case studies across dashboards, web platforms, machine learning, data storytelling, and interactive prototypes.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: siteTitle,
    template: "%s — Mohammad Bayu Rizki"
  },
  description: siteDescription,
  keywords: [
    "Mohammad Bayu Rizki",
    "Bayu Rizki",
    "portfolio",
    "business analyst",
    "business analysis",
    "data visualization",
    "UX research",
    "web developer",
    "full-stack developer",
    "dashboard",
    "machine learning",
    "data storytelling",
    "Next.js",
    "React",
    "Laravel",
    "Python",
    "D3.js",
    "digital development",
    "Indonesia",
    "UPN Veteran Jawa Timur",
    "teknologi informasi",
    "sistem informasi",
    "Google Scholar",
    "researcher"
  ],
  authors: [{ name: PERSON.name, url: SITE_URL }],
  creator: PERSON.name,
  publisher: PERSON.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  alternates: {
    canonical: SITE_URL
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    siteName: `${PERSON.name} Portfolio`,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/projects/logo.png",
        width: 512,
        height: 512,
        alt: `${PERSON.name} — Portfolio Logo`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/projects/logo.png"],
    creator: "@siberbot88"
  },
  category: "portfolio",
  classification: "Business Analysis, UX Research, Digital Development"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d1117"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="/site.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(profilePageJsonLd())
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteJsonLd())
          }}
        />
      </head>
      <body>
        <Header />
        <PageTransitionSystem />
        <MotionSystem />
        <SketchCursor />
        {children}
        <SiteFooter />
        <FloatingMenu />
        <SpeedInsights />
      </body>
    </html>
  );
}

