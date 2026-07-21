"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { Locale, TeamMember } from "@/types/content";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface TeamCarouselProps {
  team: TeamMember[];
  locale?: Locale;
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.4 8.65 22 10.7 22 14.1V21h-4v-6.1c0-1.46-.03-3.33-2.03-3.33-2.03 0-2.34 1.58-2.34 3.22V21H9z" />
    </svg>
  );
}

export function TeamCarousel({ team, locale = "pt" }: TeamCarouselProps) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const total = team.length;
  const member = team[index];
  const hasLink = Boolean(member?.linkedin && member.linkedin !== "#");
  const en = locale === "en";

  const go = useCallback(
    (delta: number) => {
      setDir(delta);
      setIndex((i) => (i + delta + total) % total);
    },
    [total],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  if (!member) return null;

  return (
    <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="group relative mx-auto aspect-[4/5] w-full max-w-[min(100%,380px)] overflow-hidden bg-[#e8e6e1] lg:col-span-5 lg:max-w-none">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={member.name}
            initial={{ opacity: 0, x: 28 * dir }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 * dir }}
            transition={{ duration: 0.48, ease: EASE_OUT }}
            className="absolute inset-0"
          >
            {member.photo ? (
              <Image
                src={member.photo}
                alt={member.name}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-top transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
              />
            ) : (
              <div className="absolute inset-0 bg-[#ddd]" />
            )}
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, transparent 40%, rgba(0,0,0,0.35) 100%)",
              }}
            />
          </motion.div>
        </AnimatePresence>

        <p className="absolute left-5 top-5 z-10 font-mono text-[11px] tracking-[0.2em] text-white/80 md:left-6 md:top-6">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
      </div>

      <div className="relative min-h-[280px] text-black lg:col-span-6 lg:col-start-7">
        <AnimatePresence mode="wait" initial={false}>
          <div key={member.name}>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.42, ease: EASE_OUT }}
              className="label-caps text-black/40"
            >
              {member.role}
            </motion.p>
            <motion.h3
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.42, delay: 0.05, ease: EASE_OUT }}
              className="font-display mt-4 text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] text-black"
            >
              {member.name}
            </motion.h3>
            {member.bio ? (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.42, delay: 0.1, ease: EASE_OUT }}
                className="body-editorial mt-6 max-w-md text-black/55"
              >
                {member.bio}
              </motion.p>
            ) : null}

            {hasLink ? (
              <motion.a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.42, delay: 0.14, ease: EASE_OUT }}
                className="group/link mt-10 inline-flex items-center gap-2.5 text-[12px] tracking-[0.04em] text-black/50 transition-colors hover:text-black"
              >
                <LinkedInIcon className="h-4 w-4 opacity-70" />
                <span className="underline decoration-black/20 underline-offset-[5px] group-hover/link:decoration-black/50">
                  LinkedIn
                </span>
                <span aria-hidden>→</span>
              </motion.a>
            ) : null}
          </div>
        </AnimatePresence>

        <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-black/[0.1] pt-8">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={en ? "Previous member" : "Membro anterior"}
            className="flex h-10 w-10 items-center justify-center border border-black/20 text-black/60 transition-colors hover:border-black hover:text-black"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={en ? "Next member" : "Próximo membro"}
            className="flex h-10 w-10 items-center justify-center border border-black/20 text-black/60 transition-colors hover:border-black hover:text-black"
          >
            →
          </button>

          <div className="ml-1 flex flex-wrap items-center gap-1.5">
            {team.map((m, i) => (
              <button
                key={m.name}
                type="button"
                onClick={() => {
                  setDir(i > index ? 1 : -1);
                  setIndex(i);
                }}
                aria-label={m.name}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === index
                    ? "w-6 bg-black"
                    : "w-1.5 bg-black/20 hover:bg-black/40",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
