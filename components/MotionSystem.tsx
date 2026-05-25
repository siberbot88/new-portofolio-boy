"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export function MotionSystem() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.15,
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.9
    });

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const cleanup: Array<() => void> = [];

    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-animate='hero-line']",
        {
          autoAlpha: 0,
          y: 96,
          rotate: -2,
          filter: "blur(10px)"
        },
        {
          autoAlpha: 1,
          y: 0,
          rotate: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.12
        }
      );

      gsap.fromTo(
        "[data-animate='fade-up']",
        {
          autoAlpha: 0,
          y: 36
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          delay: 0.16,
          ease: "power3.out",
          stagger: 0.08
        }
      );

      gsap.fromTo(
        "[data-project-card]",
        {
          autoAlpha: 0,
          y: 140,
          clipPath: "inset(18% 0% 0% 0%)"
        },
        {
          autoAlpha: 1,
          y: 0,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.15,
          delay: 0.3,
          ease: "expo.out",
          stagger: 0.08
        }
      );

      gsap.utils.toArray<HTMLElement>("[data-project-card]").forEach((card) => {
        const visual = card.querySelector<HTMLElement>("[data-project-visual]");
        const title = card.querySelector<HTMLElement>("[data-project-title]");
        const explore = card.querySelector<HTMLElement>("[data-project-explore]");

        if (visual) {
          gsap.to(visual, {
            yPercent: -12,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8
            }
          });
        }

        const enter = () => {
          gsap.to(visual, {
            scale: 1.08,
            duration: 0.65,
            ease: "power3.out"
          });
          gsap.to(title, {
            x: 12,
            color: "#ccff00",
            duration: 0.35,
            ease: "power3.out"
          });
          gsap.to(explore, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.35,
            ease: "power3.out"
          });
        };

        const leave = () => {
          gsap.to(visual, {
            scale: 1,
            duration: 0.75,
            ease: "power3.out"
          });
          gsap.to(title, {
            x: 0,
            color: "var(--foreground)",
            duration: 0.35,
            ease: "power3.out"
          });
          gsap.to(explore, {
            autoAlpha: 0,
            scale: 0.92,
            duration: 0.3,
            ease: "power3.out"
          });
        };

        card.addEventListener("pointerenter", enter);
        card.addEventListener("pointerleave", leave);
        card.addEventListener("focusin", enter);
        card.addEventListener("focusout", leave);

        cleanup.push(() => {
          card.removeEventListener("pointerenter", enter);
          card.removeEventListener("pointerleave", leave);
          card.removeEventListener("focusin", enter);
          card.removeEventListener("focusout", leave);
        });
      });
    });

    return () => {
      cleanup.forEach((callback) => callback());
      context.revert();
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return null;
}
