"use client";

import Image from "next/image";
import Link from "next/link";
import { BackLabel, BackShell, MeridianLink } from "@/components/back";
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

/** Lead story — text-first, portal hierarchy. */
function LeadStory({ item, en }: { item: Insight; en: boolean }) {
  return (
    <article className="flex h-full flex-col border-b border-black/[0.08] pb-8 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10">
      <Link href={item.href} className="group block flex-1">
        <p className="label-caps text-black/40">{item.category}</p>
        <h2 className="font-display mt-4 text-[clamp(1.85rem,3.6vw,2.85rem)] font-medium leading-[1.08] text-black transition-opacity group-hover:opacity-70">
          {item.title}
        </h2>
        {item.description ? (
          <p className="mt-5 max-w-[46ch] text-[15px] leading-relaxed text-black/55 md:text-[16px]">
            {item.description}
          </p>
        ) : null}
        <p className="mt-5 text-[12px] tracking-wide text-black/35">
          {item.date}
          {item.author ? ` · ${item.author}` : ""}
        </p>
      </Link>
      <div className="mt-8">
        <MeridianLink href={item.href}>
          {en ? "Read story" : "Ler notícia"}
        </MeridianLink>
      </div>
      <Link
        href={item.href}
        className="group relative mt-8 block aspect-[16/10] overflow-hidden bg-black/[0.04] lg:mt-10"
      >
        <CardMedia
          item={item}
          priority
          sizes="(max-width: 1024px) 100vw, 58vw"
        />
      </Link>
    </article>
  );
}

/** Image-led side card with overlay copy. */
function OverlayCard({
  item,
  priority,
}: {
  item: Insight;
  priority?: boolean;
}) {
  return (
    <Link
      href={item.href}
      className="group relative block min-h-[200px] flex-1 overflow-hidden bg-[#111] sm:min-h-[220px]"
    >
      <CardMedia
        item={item}
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 34vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10"
        aria-hidden
      />
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
        <p className="label-caps text-white/55">{item.category}</p>
        <h3 className="font-display mt-2 text-[clamp(1.15rem,1.8vw,1.4rem)] leading-snug text-white transition-opacity group-hover:opacity-80">
          {item.title}
        </h3>
      </div>
    </Link>
  );
}

/** Horizontal row — thumb + copy. */
function FeedRow({ item }: { item: Insight }) {
  return (
    <Link
      href={item.href}
      className="group grid grid-cols-[5.5rem_1fr] gap-4 border-b border-black/[0.08] py-5 first:pt-0 last:border-b-0 sm:grid-cols-[7.5rem_1fr] sm:gap-5 sm:py-6"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-black/[0.04]">
        <CardMedia item={item} sizes="120px" />
      </div>
      <div className="min-w-0 self-center">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <p className="label-caps text-black/40">{item.category}</p>
          <span className="text-[12px] text-black/30">{item.date}</span>
        </div>
        <h3 className="font-display mt-2 text-[clamp(1.05rem,1.5vw,1.25rem)] leading-snug text-black transition-opacity group-hover:opacity-65">
          {item.title}
        </h3>
      </div>
    </Link>
  );
}

/** Compact “read also” rail. */
function ReadAlso({ items, en }: { items: Insight[]; en: boolean }) {
  if (items.length === 0) return null;
  return (
    <aside className="border border-black/[0.08] bg-[#f7f6f4] p-5 md:p-6">
      <p className="label-caps text-black/45">
        {en ? "Read also" : "Leia também"}
      </p>
      <ul className="mt-5 divide-y divide-black/[0.08]">
        {items.map((item) => (
          <li key={item.slug ?? item.title}>
            <Link
              href={item.href}
              className="group grid grid-cols-[1fr_4.25rem] items-start gap-3 py-4 first:pt-0 last:pb-0"
            >
              <h3 className="font-display text-[0.98rem] leading-snug text-black transition-opacity group-hover:opacity-65">
                {item.title}
              </h3>
              <div className="relative aspect-square overflow-hidden bg-black/[0.06]">
                <CardMedia item={item} sizes="80px" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function splitBoard(insights: Insight[]) {
  const lead = insights[0] ?? null;
  const side = insights.slice(1, 3);
  const rest = insights.slice(3);

  if (rest.length === 0) {
    return { lead, side, feed: [] as Insight[], also: [] as Insight[] };
  }
  if (rest.length <= 2) {
    return { lead, side, feed: rest, also: [] as Insight[] };
  }
  if (rest.length === 3) {
    return { lead, side, feed: rest.slice(0, 1), also: rest.slice(1) };
  }
  const alsoCount = Math.min(3, Math.floor(rest.length / 2));
  return {
    lead,
    side,
    feed: rest.slice(0, rest.length - alsoCount),
    also: rest.slice(rest.length - alsoCount),
  };
}

export function InsightsPageView({
  locale = "pt",
  items,
}: InsightsPageViewProps) {
  const content = getContent(locale);
  const en = locale === "en";
  const insights = items ?? content.insights.items;
  const { lead, side, feed, also } = splitBoard(insights);

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
          {lead ? (
            <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-0">
              <div className="lg:col-span-7">
                <LeadStory item={lead} en={en} />
              </div>
              {side.length > 0 ? (
                <div className="flex flex-col gap-4 lg:col-span-5 lg:pl-10">
                  {side.map((item, i) => (
                    <OverlayCard
                      key={item.slug ?? item.title}
                      item={item}
                      priority={i === 0}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}

          {feed.length > 0 || also.length > 0 ? (
            <div className="mt-12 grid gap-10 border-t border-black/[0.08] pt-10 lg:mt-14 lg:grid-cols-12 lg:gap-12 lg:pt-12">
              <div className="lg:col-span-7">
                {feed.map((item) => (
                  <FeedRow key={item.slug ?? item.title} item={item} />
                ))}
              </div>
              <div className="lg:col-span-5">
                <ReadAlso items={also} en={en} />
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </BackShell>
  );
}
