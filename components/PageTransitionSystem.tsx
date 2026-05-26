"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";

type ActiveTransition = {
  id: number;
};

const previewProjects = projects.slice(0, 7);

function easeInOutCubic(value: number) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function isModifiedClick(event: MouseEvent) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

function scrollToHash(hash: string) {
  if (!hash) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const target = document.getElementById(decodeURIComponent(hash.slice(1)));

  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function PageTransitionSystem() {
  const [activeTransition, setActiveTransition] =
    useState<ActiveTransition | null>(null);
  const [progress, setProgress] = useState(0);
  const transitionIdRef = useRef(0);
  const timeoutsRef = useRef<number[]>([]);
  const rafRef = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    timeoutsRef.current.forEach((timeout) => window.clearTimeout(timeout));
    timeoutsRef.current = [];

    if (rafRef.current) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const runTransition = useCallback(
    () => {
      const id = transitionIdRef.current + 1;
      transitionIdRef.current = id;
      clearTimers();

      const duration = 3000;
      const start = performance.now();

      setActiveTransition({ id });
      setProgress(0);

      const animate = (time: number) => {
        const raw = Math.min(1, (time - start) / duration);
        const eased = easeInOutCubic(raw);
        setProgress(eased * 100);

        if (raw < 1 && transitionIdRef.current === id) {
          rafRef.current = window.requestAnimationFrame(animate);
        }
      };

      rafRef.current = window.requestAnimationFrame(animate);

      const hideTimeout = window.setTimeout(() => {
        if (transitionIdRef.current === id) {
          setProgress(100);
          setActiveTransition(null);
        }
      }, duration + 120);

      timeoutsRef.current.push(hideTimeout);
    },
    [clearTimers]
  );

  useEffect(() => {
    runTransition();

    return () => {
      clearTimers();
    };
  }, [clearTimers, runTransition]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || isModifiedClick(event)) {
        return;
      }

      const target = event.target instanceof Element ? event.target : null;
      const anchor = target?.closest<HTMLAnchorElement>("a[href]");

      if (!anchor) {
        return;
      }

      const href = anchor.getAttribute("href");

      if (
        !href ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download") ||
        anchor.dataset.noTransition === "true"
      ) {
        return;
      }

      const destination = new URL(href, window.location.href);

      if (destination.origin !== window.location.origin) {
        return;
      }

      const current = new URL(window.location.href);
      const currentTarget = `${current.pathname}${current.search}${current.hash}`;
      const nextTarget = `${destination.pathname}${destination.search}${destination.hash}`;

      if (currentTarget === nextTarget && destination.pathname !== "/") {
        return;
      }

      const sameDocument =
        current.pathname === destination.pathname &&
        current.search === destination.search &&
        destination.hash;

      if (!sameDocument) {
        return;
      }

      event.preventDefault();
      window.history.pushState(null, "", destination.href);
      scrollToHash(destination.hash);
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  const imageProgress = activeTransition
    ? Math.max(0, Math.min(1, (progress - 16) / 84))
    : 0;
  const targetPreviewIndex = Math.min(
    previewProjects.length - 1,
    Math.floor(imageProgress * previewProjects.length)
  );
  const imageEnabled = activeTransition !== null && progress >= 16;

  if (!activeTransition) {
    return null;
  }

  const roundedProgress = Math.min(100, Math.round(progress));
  const exitProgress = Math.max(0, Math.min(1, (progress - 90) / 10));
  const style =
    {
      "--loader-progress": progress.toFixed(3),
      "--loader-clip": `${(100 - progress).toFixed(3)}%`,
      "--loader-exit": exitProgress.toFixed(4),
      "--loader-black-opacity": (
        Math.max(0, Math.min(1, (progress - 76) / 24)) * 0.86
      ).toFixed(4),
      "--loader-image-opacity": Math.min(1, imageProgress * 5).toFixed(4)
    } as CSSProperties;
  const currentProject = previewProjects[targetPreviewIndex];
  const previousProject =
    imageEnabled && targetPreviewIndex > 0
      ? previewProjects[targetPreviewIndex - 1]
      : null;

  return (
    <div
      className="welcome-transition"
      style={style}
      aria-live="polite"
      aria-busy="true"
    >
      <div className="welcome-transition__fill" />
      <div className="welcome-transition__cloth" />

      <div className="welcome-transition__content">
        <div className="welcome-transition__identity">
          <h1>Mohammad Bayu Rizki</h1>
          <p>Business Analysis & Digital Builds</p>
        </div>

        <div className="welcome-transition__preview" aria-hidden="true">
          {previousProject ? (
            <div
              key={`${activeTransition.id}-previous-${previousProject.id}-${targetPreviewIndex}`}
              className="welcome-transition__card-frame welcome-transition__card-frame--out"
            >
              <Image
                src={previousProject.thumbnail}
                alt=""
                fill
                priority
                sizes="340px"
                className="object-cover"
              />
            </div>
          ) : null}

          {imageEnabled ? (
            <div
              key={`${activeTransition.id}-${currentProject.id}`}
              className="welcome-transition__card-frame welcome-transition__card-frame--in"
            >
              <Image
                src={currentProject.thumbnail}
                alt=""
                fill
                priority
                sizes="340px"
                className="object-cover"
              />
            </div>
          ) : null}
          <div className="welcome-transition__card-sleeve">
            {previewProjects.map((project, index) => (
              <div
                key={project.id}
                className={
                  index <= targetPreviewIndex && imageEnabled
                    ? "welcome-transition__sleeve-step is-active"
                    : "welcome-transition__sleeve-step"
                }
              >
                <span />
              </div>
            ))}
          </div>
        </div>

        <p className="welcome-transition__percent">
          {roundedProgress.toString().padStart(2, "0")}%
        </p>
      </div>
    </div>
  );
}
