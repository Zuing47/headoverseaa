"use client";

import { getNewsAuthor } from "@/lib/news/authors";
import { draftInsightFromRecord } from "@/lib/news/map";
import { bodyToParagraphs, formatNewsDate } from "@/lib/news/sanitize";
import type { NewsArticleRecord } from "@/lib/news/types";

export type DraftFields = {
  title: string;
  summary: string;
  body: string;
  category: string;
  locale: "pt" | "en";
  slug: string;
  sourceName: string;
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
    sourceName: draft.sourceName || "Head Oversea",
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

  return (
    <div className="overflow-hidden border border-black/10 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.08)]">
      <div className="border-b border-black/10 bg-black/[0.03] px-5 py-3 text-[11px] uppercase tracking-[0.16em] text-black/45">
        Pré-visualização · estilo editorial
      </div>

      <div className="bg-white px-6 py-8 md:px-10 md:py-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c00]">
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
              className="h-10 w-10 rounded-full object-cover object-top ring-1 ring-black/10"
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
              {team
                ? `${en ? team.roleEn : team.rolePt} · ${date}`
                : date}
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
          {bodyParas.map((p, i) => (
            <p
              key={i}
              className="mb-5 text-[1.02rem] leading-[1.75] text-black/65"
            >
              {p}
            </p>
          ))}
          {!bodyParas.length ? (
            <p className="text-[14px] text-black/35">(corpo da notícia)</p>
          ) : null}
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
    authorId: article.authorId || "",
    imageUrl: article.imageUrl || "",
  };
}
