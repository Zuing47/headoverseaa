"use client";

import Image from "next/image";
import type { Locale } from "@/types/content";
import { Reveal } from "./reveal";
import { MeridianLink, SectionLabel } from "./Editorial";

interface InvestmentPillarsProps {
  locale?: Locale;
}

/** PE & RE: editorial strips — Crossing layout with meridian CTAs. */
export function InvestmentPillars({ locale = "pt" }: InvestmentPillarsProps) {
  const en = locale === "en";

  const peHref = en ? "/en/private-equity" : "/private-equity";
  const reHref = en ? "/en/real-estate" : "/real-estate";
  const portfolioHref = en ? "/en/cases" : "/cases";
  const thesisHref = en ? "/en/about" : "/tese";

  return (
    <section aria-label="Investments">
      {/* PE — photo first on mobile, side-by-side feel on desktop */}
      <div className="relative overflow-hidden border-t border-white/[0.08] bg-black text-white">
        {/* Mobile: dedicated photo band so the image is actually visible */}
        <div className="relative aspect-[16/10] w-full overflow-hidden lg:hidden">
          <Image
            src="/images/fundo.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
            quality={85}
            priority
          />
          <div
            className="absolute inset-0"
            aria-hidden
            style={{
              background:
                "linear-gradient(180deg, transparent 40%, rgba(5,5,5,0.55) 100%)",
            }}
          />
        </div>

        <div className="relative">
          {/* Desktop full-bleed background */}
          <Image
            src="/images/fundo.jpg"
            alt=""
            fill
            sizes="100vw"
            className="hidden object-cover object-center lg:block"
            quality={90}
            priority
          />
          <div
            className="absolute inset-0 z-[1] hidden lg:block"
            aria-hidden
            style={{
              background:
                "linear-gradient(90deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.72) 45%, rgba(0,0,0,0.55) 100%)",
            }}
          />

          <div className="relative z-10 mx-auto grid max-w-[80rem] items-center gap-8 px-[var(--page-padding-mobile)] py-[clamp(2.75rem,6vw,4.5rem)] md:px-[var(--page-padding-tablet)] lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-12 lg:px-[var(--page-padding-desktop)]">
            <div>
              <Reveal variant="rise">
                <SectionLabel tone="light">01 / Private Equity</SectionLabel>
              </Reveal>
              <Reveal delay={0.1} variant="rise">
                <h2 className="font-display mt-7 max-w-[18ch] text-[clamp(1.85rem,3.2vw,2.85rem)] leading-[1.12]">
                  {en
                    ? "Active ownership. Enduring businesses."
                    : "Ownership ativo. Negócios duradouros."}
                </h2>
              </Reveal>
              <Reveal delay={0.16} variant="fadeUp">
                <p className="body-editorial mt-5 max-w-[34ch] text-white/55">
                  {en
                    ? "We take ownership positions in established companies — governance, operations, and long-term value alongside leadership."
                    : "Assumimos posições de propriedade em empresas consolidadas — governança, operação e valor de longo prazo lado a lado com a liderança."}
                </p>
              </Reveal>
            </div>

            <Reveal
              delay={0.2}
              variant="fadeUp"
              className="flex flex-col gap-3 sm:gap-4 lg:items-start lg:justify-center lg:gap-5"
            >
              <MeridianLink href={peHref} tone="light">
                {en ? "Explore Private Equity" : "Explorar Private Equity"}
              </MeridianLink>
              <MeridianLink href={portfolioHref} tone="light">
                {en ? "View portfolio" : "Ver portfólio"}
              </MeridianLink>
              <MeridianLink href={thesisHref} tone="light">
                {en ? "Our thesis" : "Nossa tese"}
              </MeridianLink>
            </Reveal>
          </div>
        </div>
      </div>

      {/* RE — text left, photo fills entire right half with soft L→R fade */}
      <div className="relative overflow-hidden border-t border-black/[0.08] bg-white text-black">
        {/* Desktop: full right half media */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[54%] lg:block"
          aria-hidden
        >
          <Image
            src="/images/luxury-residential-real-estate.jpg"
            alt=""
            fill
            sizes="54vw"
            className="object-cover object-center"
            quality={90}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, #fff 0%, rgba(255,255,255,0.92) 8%, rgba(255,255,255,0.45) 28%, transparent 48%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto grid max-w-[80rem] items-center gap-10 px-[var(--page-padding-mobile)] py-[clamp(2.75rem,6vw,4.5rem)] md:px-[var(--page-padding-tablet)] lg:min-h-[min(62vh,560px)] lg:grid-cols-12 lg:gap-8 lg:px-[var(--page-padding-desktop)]">
          <div className="lg:col-span-5">
            <Reveal variant="rise">
              <SectionLabel tone="dark">02 / Real Estate</SectionLabel>
            </Reveal>
            <Reveal delay={0.1} variant="rise">
              <h2 className="font-display mt-7 max-w-[18ch] text-[clamp(1.85rem,3.2vw,2.85rem)] leading-[1.12]">
                {en
                  ? "Real assets. Long‑term perspective."
                  : "Ativos reais. Perspectiva de longo prazo."}
              </h2>
            </Reveal>
            <Reveal delay={0.16} variant="fadeUp">
              <p className="body-editorial mt-5 max-w-[34ch] text-black/55">
                {en
                  ? "We invest in real estate with strategic discipline, patient capital, and a long horizon across Brazil and the United States."
                  : "Investimos em ativos imobiliários com disciplina estratégica, capital paciente e horizonte longo entre Brasil e Estados Unidos."}
              </p>
            </Reveal>
            <Reveal
              delay={0.2}
              variant="fadeUp"
              className="mt-8 flex flex-col gap-3 sm:mt-10 sm:gap-5"
            >
              <MeridianLink href={reHref}>
                {en ? "Explore Real Estate" : "Explorar Real Estate"}
              </MeridianLink>
              <MeridianLink href={portfolioHref}>
                {en ? "View portfolio" : "Ver portfólio"}
              </MeridianLink>
            </Reveal>
          </div>

          {/* Mobile: full-width soft photo under copy */}
          <div className="relative aspect-[16/11] w-full overflow-hidden lg:hidden">
            <Image
              src="/images/luxury-residential-real-estate.jpg"
              alt={
                en
                  ? "Real estate — Head Oversea long horizon"
                  : "Real estate — horizonte longo Head Oversea"
              }
              fill
              sizes="100vw"
              className="object-cover object-center"
              quality={90}
            />
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden
              style={{
                background:
                  "linear-gradient(180deg, #fff 0%, transparent 18%, transparent 82%, #fff 100%)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
