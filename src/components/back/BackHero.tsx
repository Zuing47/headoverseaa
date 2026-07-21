"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BackLabel } from "./primitives";
import { ImageReveal } from "@/components/pages/ImageReveal";
import { DURATION, EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface BackHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Wide media under the typographic band */
  image?: string;
  imageAlt?: string;
  className?: string;
}

/**
 * BACK hero — black typographic band (title left / subtitle right),
 * optional 21:9 reveal media beneath (PWS organization).
 */
export function BackHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt = "",
  className,
}: BackHeroProps) {
  return (
    <header className={cn("bg-black text-white", className)}>
      <div className="page-shell pb-10 pt-24 md:pb-14 md:pt-28 lg:pb-16 lg:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.base, ease: EASE_OUT }}
        >
          <BackLabel tone="light">{eyebrow}</BackLabel>
        </motion.div>

        <div className="mt-7 grid items-end gap-8 lg:mt-10 lg:grid-cols-12 lg:gap-10">
          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.slow, delay: 0.08, ease: EASE_OUT }}
            className="font-display whitespace-pre-line text-[clamp(2.65rem,5.2vw,4.5rem)] font-light leading-[1.02] lg:col-span-7"
          >
            {title}
          </motion.h1>
          {subtitle ? (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: DURATION.base,
                delay: 0.18,
                ease: EASE_OUT,
              }}
              className="body-editorial max-w-lg text-white/60 lg:col-span-5 lg:justify-self-end lg:pb-2"
            >
              {subtitle}
            </motion.p>
          ) : null}
        </div>
      </div>

      {image ? (
        <ImageReveal
          className="aspect-[5/4] w-full min-h-[200px] bg-[#0a0a0a] sm:aspect-[16/10] sm:min-h-0 md:aspect-[21/9] lg:aspect-[22/9]"
          immediate
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            quality={92}
          />
        </ImageReveal>
      ) : null}
    </header>
  );
}
