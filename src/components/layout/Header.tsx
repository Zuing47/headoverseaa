"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { alternateLocalePath } from "@/lib/content";
import type { Locale, SiteContent } from "@/types/content";
import { Logo } from "@/components/ui/Logo";
import { FlagUS, FlagBR } from "@/components/ui/Flags";
import { DURATION, EASE_OUT } from "@/lib/motion";

interface HeaderProps {
  content: SiteContent;
  locale: Locale;
  /** dark = home over video; light = interior white pages */
  surface?: "dark" | "light";
}

type MegaLink = { label: string; href: string };
type MegaColumn = { title: string; links: MegaLink[] };

type NavEntry =
  | { type: "link"; label: string; href: string }
  | {
      type: "mega";
      id: string;
      label: string;
      columns: MegaColumn[];
      featured?: {
        title: string;
        body: string;
        href: string;
        cta: string;
      };
      image?: string;
    };

function buildNav(locale: Locale): NavEntry[] {
  const en = locale === "en";
  const p = (pt: string, enPath: string) => (en ? enPath : pt);

  return [
    {
      type: "mega",
      id: "investments",
      label: en ? "Investments" : "Investimentos",
      columns: [
        {
          title: "Private Equity",
          links: [
            {
              label: en ? "Overview" : "Visão geral",
              href: p("/private-equity", "/en/private-equity"),
            },
            {
              label: en ? "How we create value" : "Como criamos valor",
              href: p("/como-atuamos", "/en/how-we-work"),
            },
          ],
        },
        {
          title: "Real Estate",
          links: [
            {
              label: en ? "Overview" : "Visão geral",
              href: p("/real-estate", "/en/real-estate"),
            },
          ],
        },
      ],
      featured: {
        title: en
          ? "Private Equity & Real Estate."
          : "Private Equity & Real Estate.",
        body: en
          ? "Two products. One investment firm."
          : "Dois produtos. Uma firma de investimento.",
        href: p("/private-equity", "/en/private-equity"),
        cta: en ? "Explore Private Equity" : "Explorar Private Equity",
      },
      image: "/images/us-skyline-presence.jpg",
    },
    {
      type: "link",
      label: en ? "Portfolio" : "Portfólio",
      href: p("/cases", "/en/cases"),
    },
    {
      type: "mega",
      id: "firm",
      label: en ? "About" : "Sobre",
      columns: [
        {
          title: en ? "The Firm" : "A firma",
          links: [
            {
              label: en ? "Why Head Oversea" : "Por que Head Oversea",
              href: p("/por-que-head-oversea", "/en/why-head-oversea"),
            },
            {
              label: en ? "Our Thesis" : "Nossa Tese",
              href: p("/tese", "/en/thesis"),
            },
            {
              label: en ? "About us" : "Sobre nós",
              href: p("/sobre", "/en/about"),
            },
          ],
        },
        {
          title: en ? "Engage" : "Relacionamento",
          links: [
            {
              label: en ? "For Founders" : "Para Fundadores",
              href: p("/fundadores", "/en/founders"),
            },
            {
              label: en ? "For Investors" : "Para Investidores",
              href: p("/investidores", "/en/investors"),
            },
          ],
        },
      ],
      featured: {
        title: en
          ? "Active ownership across Brazil and the U.S."
          : "Ownership ativo no Brasil e nos EUA.",
        body: en
          ? "Long‑term positions in private equity and real estate."
          : "Posições de longo prazo em private equity e real estate.",
        href: p("/por-que-head-oversea", "/en/why-head-oversea"),
        cta: en ? "Why Head Oversea" : "Por que Head Oversea",
      },
      image: "/images/private-equity-team-collaboration.jpg",
    },
    {
      type: "link",
      label: en ? "News" : "Notícias",
      href: p("/insights", "/en/insights"),
    },
    {
      type: "link",
      label: en ? "Materials" : "Materiais",
      href: p("/materiais", "/en/materials"),
    },
  ];
}

export function Header({ locale, surface = "dark" }: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nav = buildNav(locale);
  const homeHref = locale === "en" ? "/" : "/pt";
  const contactHref = locale === "en" ? "/en/contact" : "/contato";
  const altHref = alternateLocalePath(pathname);

  const light = surface === "light" || openMega !== null || menuOpen;
  const solid = scrolled || light;

  useEffect(() => {
    document.documentElement.lang = locale === "en" ? "en" : "pt-BR";
  }, [locale]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    setOpenMega(null);
    setMenuOpen(false);
  }, [pathname]);

  const openPanel = (id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMega(id);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMega(null), 120);
  };

  const activeMega = nav.find(
    (item): item is Extract<NavEntry, { type: "mega" }> =>
      item.type === "mega" && item.id === openMega,
  );

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          light
            ? "border-b border-black/[0.06] bg-white text-black"
            : solid
              ? "bg-black/95 text-white backdrop-blur-sm"
              : "border-b border-transparent bg-transparent text-white",
        )}
        onMouseLeave={scheduleClose}
      >
        <div className="page-shell grid h-[72px] grid-cols-[1fr_auto_1fr] items-center md:h-20">
          <Link
            href={homeHref}
            aria-label="Head Oversea"
            className="relative z-50 justify-self-start"
            onMouseEnter={scheduleClose}
          >
            <div
              className={cn(
                "overflow-hidden transition-[width] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]",
                scrolled ? "w-9 md:w-11" : "w-[7.5rem] md:w-36",
              )}
            >
              <Logo
                variant="full"
                className={cn(
                  "w-[7.5rem] transition-opacity hover:opacity-70 md:w-36",
                  light ? "text-black" : "text-white",
                )}
              />
            </div>
          </Link>

          <nav
            className="hidden items-center gap-1 justify-self-center lg:flex"
            aria-label="Main"
          >
            {nav.map((item) => {
              if (item.type === "link") {
                const active =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onMouseEnter={scheduleClose}
                    className={cn(
                      "relative px-4 py-2 text-[14px] font-medium tracking-[0.02em] transition-colors md:px-5 md:text-[15px]",
                      light
                        ? active
                          ? "text-black"
                          : "text-black/55 hover:text-black"
                        : active
                          ? "text-white"
                          : "text-white/55 hover:text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              }

              const isOpen = openMega === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onMouseEnter={() => openPanel(item.id)}
                  onFocus={() => openPanel(item.id)}
                  className={cn(
                    "relative flex items-center gap-1.5 px-4 py-2 text-[14px] font-medium tracking-[0.02em] transition-colors md:px-5 md:text-[15px]",
                    light
                      ? isOpen
                        ? "text-black"
                        : "text-black/55 hover:text-black"
                      : isOpen
                        ? "text-white"
                        : "text-white/55 hover:text-white",
                  )}
                  aria-expanded={isOpen}
                >
                  {item.label}
                  <span
                    className={cn(
                      "text-[9px] transition-transform duration-300",
                      isOpen && "rotate-180",
                    )}
                    aria-hidden
                  >
                    ▾
                  </span>
                  {isOpen && (
                    <span
                      className={cn(
                        "absolute inset-x-4 -bottom-px h-px md:inset-x-5",
                        light ? "bg-black" : "bg-white",
                      )}
                      aria-hidden
                    />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="hidden items-center justify-self-end gap-1 lg:flex">
            <Link
              href={altHref}
              onMouseEnter={scheduleClose}
              aria-label={
                locale === "pt" ? "Switch to English" : "Mudar para Português"
              }
              className={cn(
                "flex items-center gap-2 px-2.5 text-[13px] font-medium tracking-[0.06em] transition-colors",
                light
                  ? "text-black/45 hover:text-black"
                  : "text-white/45 hover:text-white",
              )}
            >
              {locale === "pt" ? (
                <FlagUS className="h-4 w-4" />
              ) : (
                <FlagBR className="h-4 w-4" />
              )}
              {locale === "pt" ? "EN" : "PT"}
            </Link>
            <Link
              href={contactHref}
              onMouseEnter={scheduleClose}
              className={cn(
                "px-3 text-[14px] font-medium transition-opacity hover:opacity-60 md:text-[15px]",
                light ? "text-black" : "text-white",
              )}
            >
              {locale === "en" ? "Contact" : "Contato"}
            </Link>
          </div>

          <button
            type="button"
            className="relative z-50 col-start-3 justify-self-end flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={
              menuOpen
                ? locale === "en"
                  ? "Close menu"
                  : "Fechar menu"
                : locale === "en"
                  ? "Open menu"
                  : "Abrir menu"
            }
            aria-expanded={menuOpen}
          >
            <span
              className={cn(
                "h-px w-5 transition-all duration-300",
                light ? "bg-black" : "bg-white",
                menuOpen && "translate-y-[6px] rotate-45",
              )}
            />
            <span
              className={cn(
                "h-px w-5 transition-all duration-300",
                light ? "bg-black" : "bg-white",
                menuOpen && "opacity-0",
              )}
            />
            <span
              className={cn(
                "h-px w-5 transition-all duration-300",
                light ? "bg-black" : "bg-white",
                menuOpen && "-translate-y-[6px] -rotate-45",
              )}
            />
          </button>
        </div>

        {/* Desktop mega menu — Blackstone editorial panel */}
        <AnimatePresence>
          {activeMega && (
            <motion.div
              key={activeMega.id}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: EASE_OUT }}
              className="hidden border-t border-black/[0.08] bg-white lg:block"
              onMouseEnter={() => openPanel(activeMega.id)}
            >
              <div className="page-shell grid grid-cols-12 gap-0 py-12">
                <div
                  className={cn(
                    "col-span-12 grid gap-10",
                    activeMega.featured || activeMega.image
                      ? "lg:col-span-5"
                      : "lg:col-span-12",
                    "lg:grid-cols-2",
                  )}
                >
                  {activeMega.columns.map((col) => (
                    <div key={col.title}>
                      <p className="text-[13px] font-semibold text-black">
                        {col.title}
                      </p>
                      <ul className="mt-5 space-y-3">
                        {col.links.map((link) => (
                          <li key={link.href + link.label}>
                            <Link
                              href={link.href}
                              onClick={() => setOpenMega(null)}
                              className="text-[13px] text-black/55 transition-colors hover:text-black"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {activeMega.featured ? (
                  <div className="col-span-12 flex flex-col justify-between border border-black/[0.08] bg-white p-8 lg:col-span-4 lg:ml-6">
                    <div>
                      <p className="font-display text-[1.45rem] leading-snug text-black">
                        {activeMega.featured.title}
                      </p>
                      <p className="mt-4 text-[13px] leading-relaxed text-black/50">
                        {activeMega.featured.body}
                      </p>
                    </div>
                    <Link
                      href={activeMega.featured.href}
                      onClick={() => setOpenMega(null)}
                      className="group mt-10 inline-flex items-center gap-2.5 text-[13px] text-black"
                    >
                      <span className="underline underline-offset-[5px] decoration-black/20 group-hover:decoration-black/50">
                        {activeMega.featured.cta}
                      </span>
                      <span
                        className="text-[12px] transition-transform group-hover:translate-x-0.5"
                        aria-hidden
                      >
                        →
                      </span>
                    </Link>
                  </div>
                ) : null}

                {activeMega.image ? (
                  <div className="relative col-span-12 hidden min-h-[280px] lg:col-span-3 lg:ml-6 lg:block">
                    <Image
                      src={activeMega.image}
                      alt=""
                      fill
                      sizes="280px"
                      className="object-cover"
                    />
                  </div>
                ) : null}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.fast, ease: EASE_OUT }}
            className="fixed inset-0 z-40 overflow-y-auto bg-white px-8 pb-16 pt-28 lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {nav.map((item, i) => (
                <motion.div
                  key={item.type === "link" ? item.href : item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.05 + i * 0.04,
                    duration: DURATION.base,
                    ease: EASE_OUT,
                  }}
                  className="border-b border-black/[0.08] py-5"
                >
                  {item.type === "link" ? (
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="font-display block text-[2rem] text-black"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <div>
                      <p className="font-display text-[2rem] text-black">
                        {item.label}
                      </p>
                      {item.image ? (
                        <div className="relative mt-5 aspect-[16/10] w-full overflow-hidden bg-[#eee]">
                          <Image
                            src={item.image}
                            alt=""
                            fill
                            sizes="100vw"
                            className="object-cover"
                            quality={85}
                          />
                        </div>
                      ) : null}
                      <div className="mt-5 space-y-1 pl-1">
                        {item.columns.flatMap((col) =>
                          col.links.map((link) => (
                            <Link
                              key={link.href + link.label}
                              href={link.href}
                              onClick={() => setMenuOpen(false)}
                              className="block min-h-11 py-3 text-[15px] leading-snug text-black/55"
                            >
                              {link.label}
                            </Link>
                          )),
                        )}
                      </div>
                      {item.featured ? (
                        <Link
                          href={item.featured.href}
                          onClick={() => setMenuOpen(false)}
                          className="mt-4 block border-t border-black/[0.08] pt-4 text-[14px] text-black underline underline-offset-4"
                        >
                          {item.featured.cta}
                        </Link>
                      ) : null}
                    </div>
                  )}
                </motion.div>
              ))}
              <div className="mt-10 flex items-center gap-8">
                <Link
                  href={contactHref}
                  onClick={() => setMenuOpen(false)}
                  className="text-[13px] text-black underline underline-offset-4"
                >
                  {locale === "en" ? "Contact" : "Contato"}
                </Link>
                <Link
                  href={altHref}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-[13px] text-black/40"
                >
                  {locale === "pt" ? (
                    <FlagUS className="h-4 w-4" />
                  ) : (
                    <FlagBR className="h-4 w-4" />
                  )}
                  {locale === "pt" ? "English" : "Português"}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
