/* eslint-disable @next/next/no-css-tags -- Explicit stylesheet fallback for the current Next/Webpack runtime. */
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { FloatingMenu } from "@/components/FloatingMenu";
import { Header } from "@/components/Header";
import { MotionSystem } from "@/components/MotionSystem";
import { PageTransitionSystem } from "@/components/PageTransitionSystem";
import { SketchCursor } from "@/components/SketchCursor";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Mohammad Bayu Rizki - Portfolio",
  description:
    "Index-based portfolio for business analysis, UX research, and digital development work."
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
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
      </head>
      <body>
        <Header />
        <PageTransitionSystem />
        <MotionSystem />
        <SketchCursor />
        {children}
        <SiteFooter />
        <FloatingMenu />
      </body>
    </html>
  );
}
