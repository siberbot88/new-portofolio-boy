import Link from "next/link";

const email = "mohammadbayurizkii@gmail.com";

export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="site-footer relative overflow-hidden border-t border-[color:var(--border)] bg-[var(--background)] px-4 pb-28 pt-14 text-[var(--foreground)] md:px-8 md:pb-32 md:pt-20"
    >
      <div className="grid min-h-[64svh] min-w-0 content-between gap-16">
        <div className="grid min-w-0 gap-10 md:grid-cols-12">
          <p
            data-footer-link
            className="min-w-0 max-w-sm text-base leading-6 text-[color:var(--muted)] md:col-span-4"
          >
            Whether you are exploring a project, thinking about a partnership,
            or just stopping by, I am always happy to connect.
          </p>

          <nav
            aria-label="Footer links"
            className="flex min-w-0 max-w-full flex-wrap items-start gap-x-8 gap-y-3 text-base md:col-span-7 md:col-start-6 md:justify-end"
          >
            <a
              data-footer-link
              href="https://github.com/siberbot88"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-[#bfffa3]"
            >
              GitHub
            </a>
            <Link
              data-footer-link
              href="/archive"
              className="transition-colors hover:text-[#bfffa3]"
            >
              Archive
            </Link>
            <span data-footer-link className="text-[color:var(--muted)]">
              .
            </span>
            <a
              data-footer-link
              href={`mailto:${email}`}
              className="transition-colors hover:text-[#bfffa3]"
            >
              Capabilities Deck
            </a>
            <a
              data-footer-link
              href={`mailto:${email}`}
              className="transition-colors hover:text-[#bfffa3]"
            >
              Showreel
            </a>
            <span data-footer-link className="text-[color:var(--muted)]">
              .
            </span>
            <span data-footer-link className="text-[color:var(--muted)]">
              &copy; 2026
            </span>
          </nav>
        </div>

        <a
          data-footer-email
          href={`mailto:${email}`}
          className="footer-email block min-w-0 max-w-full font-medium tracking-normal transition-colors hover:text-[#bfffa3]"
        >
          {email}
        </a>
      </div>
    </footer>
  );
}
