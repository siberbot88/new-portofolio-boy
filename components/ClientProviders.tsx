"use client";

import { MotionSystem } from "@/components/MotionSystem";
import { PageTransitionSystem } from "@/components/PageTransitionSystem";
import { SketchCursor } from "@/components/SketchCursor";
import { FloatingMenu } from "@/components/FloatingMenu";
import { AiChatbot } from "@/components/AiChatbot";

/**
 * Renders all client-only interactive components.
 * This wrapper uses "use client" so that child components
 * can safely access browser APIs (GSAP, Lenis, window, etc.).
 */
export function ClientProviders() {
  return (
    <>
      <MotionSystem />
      <PageTransitionSystem />
      <SketchCursor />
      <FloatingMenu />
      <AiChatbot />
    </>
  );
}
