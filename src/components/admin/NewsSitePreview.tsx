"use client";

import { getNewsAuthor } from "@/lib/news/authors";
import { draftInsightFromRecord } from "@/lib/news/map";
import { bodyToParagraphs, formatNewsDate } from "@/lib/news/sanitize";
import { EditorialBody } from "@/components/pages/EditorialBody";
import type { NewsArticleRecord } from "@/lib/news/types";

export type DraftFields = {
  title: string;
  summary: string;
  body: string;
  category: string;
  locale: "pt" | "en";
  slug: string;
  sourceName: string;
  sourceUrl: string;
  sourceLogoUrl: string;
  authorId: string;
  imageUrl: string;
};

/** Preview — same editorial rhythm as the public article page. */
export function NewsSitePreview({ draft }: { draft: DraftFields }) {
  const insight = draftInsightFromRecord({
    locale: draft.locale,
    slug: draft.slug || "preview",
    title: draft.title || "Título",
    summary: draft.summary,
    body: draft.body,
    category: draft.category || "News",
    imageUrl: draft.imageUrl || null,
    sourceName: draft.sourceName || null,
    sourceUrl: draft.sourceUrl || null,
    sourceLogoUrl: draft.sourceLogoUrl || null,
    authorId: draft.authorId || null,
    createdAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
  });

  const image = insight.image || "/images/15958319-btc-5019625.jpg";
  const paragraphs = bodyToParagraphs(draft.body).length
    ? bodyToParagraphs(draft.body)
    : draft.summary
      ? [draft.summary]
      : ["(corpo da notícia)"];
  const date = formatNewsDate(new Date().toISOString(), draft.locale);
  const en = draft.locale === "en";
  const team = getNewsAuthor(draft.authorId);
  const sourceLabel = draft.sourceName.trim();
  const showSource = Boolean(sourceLabel || draft.sourceUrl);

  return (
    <div className="overflow-hidden border border-[#E4E6EB] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
      <div className="border-b border-[#E4E6EB] bg-[#F7F8FA] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#65676B]">
        Pré-visualização · página pública
      </div>

      <div className="mx-auto max-w-[42rem] bg-white px-6 py-8 md:px-10 md:py-10">
        <p className="text-[13px] font-semibold text-[#0a2540]">
          {insight.category}
        </p>
        <h1 className="mt-3 text-[clamp(1.5rem,3.2vw,2.2rem)] font-bold leading-[1.18] tracking-[-0.02em] text-black">
          {insight.title}
        </h1>
        {draft.summary ? (
          <p className="mt-4 text-[1.02rem] leading-[1.55] text-[#5c5c5c]">
            {draft.summary}
          </p>
        ) : null}

        <div className="mt-5 flex items-center gap-3 text-[13px] text-[#666]">
          {team?.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={team.photo}
              alt=""
              className="h-9 w-9 rounded-full object-cover object-top"
            />
          ) : null}
          <div>
            <p>
              <span className="text-black/45">{en ? "By" : "Por"} </span>
              <span className="font-semibold text-black">
                {team?.name || insight.author || "Selecione o responsável"}
              </span>
            </p>
            <p className="text-[12px] text-black/40">{date}</p>
          </div>
        </div>

        <figure className="mt-6">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/[0.04]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </figure>

        <EditorialBody paragraphs={paragraphs} className="mt-8" />

        {showSource ? (
          <div className="mt-8 flex items-center gap-3 border border-black/[0.08] bg-[#fafafa] px-4 py-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white ring-1 ring-black/10">
              {draft.sourceLogoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={draft.sourceLogoUrl}
                  alt=""
                  className="h-full w-full object-contain p-1"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="text-[10px] font-bold text-black/35">
                  {(sourceLabel || "SR").slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-black/40">
                {en ? "Source" : "Fonte"}
              </p>
              <p className="truncate text-[14px] font-semibold">
                {sourceLabel || draft.sourceUrl}
              </p>
            </div>
          </div>
        ) : null}
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
    sourceUrl: article.sourceUrl || "",
    sourceLogoUrl: article.sourceLogoUrl || "",
    authorId: article.authorId || "",
    imageUrl: article.imageUrl || "",
  };
}
