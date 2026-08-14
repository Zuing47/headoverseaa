"use client";

import Image from "next/image";
import Link from "next/link";
import { BackLabel, BackShell } from "@/components/back";
import { Reveal } from "@/components/home/reveal";
import { BACK_MEDIA } from "@/lib/back-media";
import { getContent } from "@/lib/content";
import type { Insight, Locale } from "@/types/content";

interface InsightsPageViewProps {
  locale?: Locale;
  /** Server-fetched list (static + published). Falls back to static content. */
  items?: Insight[];
}

function CardMedia({
  item,
  priority,
  sizes,
}: {
  item: Insight;
  priority?: boolean;
  sizes: string;
}) {
  const src = item.image || BACK_MEDIA.pexelsField;
  if (src.startsWith("https://")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={item.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        referrerPolicy="no-referrer"
      />
    );
  }
  return (
    <Image
      src={src}
      alt={item.title}
      fill
      sizes={sizes}
      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      quality={88}
      priority={priority}
    />
  );
}

function NewsCard({
  item,
  badge,
  featured,
  index,
  en,
}: {
  item: Insight;
  badge: string;
  featured?: boolean;
  index: number;
  en: boolean;
}) {
  return (
    <Link href={item.href} className="group block">
      <div
        className={`relative overflow-hidden rounded-xl bg-black/[0.04] ${
          featured
            ? "aspect-[21/10] min-h-[220px] md:aspect-[21/9]"
            : "aspect-[16/10]"
        }`}
      >
        <CardMedia
          item={item}
          priority={index < 2}
          sizes={
            featured
              ? "100vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          }
        />
      </div>
      <div className="mt-4 flex items-center gap-2.5">
        <span className="rounded-md bg-black/[0.06] px-2.5 py-1 text-[11px] font-medium tracking-wide text-black/50">
          {featured ? (en ? "Featured" : "Destaque") : badge}
        </span>
        <span className="text-[12px] tracking-wide text-black/40">
          {item.date}
        </span>
      </div>
      <h2
        className={`font-display mt-3 font-medium leading-snug text-black transition-opacity group-hover:opacity-70 ${
          featured
            ? "text-[clamp(1.45rem,2.4vw,2.1rem)] max-w-[28ch]"
            : "text-[clamp(1.05rem,1.35vw,1.2rem)]"
        }`}
      >
        {item.title}
      </h2>
      {featured && item.description ? (
        <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-black/50">
          {item.description}
        </p>
      ) : null}
    </Link>
  );
}

export function InsightsPageView({
  locale = "pt",
  items,
}: InsightsPageViewProps) {
  const content = getContent(locale);
  const en = locale === "en";
  const insights = items ?? content.insights.items;
  const badge = "Blog";
  const [featured, ...rest] = insights;

  return (
    <BackShell content={content} locale={locale} headerSurface="dark">
      <section className="border-b border-black/[0.06] bg-black text-white">
        <div className="page-shell pb-10 pt-24 md:pb-14 md:pt-28 lg:pb-16 lg:pt-32">
          <Reveal variant="rise">
            <BackLabel tone="light">{en ? "News" : "Notícias"}</BackLabel>
          </Reveal>
          <div className="mt-7 grid items-end gap-8 lg:mt-10 lg:grid-cols-12 lg:gap-10">
            <Reveal delay={0.08} variant="rise" className="lg:col-span-5">
              <h1 className="font-display text-[clamp(2.75rem,5.5vw,4.5rem)] font-light leading-[1.02]">
                News
              </h1>
            </Reveal>
            <Reveal
              delay={0.14}
              variant="fadeUp"
              className="lg:col-span-6 lg:col-start-7"
            >
              <p className="body-editorial max-w-[40ch] text-white/55">
                {en
                  ? "Analysis, theses, and the inside view on active ownership between Brazil and the U.S."
                  : "Análises, teses e bastidores sobre active ownership entre Brasil e Estados Unidos."}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-white text-black">
        <div className="page-shell py-[clamp(2.5rem,6vw,4.5rem)]">
          {featured ? (
            <NewsCard
              item={featured}
              badge={badge}
              featured
              index={0}
              en={en}
            />
          ) : null}

          {rest.length > 0 ? (
            <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-x-7 lg:gap-y-12">
              {rest.map((item, i) => (
                <NewsCard
                  key={item.slug ?? item.title}
                  item={item}
                  badge={badge}
                  index={i + 1}
                  en={en}
                />
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </BackShell>
  );
}
