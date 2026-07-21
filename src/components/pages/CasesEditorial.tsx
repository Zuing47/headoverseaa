"use client";

import Image from "next/image";
import Link from "next/link";
import { TextReveal } from "@/components/pages/TextReveal";
import { Reveal } from "@/components/home/reveal";
import { TextLink } from "@/components/home/Editorial";
import type { SiteContent, Locale, CaseStudy } from "@/types/content";

interface CasesEditorialProps {
  content: SiteContent;
  locale: Locale;
}

export function CasesEditorial({ content, locale }: CasesEditorialProps) {
  const en = locale === "en";
  const visitLabel = en ? "Visit site" : "Visitar site";
  /** Client order: Rio Laser → Drakkar → Geromel → Superbloom → Road Pro → Once */
  const OWNERSHIP_ORDER = [
    "riolaser",
    "drakkar",
    "geromel",
    "superbloom",
    "roadpro",
    "once",
  ] as const;
  const ownership = OWNERSHIP_ORDER.map((id) =>
    content.cases.items.find((i) => i.id === id && i.format !== "brand"),
  ).filter(Boolean) as CaseStudy[];

  return (
    <section className="bg-white text-black">
      <div className="pb-6 md:pb-8">
        {ownership.map((item, i) => (
          <CaseBlock
            key={item.id}
            item={item}
            index={i}
            visitLabel={visitLabel}
            en={en}
          />
        ))}
      </div>
    </section>
  );
}

function CaseBlock({
  item,
  index,
  visitLabel,
  en,
}: {
  item: CaseStudy;
  index: number;
  visitLabel: string;
  en: boolean;
}) {
  const isReal = item.visitUrl && item.visitUrl !== "#";
  const photo = item.image;
  const caseHref = item.detail
    ? en
      ? `/en/cases/${item.id}`
      : `/cases/${item.id}`
    : null;
  const readLabel = en ? "Read the case" : "Ler o case";

  const logoClass =
    item.id === "drakkar"
      ? "h-10 w-auto max-w-[180px] object-contain md:h-11"
      : item.id === "once"
        ? "h-9 w-auto max-w-[160px] object-contain md:h-10"
        : item.id === "superbloom"
          ? "h-14 w-auto max-w-[280px] object-contain md:h-16 md:max-w-[320px]"
          : "h-8 w-auto max-w-[150px] object-contain md:h-9";

  return (
    <article className="border-t border-black/[0.08]">
      <div className="page-shell py-10 md:py-12">
        <div className="grid items-center gap-8 md:grid-cols-12 md:gap-10 lg:gap-14">
          {/* Photo — compact, list rhythm */}
          <Reveal variant="rise" className="md:col-span-5">
            {photo ? (
              <div className="relative aspect-[16/11] overflow-hidden bg-[#eceae4]">
                <Image
                  src={photo}
                  alt={item.company}
                  fill
                  sizes="(max-width: 768px) 100vw, 42vw"
                  quality={90}
                  priority={index === 0}
                  className="object-cover object-center"
                />
              </div>
            ) : null}
          </Reveal>

          {/* Copy — horizontal meta, not a tall stack */}
          <TextReveal className="md:col-span-7" delay={0.06}>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
              {item.logo ? (
                <div
                  className={
                    item.logoBg === "dark"
                      ? "inline-flex items-center justify-center bg-[#0a0a0a] px-4 py-3"
                      : "inline-flex items-center"
                  }
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.logo}
                    alt=""
                    className={logoClass}
                  />
                </div>
              ) : null}
              <p className="label-caps text-black/35">
                {String(index + 1).padStart(2, "0")} · {item.category}
                {item.location ? ` · ${item.location}` : null}
              </p>
            </div>

            <h2 className="font-display mt-5 text-[clamp(1.65rem,2.8vw,2.35rem)] leading-snug">
              {item.company}
            </h2>
            <p className="body-editorial mt-4 max-w-[46ch] text-black/55">
              {item.description ?? item.headline}
            </p>

            <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
              {item.result ? (
                <p className="max-w-[34ch] text-[13px] leading-relaxed text-black/50">
                  {item.resultLabel ? (
                    <span className="label-caps mb-1.5 block text-black/35">
                      {item.resultLabel}
                    </span>
                  ) : null}
                  {item.result}
                </p>
              ) : (
                <span />
              )}
              <div className="flex shrink-0 flex-wrap items-center gap-x-7 gap-y-2">
                {caseHref ? (
                  <TextLink href={caseHref}>{readLabel}</TextLink>
                ) : null}
                {isReal ? (
                  <TextLink href={item.visitUrl!} external>
                    {visitLabel}
                  </TextLink>
                ) : !caseHref ? (
                  <Link
                    href={en ? "/en/contact" : "/contato"}
                    className="text-[13px] underline underline-offset-4 decoration-black/15 hover:decoration-current"
                  >
                    {en ? "Request details" : "Solicitar detalhes"}
                  </Link>
                ) : null}
              </div>
            </div>
          </TextReveal>
        </div>
      </div>
    </article>
  );
}
