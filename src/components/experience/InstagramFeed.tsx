"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import type { Locale } from "@/types/content";

const EASE = [0.22, 1, 0.36, 1] as const;
const PROFILE = "https://www.instagram.com/headoversea";
const HANDLE = "@headoversea";
const IG_GRADIENT = "linear-gradient(45deg, #feda75 0%, #fa7e1e 25%, #d62976 55%, #962fbf 80%, #4f5bd5 100%)";

const POSTS = [
  { url: "https://www.instagram.com/p/DaiGTyMjac2/", image: "/images/instagram/DaiGTyMjac2.jpg" },
  { url: "https://www.instagram.com/p/DZIRThymSDL/", image: "/images/instagram/DZIRThymSDL.jpg" },
  { url: "https://www.instagram.com/p/DTiEAfegWtD/", image: "/images/instagram/DTiEAfegWtD.jpg" },
  { url: "https://www.instagram.com/p/DPwBR71iZlR/", image: "/images/instagram/DPwBR71iZlR.jpg" },
];

const COPY = {
  pt: {
    eyebrow: "@headoversea",
    title: "O trabalho por trás do equity.",
    subtitle: "Bastidores, teses e a construção real das empresas que levamos do Brasil aos Estados Unidos — publicado à medida que acontece.",
    cta: "Seguir @headoversea",
  },
  en: {
    eyebrow: "@headoversea",
    title: "The work behind the equity.",
    subtitle: "Behind the scenes, theses, and the real building of the companies we take from Brazil to the United States — shared as it happens.",
    cta: "Follow @headoversea",
  },
} as const;

function InstaGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="6" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="1.35" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Profile avatar: Head Oversea monogram inside an Instagram-style story ring. */
function ProfileAvatar() {
  return (
    <span className="relative inline-flex shrink-0 rounded-full p-[3px]" style={{ background: IG_GRADIENT }}>
      <span className="rounded-full bg-obsidian p-[3px]">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-charcoal ring-1 ring-white/10">
          <Logo variant="mark" className="w-7 text-ivory" title="" />
        </span>
      </span>
      <span
        className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full text-white ring-2 ring-obsidian"
        style={{ background: IG_GRADIENT }}
      >
        <InstaGlyph className="h-3.5 w-3.5" />
      </span>
    </span>
  );
}

export function InstagramFeed({ locale = "pt" }: { locale?: Locale }) {
  const t = COPY[locale];

  return (
    <section className="relative overflow-hidden bg-obsidian px-6 py-24 md:py-32">
      {/* soft brand glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{ background: "radial-gradient(90% 60% at 50% 0%, rgba(242,112,29,0.10), transparent 60%)" }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Header — profile style */}
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-4">
              <ProfileAvatar />
              <div>
                <a
                  href={PROFILE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-xl font-semibold text-ivory transition-colors hover:text-champagne"
                >
                  {HANDLE}
                </a>
                <p className="mt-0.5 text-xs uppercase tracking-[0.22em] text-champagne">Instagram</p>
              </div>
            </div>
            <h2 className="text-metallic font-display mt-7 leading-[1.03] tracking-tight [font-size:clamp(1.9rem,3.6vw,3rem)]">
              {t.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-stone">{t.subtitle}</p>
          </motion.div>

          <motion.a
            href={PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            className="group relative inline-flex shrink-0 items-center gap-3 overflow-hidden rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[0_10px_30px_rgba(214,41,118,0.35)] transition-transform hover:-translate-y-0.5"
            style={{ background: IG_GRADIENT }}
          >
            <InstaGlyph className="h-5 w-5" />
            {t.cta}
            <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden>→</span>
          </motion.a>
        </div>

        {/* Post photos only */}
        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {POSTS.map((post, i) => (
            <motion.a
              key={post.url}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10"
            >
              <Image
                src={post.image}
                alt=""
                fill
                sizes="(max-width:1024px) 50vw, 25vw"
                className="object-cover object-center transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-obsidian/0 opacity-0 transition-all duration-500 group-hover:bg-obsidian/40 group-hover:opacity-100">
                <span
                  className="flex h-12 w-12 scale-75 items-center justify-center rounded-[15px] text-white transition-transform duration-500 group-hover:scale-100"
                  style={{ background: "linear-gradient(45deg, #feda75, #fa7e1e 30%, #d62976 60%, #962fbf 85%, #4f5bd5)" }}
                >
                  <InstaGlyph className="h-6 w-6" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
