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

/** Site-faithful preview — G1-style editorial with team byline. */
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
  const lead = draft.summary || paragraphs[0];
  const bodyParas =
    lead && paragraphs[0] === lead ? paragraphs.slice(1) : paragraphs;
  const date = formatNewsDate(new Date().toISOString(), draft.locale);
  const en = draft.locale === "en";
  const team = getNewsAuthor(draft.authorId);
  const sourceLabel = draft.sourceName.trim();
  const showSource = Boolean(sourceLabel || draft.sourceUrl);

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E4E6EB] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
      <div className="border-b border-[#E4E6EB] bg-[#F7F8FA] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#65676B]">
        Pré-visualização · estilo editorial
      </div>

      <div className="bg-white px-6 py-8 md:px-10 md:py-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0a2540]">
          {insight.category}
        </p>
        <h1 className="font-display mt-3 text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium leading-[1.12] text-black">
          {insight.title}
        </h1>
        {lead ? (
          <p className="mt-4 text-[15px] font-medium leading-relaxed text-black/70">
            {lead}
          </p>
        ) : null}

        <div className="mt-5 flex items-center gap-3 border-y border-black/[0.08] py-3">
          {team?.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={team.photo}
              alt=""
              className="h-10 w-10 rounded-full object-cover object-top"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-[10px] font-semibold text-white">
              HO
            </div>
          )}
          <div>
            <p className="text-[13px] font-semibold text-black">
              {team?.name || insight.author || "Selecione o responsável"}
            </p>
            <p className="text-[11px] text-black/45">
              {team ? `${en ? team.roleEn : team.rolePt} · ${date}` : date}
            </p>
          </div>
        </div>

        <div className="relative mt-6 aspect-[16/10] w-full overflow-hidden bg-black/[0.04]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="mx-auto mt-8 max-w-[40rem]">
          <EditorialBody paragraphs={bodyParas.length ? bodyParas : ["(corpo da notícia)"]} />
        </div>

        {showSource ? (
          <div className="mt-8 flex items-center gap-3 rounded-2xl border border-black/[0.08] bg-[#f7f8fa] px-4 py-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white ring-1 ring-black/10">
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
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/40">
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
