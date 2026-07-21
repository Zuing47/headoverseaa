"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import {
  BackLabel,
  BackShell,
  MeridianLink,
} from "@/components/back";
import { Reveal } from "@/components/home/reveal";
import { ImageReveal } from "@/components/pages/ImageReveal";
import { GuideLeadModal } from "@/components/pages/GuideLeadModal";
import { getContent } from "@/lib/content";
import { BACK_MEDIA } from "@/lib/back-media";
import {
  MATERIALS_GUIDES,
  MATERIALS_SECTIONS,
  guideCoverPath,
  guidePdfPath,
  guidesForCategory,
  type MaterialsGuide,
  type MaterialsSection,
} from "@/lib/content/materials";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types/content";

interface MaterialsPageViewProps {
  locale?: Locale;
}

const PAGE_COPY = {
  pt: {
    eyebrow: "Materiais",
    title: "Guias para estudar\ncom clareza.",
    intro:
      "Conteúdo da Head Oversea sobre private markets — do primeiro passo à alocação. Baixe, leia e use na conversa.",
    bandEyebrow: "Por que disponibilizamos",
    bandTitle: "Clareza antes do compromisso.",
    bandBody:
      "Fundadores e investidores sérios não precisam de folder genérico. Precisam de linguagem legível, método e o próximo passo óbvio — sem pressa e sem jargão ocioso.",
    bandCta: "Falar com a equipe",
    download: "Baixar guia",
    countLabel: "guias disponíveis",
    dividerEyebrow: "Presença",
    dividerTitle: "Brasil — USA",
  },
  en: {
    eyebrow: "Materials",
    title: "Guides to study\nwith clarity.",
    intro:
      "Head Oversea content on private markets — from first steps to allocation. Download, read, and use in the conversation.",
    bandEyebrow: "Why we publish",
    bandTitle: "Clarity before commitment.",
    bandBody:
      "Serious founders and investors do not need a generic brochure. They need legible language, method, and an obvious next step — without haste and without idle jargon.",
    bandCta: "Speak with the team",
    download: "Download guide",
    countLabel: "guides available",
    dividerEyebrow: "Presence",
    dividerTitle: "Brazil — USA",
  },
} as const;

const UNLOCK_KEY = "ho-guide-lead-unlocked";

function isUnlocked() {
  try {
    return sessionStorage.getItem(UNLOCK_KEY) === "1";
  } catch {
    return false;
  }
}

function markUnlocked() {
  try {
    sessionStorage.setItem(UNLOCK_KEY, "1");
  } catch {
    /* ignore */
  }
}

function DownloadGuideButton({
  label,
  onDark,
}: {
  label: string;
  onDark: boolean;
}) {
  return (
    <span
      className={cn(
        "mt-5 inline-flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.18em] transition-opacity group-hover:opacity-75",
        onDark ? "text-white" : "text-black",
      )}
    >
      <span
        className={cn(
          "underline underline-offset-[6px] decoration-1 transition-[text-decoration-color]",
          onDark
            ? "decoration-white/30 group-hover:decoration-white/65"
            : "decoration-black/25 group-hover:decoration-black/55",
        )}
      >
        {label}
      </span>
      <span className="relative inline-flex h-[2px] w-10 items-center" aria-hidden>
        <span
          className={cn(
            "absolute left-0 h-[5px] w-[5px] rounded-full",
            onDark ? "bg-white" : "bg-black",
          )}
        />
        <span
          className={cn(
            "absolute inset-x-[6px] h-px",
            onDark ? "bg-white/55" : "bg-black/40",
          )}
        />
        <span className="absolute right-0 h-[5px] w-[5px] rounded-full bg-[var(--gold)]" />
      </span>
    </span>
  );
}

function GuideCard({
  guide,
  locale,
  delay,
  onDark,
  onRequestDownload,
}: {
  guide: MaterialsGuide;
  locale: Locale;
  delay: number;
  onDark: boolean;
  onRequestDownload: (guide: MaterialsGuide) => void;
}) {
  const t = PAGE_COPY[locale];
  const cover = guideCoverPath();

  return (
    <Reveal delay={delay} variant="fadeUp" className="flex h-full flex-col">
      <button
        type="button"
        onClick={() => onRequestDownload(guide)}
        className="group flex h-full flex-col text-left"
        aria-label={`${t.download}: ${guide.title[locale]}`}
      >
        <div
          className={cn(
            "relative aspect-[3/4] w-full max-w-[11.5rem] overflow-hidden sm:max-w-[12.5rem]",
            onDark ? "bg-white/[0.06]" : "bg-black/[0.04]",
          )}
        >
          <Image
            src={cover}
            alt=""
            fill
            sizes="200px"
            className="object-cover object-top transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
            quality={90}
          />
        </div>
        <h3
          className={cn(
            "font-display mt-5 max-w-[22ch] text-[1.2rem] leading-snug md:text-[1.3rem]",
            onDark ? "text-white" : "text-black",
          )}
        >
          {guide.title[locale]}
        </h3>
        <p
          className={cn(
            "mt-2.5 max-w-[34ch] flex-1 text-[13px] leading-relaxed",
            onDark ? "text-white/45" : "text-black/50",
          )}
        >
          {guide.blurb[locale]}
        </p>
        <DownloadGuideButton label={t.download} onDark={onDark} />
      </button>
    </Reveal>
  );
}

function GuidesSection({
  section,
  locale,
  onRequestDownload,
}: {
  section: MaterialsSection;
  locale: Locale;
  onRequestDownload: (guide: MaterialsGuide) => void;
}) {
  const guides = guidesForCategory(section.id);
  if (!guides.length) return null;
  const dark = section.tone === "dark";

  return (
    <section
      className={cn(
        "border-t",
        dark
          ? "border-white/[0.08] bg-black text-white"
          : "border-black/[0.06] bg-white text-black",
      )}
    >
      <div className="page-shell py-[clamp(2.5rem,5vw,4rem)]">
        <Reveal variant="rise">
          <BackLabel tone={dark ? "light" : "dark"}>
            {section.label[locale]}
          </BackLabel>
        </Reveal>
        <Reveal delay={0.06} variant="rise">
          <h2 className="font-display mt-5 max-w-[22ch] text-[clamp(1.7rem,2.8vw,2.4rem)] leading-[1.12]">
            {section.title[locale]}
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-14">
          {guides.map((guide, i) => (
            <GuideCard
              key={guide.id}
              guide={guide}
              locale={locale}
              delay={0.08 + i * 0.05}
              onDark={dark}
              onRequestDownload={onRequestDownload}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function MaterialsPageView({ locale = "pt" }: MaterialsPageViewProps) {
  const content = getContent(locale);
  const en = locale === "en";
  const t = PAGE_COPY[locale];
  const contactHref = en ? "/en/contact" : "/contato";
  const [firstSection, ...restSections] = MATERIALS_SECTIONS;

  const [activeGuide, setActiveGuide] = useState<MaterialsGuide | null>(null);

  const requestDownload = useCallback((guide: MaterialsGuide) => {
    const pdf = guidePdfPath(guide);
    if (isUnlocked()) {
      const a = document.createElement("a");
      a.href = pdf;
      a.download = "";
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      a.remove();
      return;
    }
    setActiveGuide(guide);
  }, []);

  return (
    <BackShell content={content} locale={locale} headerSurface="dark">
      {/* Hero */}
      <section className="border-b border-black/[0.06] bg-black text-white">
        <div className="page-shell pb-10 pt-24 md:pb-14 md:pt-28 lg:pb-16 lg:pt-32">
          <Reveal variant="rise">
            <BackLabel tone="light">{t.eyebrow}</BackLabel>
          </Reveal>
          <div className="mt-7 grid items-end gap-8 lg:mt-10 lg:grid-cols-12 lg:gap-10">
            <Reveal delay={0.08} variant="rise" className="lg:col-span-6">
              <h1 className="font-display whitespace-pre-line text-[clamp(2.75rem,5.5vw,4.5rem)] font-light leading-[1.02]">
                {t.title}
              </h1>
            </Reveal>
            <Reveal
              delay={0.14}
              variant="fadeUp"
              className="lg:col-span-5 lg:col-start-8"
            >
              <p className="body-editorial max-w-[40ch] text-white/55">
                {t.intro}
              </p>
              <p className="label-caps mt-8 text-white/35">
                {MATERIALS_GUIDES.length} {t.countLabel}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Intro band */}
      <section className="border-t border-black/[0.06] bg-white text-black">
        <div className="page-shell py-[clamp(2.75rem,6vw,4.75rem)]">
          <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal variant="rise" className="lg:col-span-5">
              <BackLabel>{t.bandEyebrow}</BackLabel>
              <h2 className="font-display mt-6 max-w-[16ch] text-[clamp(1.85rem,3.2vw,2.85rem)] leading-[1.12]">
                {t.bandTitle}
              </h2>
            </Reveal>
            <Reveal delay={0.1} variant="fadeUp" className="lg:col-span-6 lg:col-start-7">
              <p className="body-editorial max-w-[42ch] text-black/55">
                {t.bandBody}
              </p>
              <div className="mt-10">
                <MeridianLink href={contactHref}>{t.bandCta}</MeridianLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {firstSection ? (
        <GuidesSection
          section={firstSection}
          locale={locale}
          onRequestDownload={requestDownload}
        />
      ) : null}

      {/* NYC skyline divider */}
      <section className="relative overflow-hidden bg-black">
        <ImageReveal className="relative h-[160px] w-full sm:h-[190px] md:h-[220px]">
          <Image
            src={BACK_MEDIA.valueImpactSkyline}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center brightness-[0.45] contrast-[1.05]"
            quality={90}
            priority={false}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-end">
            <div className="page-shell pb-5 md:pb-6">
              <p className="label-caps text-white/45">{t.dividerEyebrow}</p>
              <p className="font-display mt-2 text-[1.25rem] text-white md:text-[1.45rem]">
                {t.dividerTitle}
              </p>
            </div>
          </div>
        </ImageReveal>
      </section>

      {restSections.map((section) => (
        <GuidesSection
          key={section.id}
          section={section}
          locale={locale}
          onRequestDownload={requestDownload}
        />
      ))}

      <GuideLeadModal
        open={Boolean(activeGuide)}
        locale={locale}
        guideId={activeGuide?.id ?? ""}
        guideTitle={activeGuide ? activeGuide.title[locale] : ""}
        pdfHref={activeGuide ? guidePdfPath(activeGuide) : ""}
        onClose={() => setActiveGuide(null)}
        onUnlocked={markUnlocked}
      />
    </BackShell>
  );
}
