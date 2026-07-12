"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { projects } from "@/data/projects";

function getWibTime() {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "Asia/Jakarta"
  }).format(new Date());
}

export function Header() {
  const pathname = usePathname();
  const [time, setTime] = useState("--:--:-- WIB");
  const activeRoute = pathname.startsWith("/archive") ? "archive" : "selected";

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setTime(`${getWibTime()} WIB`);
    }, 0);
    const interval = window.setInterval(() => {
      setTime(`${getWibTime()} WIB`);
    }, 1000);

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[var(--background)] px-4 py-6 text-[var(--foreground)] md:px-8">
      <div className="grid gap-y-4 text-sm leading-none md:grid-cols-12 md:items-start">
        <Link
          href="/"
          className="grid max-w-2xl grid-cols-[auto_auto_minmax(0,1fr)] gap-8 font-medium md:col-span-5 md:gap-20"
          aria-label="Go to portfolio index"
        >
          <span>M.</span>
          <span>B.</span>
          <span>Mohammad Bayu Rizki</span>
        </Link>

        <p className="text-[12px] uppercase text-[color:var(--muted)] md:col-span-2 md:text-center">
          Available / <span>{time}</span>
        </p>

        <nav
          aria-label="Primary navigation"
          className="flex flex-wrap gap-x-6 gap-y-2 text-sm md:col-span-5 md:justify-end md:pr-16"
        >
          <Link
            href="/#selected"
            className={`inline-flex items-baseline gap-1 ${
              activeRoute === "selected" ? "" : "text-[color:var(--muted)]"
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                activeRoute === "selected"
                  ? "bg-[var(--accent)]"
                  : "border border-[color:var(--border)]"
              }`}
            />
            Selected{" "}
            <sup className="text-[10px] text-[color:var(--muted)]">
              ({projects.length.toString().padStart(2, "0")})
            </sup>
          </Link>
          <Link
            href="/archive"
            className={`inline-flex items-baseline gap-1 ${
              activeRoute === "archive" ? "" : "text-[color:var(--muted)]"
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                activeRoute === "archive"
                  ? "bg-[var(--accent)]"
                  : "border border-[color:var(--border)]"
              }`}
            />
            Archive{" "}
            <sup className="text-[10px]">
              ({projects.length.toString().padStart(2, "0")})
            </sup>
          </Link>
          <Link href="mailto:mohammadbayurizkii@gmail.com" className="inline-flex items-baseline gap-1 text-[color:var(--muted)]">
            <span className="h-2.5 w-2.5 rounded-full border border-[color:var(--border)]" />
            Contact <sup className="text-[10px]">(01)</sup>
          </Link>
        </nav>
      </div>
    </header>
  );
}
