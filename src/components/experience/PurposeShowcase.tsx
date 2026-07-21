"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

interface PurposeShowcaseProps {
  eyebrow: string;
  title: string;
  text: string;
  image?: string;
  statValue: string;
  statLabel: string;
  ctaLabel: string;
  ctaHref: string;
}

/** Editorial purpose block — image with a gently floating glass stat card. */
export function PurposeShowcase({
  eyebrow,
  title,
  text,
  image = "/images/about.jpg",
  statValue,
  statLabel,
  ctaLabel,
  ctaHref,
}: PurposeShowcaseProps) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
      {/* Image + floating card */}
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE }}
          className="relative aspect-[5/4] w-full overflow-hidden rounded-[28px] border border-border-strong"
        >
          <Image src={image} alt="" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover object-center" />
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden
            style={{ background: "linear-gradient(160deg, rgba(6,8,15,0.15) 0%, transparent 45%, rgba(6,8,15,0.55) 100%)" }}
          />
        </motion.div>

        {/* Floating glass stat card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
          className="absolute -bottom-10 left-4 w-[74%] max-w-xs sm:left-8 sm:w-[62%]"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="overflow-hidden rounded-2xl border border-white/10 bg-charcoal/80 backdrop-blur-xl"
          >
            <div className="p-6">
              <p className="font-display text-sm text-ivory/70">Head Oversea</p>
              <p className="text-metallic font-display mt-2 font-normal leading-[1] tracking-tight [font-size:clamp(2.4rem,5vw,3.4rem)]">
                {statValue}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-stone">{statLabel}</p>
            </div>
            <Link
              href={ctaHref}
              className="group flex items-center justify-between bg-champagne px-6 py-4 text-sm font-semibold text-obsidian transition-colors hover:bg-ivory"
            >
              {ctaLabel}
              <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden>→</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Copy */}
      <div>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-xs font-medium uppercase tracking-[0.28em] text-champagne"
        >
          {eyebrow}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="text-metallic font-display mt-5 max-w-md font-normal leading-[1.05] tracking-tight [font-size:clamp(2rem,4vw,3.25rem)]"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.22, ease: EASE }}
          className="mt-7 max-w-md text-lg leading-relaxed text-stone"
        >
          {text}
        </motion.p>
      </div>
    </div>
  );
}
