import type { Insight, Locale } from "@/types/content";
import {
  bodyToParagraphs,
  formatNewsDate,
  sanitizeHttpsUrl,
} from "./sanitize";
import type { NewsArticleRecord } from "./types";

/** Resolve hero/list image: site path or sanitized https (approved editor content). */
export function resolveNewsImage(imageUrl: string | null | undefined): string | undefined {
  if (!imageUrl) return undefined;
  if (imageUrl.startsWith("/images/")) return imageUrl;
  return sanitizeHttpsUrl(imageUrl) ?? undefined;
}

export function recordToInsight(article: NewsArticleRecord): Insight {
  const href =
    article.locale === "en"
      ? `/en/insights/${article.slug}`
      : `/insights/${article.slug}`;
  const paragraphs = bodyToParagraphs(article.body);
  return {
    slug: article.slug,
    title: article.title,
    date: formatNewsDate(
      article.publishedAt || article.createdAt,
      article.locale,
    ),
    category: article.category || "News",
    href,
    image: resolveNewsImage(article.imageUrl),
    description: article.summary || paragraphs[0],
    body: paragraphs.length
      ? paragraphs
      : article.summary
        ? [article.summary]
        : [],
    author: article.sourceName || "Head Oversea",
  };
}

export function draftInsightFromRecord(
  article: Pick<
    NewsArticleRecord,
    | "locale"
    | "slug"
    | "title"
    | "summary"
    | "body"
    | "category"
    | "imageUrl"
    | "sourceName"
    | "createdAt"
    | "publishedAt"
  >,
): Insight {
  return recordToInsight({
    ...article,
    id: "preview",
    status: "pending",
    sourceUrl: null,
    pairId: null,
    externalId: null,
    updatedAt: article.createdAt,
    publishedAt: article.publishedAt,
    decidedBy: null,
    rejectReason: null,
  } as NewsArticleRecord);
}

export function previewHref(locale: Locale, slug: string) {
  return locale === "en" ? `/en/insights/${slug}` : `/insights/${slug}`;
}
