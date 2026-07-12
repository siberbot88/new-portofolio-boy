"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const DESIGN_IMAGES = [
  {
    src: "/projects/design-ui-ux/optimized/BBIHUB.webp",
    alt: "BBIHUB UI/UX Design"
  },
  {
    src: "/projects/design-ui-ux/optimized/Harversfarm-APP.webp",
    alt: "Harversfarm App UI/UX Design"
  },
  {
    src: "/projects/design-ui-ux/optimized/LIORA-APP.webp",
    alt: "Liora App UI/UX Design"
  },
  {
    src: "/projects/design-ui-ux/optimized/Safetion-APP.webp",
    alt: "Safetion App UI/UX Design"
  },
  {
    src: "/projects/design-ui-ux/optimized/Trailo-APP.webp",
    alt: "Trailo App UI/UX Design"
  },
  {
    src: "/projects/design-ui-ux/optimized/WEB-Pemda.webp",
    alt: "Web Pemda UI/UX Design"
  }
];

export function DesignUiUxGallery() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const viewport = scrollerRef.current;
    const track = trackRef.current;

    if (!viewport || !track) {
      return;
    }

    let setWidth = 0;
    let offset = 0;
    let velocity = -0.44;
    let direction = -1;
    let animationId = 0;
    let lastFrame = performance.now();
    let isVisible = false;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const measure = () => {
      const firstSet = track.firstElementChild;

      if (!(firstSet instanceof HTMLElement)) {
        return;
      }

      const previousSetWidth = setWidth;
      setWidth = firstSet.getBoundingClientRect().width;

      if (!previousSetWidth && setWidth) {
        offset = setWidth;
      }
    };

    const wrapOffset = () => {
      if (!setWidth) {
        return;
      }

      while (offset >= setWidth * 2) {
        offset -= setWidth;
      }

      while (offset < setWidth) {
        offset += setWidth;
      }
    };

    const stopAnimation = () => {
      if (animationId) {
        window.cancelAnimationFrame(animationId);
        animationId = 0;
      }
    };

    const animate = (time: number) => {
      if (!isVisible || reducedMotion.matches) {
        animationId = 0;
        return;
      }

      const frameDelta = Math.min(
        2.2,
        Math.max(0.45, (time - lastFrame) / 16.67)
      );
      const cruise = direction * 0.44;
      lastFrame = time;

      if (!setWidth) {
        measure();
      }

      velocity += (cruise - velocity) * (1 - Math.pow(0.955, frameDelta));
      offset += velocity * frameDelta;
      wrapOffset();

      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      animationId = window.requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (animationId || reducedMotion.matches) {
        return;
      }

      lastFrame = performance.now();
      animationId = window.requestAnimationFrame(animate);
    };

    // Opposite of the project carousel: down moves right, up moves left.
    let lastScrollY = window.scrollY;

    const handlePageScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      if (isVisible && Math.abs(delta) > 1) {
        direction = delta > 0 ? -1 : 1;
        velocity += delta * -0.065;
        velocity = Math.max(-32, Math.min(32, velocity));
        startAnimation();
      }

      lastScrollY = currentScrollY;
    };

    const wheel = (event: WheelEvent) => {
      const dominantDelta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;

      if (!dominantDelta) {
        return;
      }

      direction = dominantDelta >= 0 ? -1 : 1;
      velocity += dominantDelta * -0.088;
      velocity = Math.max(-32, Math.min(32, velocity));
      startAnimation();
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = Boolean(entry?.isIntersecting);

        if (isVisible) {
          measure();
          startAnimation();
          return;
        }

        stopAnimation();
      },
      {
        rootMargin: "360px 0px"
      }
    );

    resizeObserver.observe(viewport);
    resizeObserver.observe(track);
    intersectionObserver.observe(viewport);
    window.addEventListener("scroll", handlePageScroll, { passive: true });
    viewport.addEventListener("wheel", wheel, { passive: true });

    return () => {
      stopAnimation();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("scroll", handlePageScroll);
      viewport.removeEventListener("wheel", wheel);
    };
  }, []);

  return (
    <div
      className="design-uiux-gallery"
      aria-label="UI/UX design portfolio gallery"
    >
      <div className="design-uiux-gallery__header">
        <p className="design-uiux-gallery__label">UI/UX Design Portfolio</p>
        <p className="design-uiux-gallery__count">
          {DESIGN_IMAGES.length.toString().padStart(2, "0")} Designs
        </p>
      </div>

      <div ref={scrollerRef} className="design-uiux-gallery__viewport">
        <div ref={trackRef} className="design-uiux-gallery__track">
          {[0, 1, 2].map((copyIndex) => (
            <div
              key={copyIndex}
              className="design-uiux-gallery__set"
              aria-hidden={copyIndex !== 1}
            >
              {DESIGN_IMAGES.map((image, index) => (
                <div
                  key={`${copyIndex}-${index}`}
                  className="design-uiux-gallery__card"
                >
                  <div className="design-uiux-gallery__image-wrapper">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 768px) 82vw, 520px"
                      className="design-uiux-gallery__image"
                    />
                  </div>
                  <div className="design-uiux-gallery__image-label">
                    <span className="design-uiux-gallery__image-index">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="design-uiux-gallery__image-alt">
                      {image.alt}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
