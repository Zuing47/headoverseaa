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
      sizes="100vw"
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
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-black/[0.04] ring-1 ring-black/[0.08]">
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logo}
            alt=""
            className="h-full w-full object-contain p-1.5"
            referrerPolicy="no-referrer"
          />
        ) : (
          <span className="text-[11px] font-bold uppercase tracking-wide text-black/40">
            {name.slice(0, 2)}
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/40">
          {en ? "Source" : "Fonte"}
        </p>
        <p className="mt-0.5 truncate text-[15px] font-semibold text-black">
          {name}
        </p>
        {url ? (
          <p className="mt-0.5 truncate text-[12px] text-black/45">{url}</p>
        ) : null}
      </div>
      {url ? (
        <span className="shrink-0 text-[18px] text-black/30" aria-hidden>
          →
        </span>
      ) : null}
    </>
  );

  const className =
    "mt-10 flex items-center gap-4 rounded-2xl border border-black/[0.08] bg-[#f7f8fa] px-4 py-4 transition-colors";

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${className} hover:border-black/20 hover:bg-[#f0f2f5]`}
      >
        {inner}
      </a>
    );
  }

  return <div className={className}>{inner}</div>;
}

/** G1-inspired editorial article — HO typography, white plane, byline with team photo. */
export function NewsArticlePageView({
  content,
  locale = "pt",
  article,
}: NewsArticlePageViewProps) {
  const en = locale === "en";
  const indexHref = en ? "/en/insights" : "/insights";
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
  const lead = article.description || paragraphs[0] || "";
  const bodyParas =
    lead && paragraphs[0] === lead ? paragraphs.slice(1) : paragraphs;

  const cover = article.image || NEWS_COVER_FALLBACK;
  const sourceLabel = article.sourceName?.trim();
  const showSource = Boolean(sourceLabel || article.sourceUrl);

  return (
    <BackShell
      content={content}
      locale={locale}
      withContact={false}
      headerSurface="light"
    >
      <BackBand tone="white" className="!pt-8 md:!pt-12">
        <Reveal variant="rise">
          <BackBreadcrumb items={crumbs} />
        </Reveal>

        <article className="mx-auto mt-8 max-w-[46rem] md:mt-10">
          <Reveal variant="rise">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0a2540]">
              {article.category}
            </p>
            <h1 className="font-display mt-4 text-[clamp(1.85rem,4.2vw,3.15rem)] font-medium leading-[1.12] tracking-[-0.02em] text-black">
              {article.title}
            </h1>
            {lead ? (
              <p className="mt-5 text-[1.125rem] font-medium leading-[1.55] text-black/75 md:text-[1.2rem]">
                {lead}
              </p>
            ) : null}

            <div className="mt-7 flex flex-wrap items-center gap-3 border-y border-black/[0.08] py-4">
              {article.authorPhoto ? (
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-black/[0.06] ring-1 ring-black/[0.08]">
                  <Image
                    src={article.authorPhoto}
                    alt={article.author || ""}
                    fill
                    sizes="44px"
                    className="object-cover object-top"
                  />
                </div>
              ) : (
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-[11px] font-semibold text-white">
                  HO
                </div>
              )}
              <div className="min-w-0">
                <p className="text-[14px] font-semibold text-black">
                  {article.author || "Head Oversea"}
                </p>
                <p className="text-[12px] text-black/45">
                  {article.authorRole ? `${article.authorRole} · ` : ""}
                  {article.date}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal variant="rise">
            <figure className="relative mt-8 aspect-[16/10] w-full overflow-hidden bg-black/[0.04] md:mt-10">
              <CoverImage src={cover} alt={article.title} />
            </figure>
          </Reveal>

          <EditorialBody paragraphs={bodyParas} className="mt-10 md:mt-12" />

          {showSource ? (
            <SourceCard
              name={sourceLabel || (en ? "Original source" : "Fonte original")}
              url={article.sourceUrl}
              logo={article.sourceLogoUrl}
              en={en}
            />
          ) : null}

          <NewsShareBar
            title={article.title}
            path={article.href}
            locale={locale}
          />

          <div className="mt-12 border-t border-black/[0.08] pt-10">
            <MeridianLink href={indexHref}>
              {en ? "Back to News" : "Voltar para Notícias"}
            </MeridianLink>
          </div>
        </article>
      </BackBand>
    </BackShell>
  );
}
