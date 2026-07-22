"use client";

import type { Locale } from "@/types/content";
import { Reveal } from "./reveal";
import { SectionLabel } from "./Editorial";
import { ParallaxMedia } from "@/components/pages/ImageReveal";
import { LazyVideo } from "@/components/ui/LazyVideo";

interface StoryBandProps {
  locale?: Locale;
}

/** Crossing narrative — boat loop with scroll parallax. */
export function StoryBand({ locale = "pt" }: StoryBandProps) {
  const en = locale === "en";

  return (
    <section
      className="relative min-h-[min(70vh,640px)] overflow-hidden bg-black text-white md:min-h-[80vh]"
      aria-label={en ? "Brazil–U.S. journey" : "Jornada Brasil–EUA"}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-24 md:h-40"
        aria-hidden
        style={{
          background:
            "linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.45) 40%, transparent 100%)",
        }}
      />
      <ParallaxMedia strength={9}>
        <LazyVideo
          className="absolute inset-0 h-full w-full object-cover object-center"
          src="/videos/homevideo.mp4"
          poster="/images/homevideo-poster.jpg"
          aria-hidden
        />
      </ParallaxMedia>
      <div
        className="absolute inset-0 z-[1] hidden lg:block"
        aria-hidden
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.32) 55%, rgba(0,0,0,0.1) 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-[1] lg:hidden"
        aria-hidden
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.82) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-36 md:h-32"
        aria-hidden
        style={{
          background:
            "linear-gradient(to top, #000 0%, rgba(0,0,0,0.55) 50%, transparent 100%)",
        }}
      />
      <div className="page-shell relative z-10 flex min-h-[min(70vh,640px)] flex-col justify-end py-12 pb-16 md:min-h-[80vh] md:justify-center md:py-20">
        <Reveal variant="rise">
          <SectionLabel tone="light">
            {en ? "Crossing" : "Jornada"}
          </SectionLabel>
        </Reveal>
        <Reveal delay={0.14} variant="rise">
          <p className="font-display mt-6 max-w-2xl text-[clamp(1.85rem,5vw,3.5rem)] leading-[1.1] text-white md:mt-8 md:text-[clamp(2.1rem,4.2vw,3.5rem)]">
            {en
              ? "From the Atlantic to valuation."
              : "Do Atlântico ao valuation."}
          </p>
        </Reveal>
        <Reveal delay={0.24} variant="fadeUp">
          <p className="mt-5 max-w-[38ch] text-[15px] leading-relaxed text-white/70 md:mt-6 md:text-[16px]">
            {en
              ? "We connect markets with the same logic: presence, discipline, and assets built to last."
              : "Conectamos mercados com a mesma lógica: presença, disciplina e ativos feitos para durar."}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
