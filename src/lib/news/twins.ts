import { slugify } from "./sanitize";
import {
  getArticleById,
  listPublished,
  publishLocaleTwin,
} from "./store";
import {
  looksUntranslated,
  translateNewsFields,
} from "./translate";
import type { NewsArticleRecord } from "./types";
import type { Locale } from "@/types/content";

function pairKey(article: NewsArticleRecord): string {
  return article.pairId || article.id;
}

function findLocaleTwin(
  published: NewsArticleRecord[],
  source: NewsArticleRecord,
  locale: Locale,
): NewsArticleRecord | null {
  if (source.locale === locale) return source;
  const key = pairKey(source);
  return (
    published.find(
      (p) =>
        p.locale === locale &&
        p.status === "published" &&
        p.id !== source.id &&
        (pairKey(p) === key || p.pairId === source.id || source.pairId === p.id),
    ) ?? null
  );
}

async function fieldsForTwin(
  source: NewsArticleRecord,
  otherLocale: Locale,
  mode: "translate" | "copy",
) {
  const base = {
    title: source.title,
    summary: source.summary,
    body: source.body,
    category: source.category,
  };
  if (mode === "copy") return base;

  try {
    return await translateNewsFields(base, source.locale, otherLocale, {
      maxParagraphs: 16,
    });
  } catch {
    return base;
  }
}

/**
 * Create/refresh opposite-locale twin.
 * Slug stays aligned with the source so /insights/x ↔ /en/insights/x works.
 */
export async function ensureOppositeTwin(
  source: NewsArticleRecord,
  decidedBy: string,
  mode: "translate" | "copy" = "translate",
): Promise<NewsArticleRecord> {
  const otherLocale: Locale = source.locale === "pt" ? "en" : "pt";
  const fields = await fieldsForTwin(source, otherLocale, mode);

  return publishLocaleTwin({
    source,
    locale: otherLocale,
    title: fields.title,
    summary: fields.summary,
    body: fields.body,
    category: fields.category,
    // Keep language-switcher URLs stable across locales
    slug: source.slug || slugify(fields.title),
    decidedBy,
  });
}

/** Instant repair for missing twins (copy). */
export async function backfillMissingTwins(limit = 4): Promise<number> {
  const published = await listPublished(100);
  let created = 0;

  for (const source of published) {
    if (created >= limit) break;
    if (source.status !== "published") continue;

    const other: Locale = source.locale === "pt" ? "en" : "pt";
    if (findLocaleTwin(published, source, other)) continue;

    try {
      const twin = await ensureOppositeTwin(
        source,
        "system:twin-backfill",
        "copy",
      );
      published.push(twin);
      created += 1;
    } catch {
      // continue
    }
  }

  return created;
}

/**
 * Retranslate EN twins that are still Portuguese (failed/copy backfill).
 * Limit keeps public requests within serverless time budgets.
 */
export async function retranslateStaleTwins(limit = 2): Promise<number> {
  const published = await listPublished(100);
  const sources = published.filter((a) => a.locale === "pt" && a.status === "published");
  let fixed = 0;

  for (const source of sources) {
    if (fixed >= limit) break;
    const twin = findLocaleTwin(published, source, "en");
    if (!twin) continue;
    if (!looksUntranslated(source, twin)) continue;

    try {
      const fields = await translateNewsFields(
        {
          title: source.title,
          summary: source.summary,
          body: source.body,
          category: source.category,
        },
        "pt",
        "en",
        { maxParagraphs: 12 },
      );
      // If translation still identical, skip write
      if (fields.title.trim() === source.title.trim()) continue;

      const updated = await publishLocaleTwin({
        source,
        locale: "en",
        title: fields.title,
        summary: fields.summary,
        body: fields.body,
        category: fields.category,
        slug: twin.slug || source.slug,
        decidedBy: "system:retranslate",
      });
      // refresh in-memory list
      const idx = published.findIndex((p) => p.id === updated.id);
      if (idx >= 0) published[idx] = updated;
      fixed += 1;
    } catch {
      // continue
    }
  }

  return fixed;
}

export async function getPairTwin(
  articleId: string,
  locale: Locale,
): Promise<NewsArticleRecord | null> {
  const article = await getArticleById(articleId);
  if (!article) return null;
  if (article.locale === locale) return article;
  const published = await listPublished(100);
  return findLocaleTwin(published, article, locale);
}
