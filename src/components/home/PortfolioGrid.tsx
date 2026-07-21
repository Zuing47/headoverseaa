"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CaseStudy, Locale, SiteContent } from "@/types/content";
import { Reveal } from "./reveal";
import { SectionLabel, TextLink } from "./Editorial";
import { MaskedText } from "@/components/motion/MaskedText";

interface PortfolioGridProps {
  content: SiteContent;
  locale?: Locale;
}

const LOGO_SRC: Record<string, string> = {
  riolaser: "/images/logos-empresas/riolaser-trim.png",
  drakkar: "/images/logos-empresas/drakkar-trim.png",
  roadpro: "/images/logos-empresas/roadpro.png",
  geromel: "/images/logos-empresas/geromel-trim.png",
  once: "/images/logos-empresas/onceatualizada.webp",
  superbloom: "/images/logos-empresas/Superbloom-1.png",
};

const LOGO_OPTICAL: Record<string, number> = {
  once: 0.9,
  roadpro: 1.05,
  geromel: 1.0,
  riolaser: 1.28,
  drakkar: 1.42,
  superbloom: 1.65,
};

const AUTO_SPEED = 42;

export function PortfolioGrid({ content, locale = "pt" }: PortfolioGridProps) {
  const { portfolio } = content.home;
  const OWNERSHIP_ORDER = [
    "riolaser",
    "drakkar",
    "geromel",
    "superbloom",
    "roadpro",
    "once",
  ] as const;
  const items = OWNERSHIP_ORDER.map((id) =>
    content.cases.items.find((item) => item.id === id && item.logo && item.format !== "brand"),
  ).filter(Boolean) as CaseStudy[];
  const trackRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const halfRef = useRef(0);
  const pausedRef = useRef(false);
  const pendingRef = useRef(false);
  const draggingRef = useRef(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const movedRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const [grabbing, setGrabbing] = useState(false);

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    halfRef.current = el.scrollWidth / 2;
  }, []);

  const applyTransform = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
  }, []);

  const normalize = useCallback(() => {
    const half = halfRef.current;
    if (half <= 0) return;
    while (offsetRef.current >= half) offsetRef.current -= half;
    while (offsetRef.current < 0) offsetRef.current += half;
  }, []);

  useEffect(() => {
    pausedRef.current = paused || draggingRef.current;
  }, [paused]);

  useEffect(() => {
    measure();
    const onResize = () => {
      measure();
      normalize();
      applyTransform();
    };
    window.addEventListener("resize", onResize);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let last = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      if (
        !pausedRef.current &&
        !draggingRef.current &&
        !reduced.matches &&
        halfRef.current > 0
      ) {
        offsetRef.current += (AUTO_SPEED * dt) / 1000;
        normalize();
        applyTransform();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [applyTransform, measure, normalize, items.length]);

  /** Start drag only after a real swipe — never capture on tap, so logo links work. */
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    pendingRef.current = true;
    draggingRef.current = false;
    movedRef.current = false;
    dragStartX.current = e.clientX;
    dragStartOffset.current = offsetRef.current;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pendingRef.current) return;
    const dx = e.clientX - dragStartX.current;
    if (!draggingRef.current && Math.abs(dx) > 8) {
      draggingRef.current = true;
      movedRef.current = true;
      setGrabbing(true);
      setPaused(true);
      try {
        shellRef.current?.setPointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    }
    if (!draggingRef.current) return;
    offsetRef.current = dragStartOffset.current - dx;
    normalize();
    applyTransform();
  };

  const endDrag = (e: React.PointerEvent) => {
    pendingRef.current = false;
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setGrabbing(false);
    setPaused(false);
    try {
      shellRef.current?.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (movedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
    movedRef.current = false;
  };

  if (!items.length) return null;

  const loop = [...items, ...items];

  return (
    <section className="overflow-hidden bg-white text-black">
      <div className="page-shell pt-[clamp(2.5rem,5vw,3.5rem)]">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal variant="rise">
            <SectionLabel className="justify-center">
              {portfolio.eyebrow}
            </SectionLabel>
          </Reveal>
          <MaskedText
            delay={0.08}
            className="font-display mt-5 text-[clamp(2.4rem,4vw,3.5rem)] leading-[1.08] text-black"
          >
            {portfolio.title}
          </MaskedText>
          <Reveal delay={0.22} variant="fadeUp" className="mt-5 flex justify-center">
            <TextLink href={portfolio.viewAllHref}>
              {portfolio.viewAll}
            </TextLink>
          </Reveal>
        </div>
      </div>

      <div
        ref={shellRef}
        className={`relative mt-8 touch-pan-y border-y border-black/[0.1] py-8 select-none md:mt-10 md:py-10 ${
          grabbing ? "cursor-grabbing" : "cursor-grab"
        }`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => {
          if (!draggingRef.current) setPaused(false);
        }}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            setPaused(false);
          }
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
      >
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white via-white/80 to-transparent md:w-36"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white via-white/80 to-transparent md:w-36"
          aria-hidden
        />

        <div
          ref={trackRef}
          className="flex w-max items-center will-change-transform"
        >
          {loop.map((item, i) => (
            <LogoOnly key={`${item.id}-${i}`} item={item} locale={locale} />
          ))}
        </div>
      </div>

      <div className="h-[clamp(2rem,4vw,2.75rem)]" aria-hidden />
    </section>
  );
}

function LogoOnly({ item, locale }: { item: CaseStudy; locale: Locale }) {
  const href = item.detail
    ? locale === "en"
      ? `/en/cases/${item.id}`
      : `/cases/${item.id}`
    : item.visitUrl && item.visitUrl !== "#"
      ? item.visitUrl
      : locale === "en"
        ? "/en/cases"
        : "/cases";
  const external = Boolean(item.visitUrl && !item.detail && item.visitUrl !== "#");
  const src = LOGO_SRC[item.id] ?? item.logo!;
  const optical = LOGO_OPTICAL[item.id] ?? 1;

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      draggable={false}
      className="group relative z-20 flex h-28 w-[240px] shrink-0 items-center justify-center px-6 md:h-32 md:w-[280px] md:px-8"
      aria-label={item.company}
    >
      <span className="inline-flex origin-center" style={{ scale: optical }}>
        <span className="inline-flex transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1">
          <Image
            src={src}
            alt={item.company}
            width={280}
            height={72}
            draggable={false}
            className="pointer-events-none h-12 w-auto max-w-[11rem] object-contain object-center opacity-70 transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 md:h-14 md:max-w-[13rem]"
          />
        </span>
      </span>
    </Link>
  );
}
