"use client";

import { useEffect, useState } from "react";

export function ProjectOpenCurtain() {
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setMounted(false);
    }, 1450);

    return () => {
      window.clearTimeout(timeout);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="project-entry-curtain" aria-hidden="true">
      <span className="project-entry-curtain__grain" />
      <span className="project-entry-curtain__fold project-entry-curtain__fold--a" />
      <span className="project-entry-curtain__fold project-entry-curtain__fold--b" />
    </div>
  );
}
