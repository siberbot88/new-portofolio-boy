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
      wheelMultiplier: 0.9,
      prevent: (node) => node.closest("[data-lenis-prevent]") !== null
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
        "[data-footer-link]",
        {
          autoAlpha: 0,
          y: 34
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: ".site-footer",
            start: "top 78%",
            once: true
          }
        }
      );

      gsap.fromTo(
        "[data-footer-email]",
        {
          autoAlpha: 0,
          yPercent: 44,
          filter: "blur(12px)"
        },
        {
          autoAlpha: 1,
          yPercent: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: "[data-footer-email]",
            start: "top 94%",
            once: true
          }
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

      gsap.utils
        .toArray<HTMLElement>("[data-archive-row], [data-detail-row]")
        .forEach((row) => {
          gsap.fromTo(
            row,
            {
              autoAlpha: 0,
              y: 32
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: {
                trigger: row,
                start: "top 92%",
                once: true
              }
            }
          );
        });

      gsap.utils.toArray<HTMLElement>("[data-project-card]").forEach((card) => {
        const visual = card.querySelector<HTMLElement>("[data-project-visual]");
        const title = card.querySelector<HTMLElement>("[data-project-title]");
        const annotation = card.querySelector<HTMLElement>(
          "[data-project-annotation]"
        );
        const invert = card.querySelector<HTMLElement>("[data-project-invert]");
        const moveAnnotationX = annotation
          ? gsap.quickTo(annotation, "x", {
              duration: 0.55,
              ease: "expo.out"
            })
          : null;
        const moveAnnotationY = annotation
          ? gsap.quickTo(annotation, "y", {
              duration: 0.55,
              ease: "expo.out"
            })
          : null;

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

        const move = (event: PointerEvent) => {
          if (!annotation || !moveAnnotationX || !moveAnnotationY) {
            return;
          }

          const anchor =
            annotation.offsetParent instanceof HTMLElement
              ? annotation.offsetParent
              : card;
          const rect = anchor.getBoundingClientRect();
          moveAnnotationX(event.clientX - rect.left + 20);
          moveAnnotationY(event.clientY - rect.top - 18);
        };

        const enter = () => {
          if (visual) {
            gsap.to(visual, {
              scale: 1.08,
              duration: 0.85,
              ease: "expo.out"
            });
          }

          if (title) {
            gsap.to(title, {
              x: 12,
              color: "#bfffa3",
              duration: 0.45,
              ease: "power3.out"
            });
          }

          if (invert) {
            gsap.to(invert, {
              autoAlpha: 0.72,
              duration: 0.4,
              ease: "power3.out"
            });
          }

          if (annotation) {
            gsap.to(annotation, {
              autoAlpha: 1,
              scale: 1,
              duration: 0.35,
              ease: "power3.out"
            });
          }
        };

        const leave = () => {
          if (visual) {
            gsap.to(visual, {
              scale: 1,
              duration: 0.95,
              ease: "expo.out"
            });
          }

          if (title) {
            gsap.to(title, {
              x: 0,
              color: "var(--foreground)",
              duration: 0.4,
              ease: "power3.out"
            });
          }

          if (invert) {
            gsap.to(invert, {
              autoAlpha: 0,
              duration: 0.45,
              ease: "power3.out"
            });
          }

          if (annotation) {
            gsap.to(annotation, {
              autoAlpha: 0,
              scale: 0.96,
              duration: 0.28,
              ease: "power3.out"
            });
          }
        };

        card.addEventListener("pointerenter", enter);
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", leave);
        card.addEventListener("focusin", enter);
        card.addEventListener("focusout", leave);

        cleanup.push(() => {
          card.removeEventListener("pointerenter", enter);
          card.removeEventListener("pointermove", move);
          card.removeEventListener("pointerleave", leave);
          card.removeEventListener("focusin", enter);
          card.removeEventListener("focusout", leave);
        });
      });

      gsap.utils
        .toArray<HTMLElement>("[data-project-carousel]")
        .forEach((carousel) => {
          let targetScroll = carousel.scrollLeft;
          const scrollToX = gsap.quickTo(carousel, "scrollLeft", {
            duration: 0.8,
            ease: "power3.out"
          });

          const wheel = (event: WheelEvent) => {
            if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
              return;
            }

            const maxScroll = carousel.scrollWidth - carousel.clientWidth;

            if (maxScroll <= 0) {
              return;
            }

            event.preventDefault();
            targetScroll = gsap.utils.clamp(
              0,
              maxScroll,
              targetScroll + event.deltaY * 1.25
            );
            scrollToX(targetScroll);
          };

          const syncScroll = () => {
            targetScroll = carousel.scrollLeft;
          };

          carousel.addEventListener("wheel", wheel, { passive: false });
          carousel.addEventListener("scroll", syncScroll, { passive: true });

          cleanup.push(() => {
            carousel.removeEventListener("wheel", wheel);
            carousel.removeEventListener("scroll", syncScroll);
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
