"use client";

import Image from "next/image";
import { BackBand, BackLabel, MeridianLink } from "./primitives";
import { Reveal } from "@/components/home/reveal";
import { ImageReveal } from "@/components/pages/ImageReveal";
import { MaskedText } from "@/components/motion/MaskedText";

interface BackApproachProps {
  eyebrow?: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  image: string;
  imageAlt: string;
  quote: string;
  attribution?: string;
}

/** BACK approach — media + copy, then signature quote (HO meridian). */
export function BackApproach({
  eyebrow,
  title,
  body,
  href,
  cta,
  image,
  imageAlt,
  quote,
  attribution = "Head Oversea · Active Ownership",
}: BackApproachProps) {
  return (
    <BackBand tone="black">
      {eyebrow ? (
        <Reveal variant="rise">
          <BackLabel tone="light">{eyebrow}</BackLabel>
        </Reveal>
      ) : null}
      <Reveal delay={0.08} variant="rise">
        <h2 className="font-display mt-6 max-w-[22ch] text-[clamp(2rem,3.6vw,3rem)] leading-[1.08] text-white">
          {title}
        </h2>
      </Reveal>

      <div className="mt-10 grid items-center gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-12">
        <Reveal delay={0.1} variant="fadeUp" className="lg:col-span-7">
          <ImageReveal className="relative aspect-[4/3] overflow-hidden bg-[#111] sm:aspect-[16/10]">
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover object-center"
              quality={90}
            />
          </ImageReveal>
        </Reveal>
        <Reveal
          delay={0.18}
          variant="fadeUp"
          className="flex flex-col justify-center lg:col-span-5"
        >
          <p className="body-editorial max-w-[40ch] text-white/55">{body}</p>
          <div className="mt-7">
            <MeridianLink href={href} tone="light">
              {cta}
            </MeridianLink>
          </div>
          <div
            className="mt-10 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-white/35"
            aria-hidden
          >
            <span>Brasil</span>
            <span className="relative h-px w-16 overflow-hidden bg-white/15">
              <span className="absolute inset-y-0 left-0 w-full origin-left animate-[meridian_2.8s_ease-in-out_infinite] bg-white/70" />
            </span>
            <span>USA</span>
          </div>
        </Reveal>
      </div>

      <div className="mt-14 border-t border-white/[0.1] pt-12 md:mt-18 md:pt-14">
        <MaskedText
          as="p"
          className="font-display mx-auto max-w-[22ch] text-center text-[clamp(1.75rem,3.4vw,2.85rem)] leading-[1.15] text-white"
          delay={0.05}
        >
          {quote}
        </MaskedText>
        <Reveal delay={0.2} variant="fadeUp">
          <p className="mt-10 text-center text-[12px] uppercase tracking-[0.16em] text-white/40">
            {attribution}
          </p>
        </Reveal>
      </div>
    </BackBand>
  );
}
