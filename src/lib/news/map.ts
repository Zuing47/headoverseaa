import type { Insight, Locale } from "@/types/content";
import { authorRole, getNewsAuthor } from "./authors";
import {
  bodyToParagraphs,
  formatNewsDate,
  sanitizeHttpsUrl,
} from "./sanitize";
import { isNewsMediaPath } from "./media-path";
import type { NewsArticleRecord } from "./types";

/** Resolve hero/list image: site path, hosted media, or sanitized https. */
export function resolveNewsImage(imageUrl: string | null | undefined): string | undefined {
  if (!imageUrl) return undefined;
  if (imageUrl.startsWith("/images/")) return imageUrl;
  if (isNewsMediaPath(imageUrl)) return imageUrl;
  return sanitizeHttpsUrl(imageUrl) ?? undefined;
}

export function recordToInsight(article: NewsArticleRecord): Insight {
  const href =
    article.locale === "en"
      ? `/en/insights/${article.slug}`
      : `/insights/${article.slug}`;
  const paragraphs = bodyToParagraphs(article.body);
  const team = getNewsAuthor(article.authorId);
  const authorName =
    team?.name || article.sourceName?.trim() || "Head Oversea";

  return {
    slug: article.slug,
    title: article.title,
    date: formatNewsDate(
      article.publishedAt || article.createdAt,
      article.locale,
    ),
    dateIso: article.publishedAt || article.createdAt || undefined,
    category: article.category || "News",
    href,
    image: resolveNewsImage(article.imageUrl),
    description: article.summary || paragraphs[0],
    body: paragraphs.length
      ? paragraphs
      : article.summary
        ? [article.summary]
        : [],
    author: authorName,
    authorId: team?.id,
    authorPhoto: team?.photo,
    authorRole: team ? authorRole(team, article.locale) : undefined,
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
    | "authorId"
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
    authorId: article.authorId ?? null,
    updatedAt: article.createdAt,
    publishedAt: article.publishedAt,
    decidedBy: null,
    rejectReason: null,
    linkedinPostedAt: null,
  } as NewsArticleRecord);
}

export function previewHref(locale: Locale, slug: string) {
  return locale === "en" ? `/en/insights/${slug}` : `/insights/${slug}`;
}
