"use client";

import {
  BackBand,
  BackBreadcrumb,
  BackHero,
  BackShell,
  MeridianLink,
} from "@/components/back";
import { Reveal } from "@/components/home/reveal";
import { NewsShareBar } from "@/components/pages/NewsShareBar";
import { NEWS_COVER_FALLBACK } from "@/lib/news/cover";
import type { Insight, Locale, SiteContent } from "@/types/content";

interface NewsArticlePageViewProps {
  content: SiteContent;
  locale?: Locale;
  article: Insight;
}

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

  // One cover only — same image as the listing card (no second stock photo).
  const cover = article.image || NEWS_COVER_FALLBACK;

  return (
    <BackShell content={content} locale={locale} withContact={false}>
      <BackHero
        eyebrow={article.category}
        title={article.title}
        subtitle={`${article.date}${article.author ? ` · ${article.author}` : ""}`}
        image={cover}
        imageAlt={article.title}
      />

      <BackBand tone="white">
        <Reveal variant="rise">
          <BackBreadcrumb items={crumbs} />
        </Reveal>

        <article className="mx-auto mt-12 max-w-[40rem] md:mt-16">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="body-editorial mb-7 text-[1.05rem] leading-[1.75] text-black/65"
            >
              {p}
            </p>
          ))}

          <NewsShareBar
            title={article.title}
            path={article.href}
            image={cover}
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
