"use client";

import Link from "next/link";
import { useState } from "react";

export function FloatingMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 left-1/2 z-[70] -translate-x-1/2 text-sm">
      {open ? (
        <nav
          aria-label="Floating menu"
          className="mb-3 grid min-w-56 gap-1 border border-[color:var(--border)] bg-[rgba(7,26,25,0.94)] p-2 backdrop-blur"
        >
          <Link className="px-4 py-3 hover:bg-white/10" href="#selected">
            01 Index
          </Link>
          <Link className="px-4 py-3 hover:bg-white/10" href="#archive">
            02 Archive
          </Link>
          <Link className="px-4 py-3 hover:bg-white/10" href="mailto:mohammad.bayu@example.com">
            03 Info
          </Link>
        </nav>
      ) : null}
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="min-w-32 border border-[color:var(--border)] bg-[var(--background)] px-8 py-4 font-medium text-[var(--foreground)] shadow-[0_0_0_4px_rgba(238,233,228,0.12)] transition-colors hover:bg-[var(--foreground)] hover:text-[var(--background)]"
      >
        Menu
      </button>
    </div>
  );
}
