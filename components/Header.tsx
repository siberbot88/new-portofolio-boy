"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
  const [time, setTime] = useState("--:--:-- WIB");

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
          className="grid max-w-lg grid-cols-3 gap-6 font-medium md:col-span-5"
          aria-label="Go to portfolio index"
        >
          <span>M.</span>
          <span>B.</span>
          <span>Mohammad Bayu</span>
        </Link>

        <p className="text-[12px] uppercase text-[color:var(--muted)] md:col-span-2 md:text-center">
          Available / <span>{time}</span>
        </p>

        <nav
          aria-label="Primary navigation"
          className="flex flex-wrap gap-x-6 gap-y-2 text-sm md:col-span-5 md:justify-end"
        >
          <Link href="/#selected" className="inline-flex items-baseline gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
            Selected <sup className="text-[10px] text-[color:var(--muted)]">(07)</sup>
          </Link>
          <Link href="/#archive" className="inline-flex items-baseline gap-1 text-[color:var(--muted)]">
            <span className="h-2.5 w-2.5 rounded-full border border-[color:var(--border)]" />
            Archive <sup className="text-[10px]">(07)</sup>
          </Link>
          <Link href="mailto:mohammad.bayu@example.com" className="inline-flex items-baseline gap-1 text-[color:var(--muted)]">
            <span className="h-2.5 w-2.5 rounded-full border border-[color:var(--border)]" />
            Contact <sup className="text-[10px]">(01)</sup>
          </Link>
        </nav>
      </div>
    </header>
  );
}
