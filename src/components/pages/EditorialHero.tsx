"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BackLabel } from "@/components/back";
import { ImageReveal } from "@/components/pages/ImageReveal";
import { DURATION, EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface EditorialHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image?: string;
  /** Split = text then wide photo; cinematic = full-bleed dark photo hero */
  variant?: "plain" | "split" | "cinematic";
  /** light = white page; dark = black/transparent chrome over media */
  tone?: "light" | "dark";
  /** roomy keeps airier About / Leadership heroes */
  density?: "close" | "roomy";
  className?: string;
}

export function EditorialHero({
  eyebrow,
  title,
  subtitle,
  image,
  variant = "plain",
  tone = "light",
  density = "close",
  className,
}: EditorialHeroProps) {
  const dark = tone === "dark";
  const labelTone = dark ? "light" : "dark";
  const roomy = density === "roomy";
  const shellPad = roomy
    ? "pb-16 pt-28 md:pb-24 md:pt-36 lg:pb-28 lg:pt-40"
    : "pb-10 pt-24 md:pb-14 md:pt-28 lg:pb-16 lg:pt-32";

  if (variant === "cinematic" && image) {
    return (
      <section
        className={cn(
          "relative flex flex-col justify-end overflow-hidden",
          roomy ? "min-h-[78svh]" : "min-h-[68svh]",
          className,
        )}
      >
        <ImageReveal className="absolute inset-0" immediate>
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </ImageReveal>
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 38%, rgba(0,0,0,0.82) 100%)",
          }}
        />
        <div className={cn("page-shell relative z-10", shellPad)}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.base, ease: EASE_OUT }}
          >
            <BackLabel tone={labelTone}>{eyebrow}</BackLabel>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.slow, delay: 0.12, ease: EASE_OUT }}
            className="font-display mt-6 max-w-4xl text-[clamp(2.75rem,5.5vw,4.75rem)] font-light leading-[1.02] text-white md:mt-8"
          >
            {title}
          </motion.h1>
          {subtitle ? (
            <motion.p
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: DURATION.base,
                delay: 0.28,
                ease: EASE_OUT,
              }}
              className="body-editorial mt-6 max-w-xl text-white/60 md:mt-8"
            >
              {subtitle}
            </motion.p>
          ) : null}
        </div>
      </section>
    );
  }

  if (variant === "split" && image) {
    return (
      <section
        className={cn(
          dark ? "bg-black text-white" : "bg-white text-black",
          className,
        )}
      >
        <div className={cn("page-shell", shellPad)}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.base, ease: EASE_OUT }}
          >
            <BackLabel tone={labelTone}>{eyebrow}</BackLabel>
          </motion.div>
          <div className="mt-7 grid items-end gap-8 lg:mt-10 lg:grid-cols-12 lg:gap-10">
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: DURATION.slow,
                delay: 0.08,
                ease: EASE_OUT,
              }}
              className="font-display text-[clamp(2.5rem,4.5vw,4.1rem)] leading-[1.06] lg:col-span-7"
            >
              {title}
            </motion.h1>
            {subtitle ? (
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: DURATION.base,
                  delay: 0.18,
                  ease: EASE_OUT,
                }}
                className={cn(
                  "body-editorial max-w-lg lg:col-span-5 lg:justify-self-end lg:pb-2",
                  dark ? "text-white/60" : "text-black/55",
                )}
              >
                {subtitle}
              </motion.p>
            ) : null}
          </div>
        </div>
        <ImageReveal className="aspect-[21/9] w-full md:aspect-[22/9]" immediate>
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </ImageReveal>
      </section>
    );
  }

  return (
    <section
      className={cn(
        dark ? "bg-black text-white" : "bg-white text-black",
        className,
      )}
    >
      <div className={cn("page-shell", shellPad)}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.base, ease: EASE_OUT }}
        >
          <BackLabel tone={labelTone}>{eyebrow}</BackLabel>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.slow, delay: 0.1, ease: EASE_OUT }}
          className="font-display mt-6 max-w-4xl text-[clamp(2.65rem,5vw,4.35rem)] font-light leading-[1.04] md:mt-8"
        >
          {title}
        </motion.h1>
        {subtitle ? (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: DURATION.base,
              delay: 0.22,
              ease: EASE_OUT,
            }}
            className={cn(
              "body-editorial mt-6 max-w-2xl md:mt-8",
              dark ? "text-white/60" : "text-black/55",
            )}
          >
            {subtitle}
          </motion.p>
        ) : null}
      </div>
    </section>
  );
}
