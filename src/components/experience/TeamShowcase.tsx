"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { TeamMember } from "@/types/content";

const EASE = [0.22, 1, 0.36, 1] as const;
const EXIT = { duration: 0.35, ease: EASE };

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.4 8.65 22 10.7 22 14.1V21h-4v-6.1c0-1.46-.03-3.33-2.03-3.33-2.03 0-2.34 1.58-2.34 3.22V21H9z" />
    </svg>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={direction === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
    </svg>
  );
}

export function TeamShowcase({ team }: { team: TeamMember[] }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const total = team.length;
  const member = team[index];
  const hasLink = member.linkedin && member.linkedin !== "#";

  const go = (delta: number) => {
    setDir(delta);
    setIndex((i) => (i + delta + total) % total);
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,42%)_1fr] lg:gap-16">
        {/* Portrait — desaturated until hover */}
        <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-[28px] border border-border-strong">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 * dir, scale: 1.04 }}
              animate={{ opacity: 1, x: 0, scale: 1, transition: { duration: 0.75, ease: EASE } }}
              exit={{ opacity: 0, x: -20 * dir, scale: 0.98, transition: EXIT }}
              className="absolute inset-0"
            >
              {member.photo ? (
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] grayscale brightness-[0.5] contrast-[1.05] saturate-0 group-hover:grayscale-0 group-hover:brightness-100 group-hover:saturate-100 group-hover:scale-[1.03]"
                />
              ) : (
                <div
                  className="absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] grayscale brightness-[0.5] saturate-0 group-hover:grayscale-0 group-hover:brightness-100 group-hover:saturate-100"
                  style={{
                    background:
                      "radial-gradient(120% 100% at 25% 10%, #f2701d 0%, #a94a10 45%, #101a33 100%)",
                  }}
                />
              )}
              <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-700 group-hover:opacity-70"
                aria-hidden
                style={{ background: "linear-gradient(180deg, rgba(6,8,15,0.15) 0%, transparent 45%, rgba(6,8,15,0.9) 100%)" }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Progress index */}
          <div className="absolute left-6 top-6 z-10 font-mono text-xs tracking-widest text-white/70">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
        </div>

        {/* Copy + controls */}
        <div className="relative min-h-[280px]">
          <AnimatePresence mode="wait" initial={false}>
            <div key={index}>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -7, transition: EXIT }}
                transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
                className="text-[11px] font-medium uppercase tracking-[0.22em] text-champagne"
              >
                {member.role}
              </motion.p>
              <motion.h3
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -9, transition: EXIT }}
                transition={{ duration: 0.7, delay: 0.13, ease: EASE }}
                className="text-metallic font-display mt-3 font-normal leading-[1.05] tracking-tight [font-size:clamp(2rem,4vw,3.25rem)]"
              >
                {member.name}
              </motion.h3>
              {member.bio && (
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -7, transition: EXIT }}
                  transition={{ duration: 0.7, delay: 0.22, ease: EASE }}
                  className="mt-6 max-w-md text-base leading-relaxed text-stone"
                >
                  {member.bio}
                </motion.p>
              )}

              {/* LinkedIn — only when a real profile URL exists */}
              {hasLink ? (
                <motion.a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10, transition: EXIT }}
                  transition={{ duration: 0.8, delay: 0.34, ease: EASE }}
                  className="group/link mt-9 inline-flex items-center gap-3"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0A66C2] text-white transition-transform duration-500 group-hover/link:scale-110">
                    <LinkedInIcon className="h-[18px] w-[18px]" />
                  </span>
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-ivory transition-all duration-500 group-hover/link:translate-x-1 group-hover/link:text-champagne">
                    Visitar perfil →
                  </span>
                </motion.a>
              ) : null}
            </div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-12 flex items-center gap-4 border-t border-border pt-8">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Membro anterior"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border-strong text-ivory transition-colors hover:border-champagne hover:text-champagne"
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Próximo membro"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border-strong text-ivory transition-colors hover:border-champagne hover:text-champagne"
            >
              <ArrowIcon direction="right" />
            </button>

            <div className="ml-2 flex items-center gap-2">
              {team.map((m, i) => (
                <button
                  key={m.name}
                  type="button"
                  onClick={() => {
                    setDir(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  aria-label={`Ver ${m.name}`}
                  className="h-1.5 rounded-full bg-border-strong transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ width: i === index ? 24 : 8, background: i === index ? "var(--champagne)" : undefined }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
