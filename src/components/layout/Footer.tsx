import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import type { Locale, SiteContent } from "@/types/content";

interface FooterProps {
  content: SiteContent;
  locale: Locale;
}

/** Lean footer — contact via /contato; insights signup sits above on home. */
export function Footer({ content, locale }: FooterProps) {
  const en = locale === "en";
  const homeHref = en ? "/en" : "/";
  const { info } = content.contact;

  return (
    <footer className="border-t border-white/[0.08] bg-black">
      <div className="page-shell section-space-lg">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link href={homeHref} aria-label="Head Oversea">
              <Logo variant="full" className="w-36 text-white" />
            </Link>
            <p className="body-editorial mt-8 max-w-[28ch] text-white/40">
              {content.footer.tagline}
            </p>
            <div
              className="mt-10 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-white/30"
              aria-hidden
            >
              <span>Brasil</span>
              <span className="h-px w-10 bg-white/20" />
              <span>USA</span>
            </div>
          </div>

          {content.footer.columns.map((column) => (
            <div key={column.title} className="lg:col-span-2">
              <p className="label-caps text-white/30">{column.title}</p>
              <ul className="mt-6 space-y-3.5">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-white/55 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 border-t border-white/[0.08] pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11px] tracking-wide text-white/30">
              {content.footer.legal}
            </p>
            <div className="flex flex-wrap gap-6 text-[11px] tracking-wide text-white/30">
              <a
                href={`mailto:${info.email}`}
                className="transition-colors hover:text-white"
              >
                {info.email}
              </a>
              <a
                href="https://www.instagram.com/headoversea"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/company/headoversea"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
