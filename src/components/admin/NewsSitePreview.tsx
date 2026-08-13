"use client";

import { BACK_MEDIA } from "@/lib/back-media";
import { draftInsightFromRecord } from "@/lib/news/map";
import { bodyToParagraphs, formatNewsDate } from "@/lib/news/sanitize";
import type { NewsArticleRecord } from "@/lib/news/types";

type DraftFields = {
  title: string;
  summary: string;
  body: string;
  category: string;
  locale: "pt" | "en";
  slug: string;
  sourceName: string;
  imageUrl: string;
};

/** Site-faithful preview of a news article (Back hero + editorial body). */
export function NewsSitePreview({ draft }: { draft: DraftFields }) {
  const insight = draftInsightFromRecord({
    locale: draft.locale,
    slug: draft.slug || "preview",
    title: draft.title || "Título",
    summary: draft.summary,
    body: draft.body,
    category: draft.category || "News",
    imageUrl: draft.imageUrl || null,
    sourceName: draft.sourceName || "Head Oversea",
    createdAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
  });

  const image = insight.image || BACK_MEDIA.nycFlag;
  const paragraphs = bodyToParagraphs(draft.body).length
    ? bodyToParagraphs(draft.body)
    : draft.summary
      ? [draft.summary]
      : ["(corpo da notícia)"];
  const date = formatNewsDate(new Date().toISOString(), draft.locale);
  const en = draft.locale === "en";

  return (
    <div className="overflow-hidden border border-black/10 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.08)]">
      <div className="border-b border-white/10 bg-black px-5 py-3 text-[11px] uppercase tracking-[0.16em] text-white/45">
        Pré-visualização · /insights + /en/insights
      </div>

      <div className="bg-black text-white">
        <div className="px-6 pb-8 pt-10 md:px-10 md:pb-10 md:pt-12">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/45">
            {insight.category}
            <span className="ml-3 inline-block h-px w-10 translate-y-[-3px] bg-white/25" />
          </p>
          <h1 className="font-display mt-6 text-[clamp(1.75rem,4vw,2.75rem)] font-light leading-[1.08]">
            {insight.title}
          </h1>
          <p className="mt-4 text-[14px] text-white/50">
            {date}
            {insight.author ? ` · ${insight.author}` : ""}
          </p>
        </div>
        <div className="relative aspect-[21/9] w-full bg-[#111]">
          {image.startsWith("https://") ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </div>
      </div>

      <div className="bg-white px-6 py-10 md:px-10 md:py-12">
        <p className="label-caps text-black/35">
          ← {en ? "News" : "Notícias"}
        </p>
        <div className="mx-auto mt-8 max-w-[40rem]">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="mb-6 text-[1.02rem] leading-[1.75] text-black/65"
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export function fieldsFromArticle(article: NewsArticleRecord): DraftFields {
  return {
    title: article.title,
    summary: article.summary,
    body: article.body,
    category: article.category,
    locale: article.locale,
    slug: article.slug,
    sourceName: article.sourceName || "",
    imageUrl: article.imageUrl || "",
  };
}
