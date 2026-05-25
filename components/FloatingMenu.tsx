"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const email = "mohammadbayurizkii@gmail.com";

export function FloatingMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (open) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          data-lenis-prevent
          onWheel={(event) => event.stopPropagation()}
          onTouchMove={(event) => event.stopPropagation()}
          className="menu-overlay fixed inset-0 z-[65] max-h-svh overflow-y-auto overscroll-contain bg-[var(--paper)] pb-28 text-[var(--ink)]"
        >
          <div className="min-h-svh pb-10">
            <div className="grid gap-y-4 px-4 py-8 text-sm leading-none md:grid-cols-12 md:px-8">
              <Link
                href="/"
                onClick={closeMenu}
                className="grid max-w-2xl grid-cols-[auto_auto_minmax(0,1fr)] gap-8 font-medium md:col-span-5 md:gap-20"
                aria-label="Go to portfolio index"
              >
                <span>M.</span>
                <span>B.</span>
                <span>Mohammad Bayu Rizki</span>
              </Link>
              <p className="text-[12px] uppercase text-black/50 md:col-span-2 md:text-center">
                Menu / 2024-2026
              </p>
              <nav
                aria-label="Overlay navigation"
                className="flex flex-wrap gap-x-6 gap-y-2 text-sm md:col-span-5 md:justify-end"
              >
                <Link
                  href="/#selected"
                  onClick={closeMenu}
                  className="inline-flex items-baseline gap-1 font-medium"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-[#071a19]" />
                  Selected <sup className="text-[10px] text-black/45">(07)</sup>
                </Link>
                <Link
                  href="/archive"
                  onClick={closeMenu}
                  className="inline-flex items-baseline gap-1 text-black/55"
                >
                  <span className="h-2.5 w-2.5 rounded-full border border-black/35" />
                  Archive <sup className="text-[10px]">(07)</sup>
                </Link>
                <a
                  href={`mailto:${email}`}
                  onClick={closeMenu}
                  className="inline-flex items-baseline gap-1 text-black/55"
                >
                  <span className="h-2.5 w-2.5 rounded-full border border-black/35" />
                  Contact <sup className="text-[10px]">(01)</sup>
                </a>
              </nav>
            </div>

            <section className="grid gap-10 px-4 pb-12 pt-6 md:grid-cols-12 md:px-8 md:pb-14 md:pt-8">
              <div className="md:col-span-5 md:col-start-2">
                <p className="max-w-xl text-2xl font-medium leading-tight md:text-[2.45rem]">
                  Feel free to contact me to say hello or discuss a project. I
                  would love to hear from you.
                </p>
                <a
                  href={`mailto:${email}`}
                  className="mt-8 block text-base text-black/55 transition-colors hover:text-[#071a19]"
                >
                  {email}
                </a>
              </div>
              <nav className="flex flex-wrap items-end gap-x-8 gap-y-3 text-base text-black/55 md:col-span-5 md:col-start-8 md:justify-end md:self-end">
                <a
                  href="https://github.com/siberbot88"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-[#071a19]"
                >
                  GitHub
                </a>
                <Link
                  href="/archive"
                  onClick={closeMenu}
                  className="transition-colors hover:text-[#071a19]"
                >
                  Archive
                </Link>
                <span className="text-black/25">.</span>
                <a
                  href={`mailto:${email}`}
                  className="transition-colors hover:text-[#071a19]"
                >
                  Capabilities Deck
                </a>
                <a
                  href={`mailto:${email}`}
                  className="transition-colors hover:text-[#071a19]"
                >
                  Showreel
                </a>
              </nav>
            </section>

            <nav aria-label="Expanded menu routes" className="border-t border-black/25 pb-28">
              <Link
                href="/#selected"
                onClick={closeMenu}
                className="menu-row group grid min-h-32 grid-cols-[5rem_1fr_4rem] items-center border-b border-black/25 px-4 transition-colors duration-300 hover:bg-[#bfffa3] md:min-h-40 md:grid-cols-[18vw_1fr_18vw] md:px-8 lg:min-h-44"
              >
                <span className="text-7xl font-medium leading-none text-black/35 transition-colors group-hover:text-[#275f31] md:text-8xl lg:text-9xl">
                  01
                </span>
                <span className="text-5xl font-medium leading-none md:text-7xl lg:text-8xl">
                  Index
                </span>
                <span className="justify-self-end text-3xl md:text-5xl">
                  -&gt;
                </span>
              </Link>
              <Link
                href="/archive"
                onClick={closeMenu}
                className="menu-row group grid min-h-32 grid-cols-[5rem_1fr_4rem] items-center border-b border-black/25 px-4 transition-colors duration-300 hover:bg-[#bfffa3] md:min-h-40 md:grid-cols-[18vw_1fr_18vw] md:px-8 lg:min-h-44"
              >
                <span className="text-7xl font-medium leading-none text-black/35 transition-colors group-hover:text-[#275f31] md:text-8xl lg:text-9xl">
                  02
                </span>
                <span className="text-5xl font-medium leading-none md:text-7xl lg:text-8xl">
                  Archive
                </span>
                <span className="justify-self-end text-3xl md:text-5xl">
                  -&gt;
                </span>
              </Link>
              <a
                href={`mailto:${email}`}
                onClick={closeMenu}
                className="menu-row group grid min-h-32 grid-cols-[5rem_1fr_4rem] items-center border-b border-black/25 px-4 transition-colors duration-300 hover:bg-[#bfffa3] md:min-h-40 md:grid-cols-[18vw_1fr_18vw] md:px-8 lg:min-h-44"
              >
                <span className="text-7xl font-medium leading-none text-black/35 transition-colors group-hover:text-[#275f31] md:text-8xl lg:text-9xl">
                  03
                </span>
                <span className="text-5xl font-medium leading-none md:text-7xl lg:text-8xl">
                  Info
                </span>
                <span className="justify-self-end text-3xl md:text-5xl">
                  -&gt;
                </span>
              </a>
            </nav>
          </div>
        </div>
      ) : null}

      <div className="fixed bottom-5 left-1/2 z-[90] -translate-x-1/2 text-sm">
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
          className={`min-w-32 rounded-[6px] border px-8 py-4 font-medium shadow-[0_0_0_4px_rgba(238,233,228,0.12)] transition-colors ${
            open
              ? "border-[#071a19] bg-[#071a19] text-[#f3f0eb] hover:bg-[#bfffa3] hover:text-[#071a19]"
              : "border-[color:var(--border)] bg-[var(--background)] text-[var(--foreground)] hover:bg-[#bfffa3] hover:text-[#071a19]"
          }`}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
    </>
  );
}
