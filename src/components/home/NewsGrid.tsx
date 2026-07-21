"use client";

import Image from "next/image";
import Link from "next/link";
import type { Locale, SiteContent } from "@/types/content";
import { Reveal } from "./reveal";
import { MeridianLink, SectionLabel } from "./Editorial";
import { ImageReveal } from "@/components/pages/ImageReveal";

interface NewsGridProps {
  content: SiteContent;
  locale?: Locale;
}

/** Editorial news — featured Z + list rows with Meridian CTAs. */
export function NewsGrid({ content, locale = "en" }: NewsGridProps) {
  const copy = content.home.insights;
  const items = content.insights.items.slice(0, 3);
  const featured = items[0];
  const rest = items.slice(1);
  const en = locale === "en";
  const more = en ? "Learn more" : "Saiba mais";

  if (!featured) return null;

  return (
    <section
      className="border-t border-black/[0.08] bg-white text-black"
      aria-label={en ? "News" : "Notícias"}
    >
      <div className="page-shell section-space-lg">
        <div className="grid gap-8 border-b border-black/[0.08] pb-12 lg:grid-cols-12 lg:items-end lg:pb-14">
          <Reveal className="lg:col-span-8" variant="rise">
            <SectionLabel>{copy.eyebrow}</SectionLabel>
            <h2 className="font-display mt-7 whitespace-pre-line text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.08]">
              {copy.title}
            </h2>
          </Reveal>
          <Reveal
            delay={0.12}
            variant="rise"
            className="lg:col-span-4 lg:justify-self-end"
          >
            <MeridianLink href={copy.viewAllHref}>{copy.viewAll}</MeridianLink>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7" variant="rise">
            <Link href={featured.href} className="group block">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#eee]">
                {featured.image ? (
                  <ImageReveal
                    className="absolute inset-0 h-full w-full"
                    delay={0.05}
                  >
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                      quality={92}
                    />
                  </ImageReveal>
                ) : null}
              </div>
              <div className="mt-7 flex items-center gap-3">
                <SectionLabel>{featured.category}</SectionLabel>
                <span className="text-[12px] tracking-wide text-black/35">
                  {featured.date}
                </span>
              </div>
              <h3 className="font-display mt-4 max-w-[28ch] text-[clamp(1.5rem,2.4vw,2.15rem)] leading-snug">
                {featured.title}
              </h3>
              <p className="body-editorial mt-4 max-w-[42ch] text-black/55">
                {featured.description}
              </p>
            </Link>
            <div className="mt-7">
              <MeridianLink href={featured.href}>{more}</MeridianLink>
            </div>
          </Reveal>

          <div className="flex flex-col justify-center lg:col-span-5">
            {rest.map((item, i) => (
              <Reveal key={item.title} delay={0.1 + i * 0.08} variant="rise">
                <Link
                  href={item.href}
                  className="group block border-t border-black/[0.08] py-8 first:border-t-0 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <p className="label-caps text-black/40">{item.category}</p>
                    <span className="text-[12px] tracking-wide text-black/30">
                      {item.date}
                    </span>
                  </div>
                  <h3 className="font-display mt-3 text-[1.35rem] leading-snug transition-opacity group-hover:opacity-65 md:text-[1.5rem]">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-[36ch] text-[14px] leading-relaxed text-black/50">
                    {item.description}
                  </p>
                </Link>
                <div className="mt-5">
                  <MeridianLink href={item.href}>{more}</MeridianLink>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export { NewsGrid as InsightsGrid };
