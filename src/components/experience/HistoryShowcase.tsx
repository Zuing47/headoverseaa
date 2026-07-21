"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

interface HistoryShowcaseProps {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  frontImage: string;
  backImage: string;
  cardTitle: string;
  checklist: string[];
  ctaLabel: string;
  ctaHref: string;
}

function Check() {
  return (
    <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/** Layered photos with an overlapping orange card — the old-site "História" layout. */
export function HistoryShowcase({
  eyebrow,
  title,
  paragraphs,
  frontImage,
  backImage,
  cardTitle,
  checklist,
  ctaLabel,
  ctaHref,
}: HistoryShowcaseProps) {
  return (
    <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
      {/* Layered visual */}
      <div className="relative">
        {/* Back photo — offset, peeking behind */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="absolute -right-4 -top-8 hidden aspect-[4/5] w-2/3 overflow-hidden rounded-2xl border border-white/10 sm:block"
        >
          <Image src={backImage} alt="" fill sizes="30vw" className="object-cover object-center" />
        </motion.div>

        {/* Front photo */}
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.1, ease: EASE }}
          className="relative z-10 aspect-[4/5] w-[86%] overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
        >
          <Image src={frontImage} alt="" fill sizes="(max-width:1024px) 90vw, 42vw" className="object-cover object-center" />
        </motion.div>

        {/* Overlapping orange card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
          className="absolute -bottom-10 right-0 z-20 w-[74%] max-w-sm overflow-hidden rounded-2xl bg-champagne text-obsidian shadow-2xl sm:-right-6"
        >
          <div className="relative p-7">
            {/* faint concentric wave motif, like the reference */}
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 opacity-20"
              aria-hidden
              style={{ background: "radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 60%)" }}
            />
            <h3 className="font-display text-2xl leading-tight text-obsidian">{cardTitle}</h3>
            <ul className="mt-5 space-y-3">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-snug text-obsidian/90">
                  <Check />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <Link
            href={ctaHref}
            className="group flex items-center justify-between bg-ink px-7 py-4 text-sm font-semibold text-ivory transition-colors hover:bg-obsidian"
          >
            {ctaLabel}
            <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden>→</span>
          </Link>
        </motion.div>
      </div>

      {/* Copy */}
      <div className="lg:pl-4">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-xs font-semibold uppercase tracking-[0.24em] text-champagne"
        >
          {eyebrow}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="text-metallic font-display mt-5 leading-[1.05] tracking-tight [font-size:clamp(2rem,4vw,3.25rem)]"
        >
          {title}
        </motion.h2>
        <div className="mt-8">
          {paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease: EASE }}
              className="mb-6 text-lg leading-relaxed text-stone last:mb-0"
            >
              {p}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  );
}
