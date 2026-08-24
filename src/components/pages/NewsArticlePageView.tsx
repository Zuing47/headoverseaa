"use client";

import Image from "next/image";
import {
  BackBand,
  BackBreadcrumb,
  BackShell,
  MeridianLink,
} from "@/components/back";
import { Reveal } from "@/components/home/reveal";
import { NewsShareBar } from "@/components/pages/NewsShareBar";
import { EditorialBody } from "@/components/pages/EditorialBody";
import { ProtectedAvatar } from "@/components/ui/ProtectedAvatar";
import { NEWS_COVER_FALLBACK } from "@/lib/news/cover";
import type { Insight, Locale, SiteContent } from "@/types/content";

interface NewsArticlePageViewProps {
  content: SiteContent;
  locale?: Locale;
  article: Insight;
}

function CoverImage({ src, alt }: { src: string; alt: string }) {
  if (src.startsWith("https://") || src.startsWith("/api/news/media/")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        referrerPolicy="no-referrer"
      />
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, 720px"
      className="object-cover"
      priority
      quality={90}
    />
  );
}

function SourceCard({
  name,
  url,
  logo,
  en,
}: {
  name: string;
  url?: string;
  logo?: string;
  en: boolean;
}) {
  const inner = (
    <>
      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white ring-1 ring-black/[0.08]">
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logo}
            alt=""
            className="h-full w-full object-contain p-1.5"
            referrerPolicy="no-referrer"
          />
        ) : (
          <span className="text-[10px] font-bold uppercase tracking-wide text-black/35">
            {name.slice(0, 2)}
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium text-black/40">
          {en ? "Source" : "Fonte"}
        </p>
        <p className="mt-0.5 truncate text-[14px] font-semibold text-black">
          {name}
        </p>
      </div>
      {url ? (
        <span className="shrink-0 text-[16px] text-black/25" aria-hidden>
          →
        </span>
      ) : null}
    </>
  );

  const className =
    "mt-10 flex items-center gap-3.5 border border-black/[0.08] bg-[#fafafa] px-4 py-3.5 transition-colors";

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${className} hover:border-black/15 hover:bg-[#f5f5f5]`}
      >
        {inner}
      </a>
    );
  }

  return <div className={className}>{inner}</div>;
}

/**
 * Editorial article layout — rhythm inspired by major news portals
 * (narrow column, dek, byline, share, cover) with Head Oversea identity.
 * Deliberately not a Globo/G1 clone: HO serif display, navy accents, Meridian CTA.
 */
export function NewsArticlePageView({
  content,
  locale = "pt",
  article,
}: NewsArticlePageViewProps) {
  const en = locale === "en";
  const indexHref = en ? "/en/news" : "/news";
  const homeHref = en ? "/" : "/pt";
  const crumbs = [
    { name: "Home", href: homeHref },
    { name: en ? "News" : "Notícias", href: indexHref },
    { name: article.title, href: article.href },
  ];
  const paragraphs = article.body?.length
    ? article.body
    : article.description
      ? [article.description]
      : [];
  const lead = article.description || "";
  const bodyParas = paragraphs;

  const cover = article.image || NEWS_COVER_FALLBACK;
  const sourceLabel = article.sourceName?.trim();
  const showSource = Boolean(sourceLabel || article.sourceUrl);
  const bylineName = article.author || "Head Oversea";
  const bylinePrefix = en ? "By" : "Por";

  return (
    <BackShell
      content={content}
      locale={locale}
      withContact={false}
      headerSurface="light"
    >
      <BackBand tone="white" className="!pb-16 !pt-6 md:!pb-24 md:!pt-10">
        <div className="mx-auto max-w-[42rem]">
          <Reveal variant="rise">
            <BackBreadcrumb items={crumbs} />
          </Reveal>

          <article className="mt-7 md:mt-9">
            <Reveal variant="rise">
              <p className="text-[13px] font-semibold text-[#0a2540]">
                {article.category}
              </p>

              <h1 className="mt-3 text-[clamp(1.65rem,4vw,2.65rem)] font-bold leading-[1.18] tracking-[-0.02em] text-black">
                {article.title}
              </h1>

              {lead ? (
                <p className="mt-4 text-[1.05rem] leading-[1.55] text-[#5c5c5c] md:text-[1.125rem] md:leading-[1.55]">
                  {lead}
                </p>
              ) : null}

              <div className="mt-6 flex flex-wrap items-center gap-3">
                {article.authorPhoto ? (
                  <ProtectedAvatar
                    src={article.authorPhoto}
                    alt={bylineName}
                    size={40}
                  />
                ) : null}
                <div className="min-w-0 text-[13px] leading-snug text-[#666]">
                  <p>
                    <span className="text-black/50">{bylinePrefix} </span>
                    <span className="font-semibold text-black">{bylineName}</span>
                    {article.authorRole ? (
                      <span className="text-black/45">
                        {" "}
                        — {article.authorRole}
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-0.5 text-[12px] text-black/40">
                    {article.date}
                    <span className="text-black/25"> · </span>
                    Head Oversea
                  </p>
                </div>
              </div>

              <NewsShareBar
                title={article.title}
                path={article.href}
                locale={locale}
                variant="inline"
              />
            </Reveal>

            <Reveal variant="rise">
              <figure className="mt-7 md:mt-8">
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/[0.04]">
                  <CoverImage src={cover} alt={article.title} />
                </div>
                <figcaption className="mt-2 text-[12px] leading-snug text-black/40">
                  {article.category}
                  {sourceLabel ? ` · ${sourceLabel}` : ""}
                </figcaption>
              </figure>
            </Reveal>

            <EditorialBody paragraphs={bodyParas} className="mt-8 md:mt-10" />

            {showSource ? (
              <SourceCard
                name={
                  sourceLabel || (en ? "Original source" : "Fonte original")
                }
                url={article.sourceUrl}
                logo={article.sourceLogoUrl}
                en={en}
              />
            ) : null}

            <div className="mt-12 border-t border-black/[0.08] pt-8">
              <MeridianLink href={indexHref}>
                {en ? "Back to News" : "Voltar para Notícias"}
              </MeridianLink>
            </div>
          </article>
        </div>
      </BackBand>
    </BackShell>
  );
}
