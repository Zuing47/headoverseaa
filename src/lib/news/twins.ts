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

function externalBase(ext: string | null | undefined): string | null {
  if (!ext) return null;
  return ext.replace(/:(pt|en)$/i, "");
}

function isLocalePair(a: NewsArticleRecord, b: NewsArticleRecord): boolean {
  if (a.id === b.id || a.locale === b.locale) return false;
  if (
    pairKey(a) === pairKey(b) ||
    a.pairId === b.id ||
    b.pairId === a.id
  ) {
    return true;
  }
  if (a.slug && b.slug && a.slug === b.slug) return true;
  const ea = externalBase(a.externalId);
  const eb = externalBase(b.externalId);
  if (ea && eb && ea === eb) return true;
  return false;
}

function findLocaleTwin(
  published: NewsArticleRecord[],
  source: NewsArticleRecord,
  locale: Locale,
): NewsArticleRecord | null {
  if (source.locale === locale) return source;
  return (
    published.find(
      (p) =>
        p.locale === locale &&
        p.status === "published" &&
        isLocalePair(source, p),
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
 * Slug stays aligned with the source so /news/x ↔ /en/news/x works.
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
      const idx = published.findIndex((p) => p.id === updated.id);
      if (idx >= 0) published[idx] = updated;
      fixed += 1;
    } catch {
      // continue
    }
  }

  return fixed;
}

/**
 * Align EN twin publishedAt + cover with PT source so featured order matches.
 */
export async function syncTwinListingMeta(limit = 20): Promise<number> {
  const published = await listPublished(100);
  let fixed = 0;

  for (const source of published) {
    if (fixed >= limit) break;
    if (source.locale !== "pt" || source.status !== "published") continue;
    const twin = findLocaleTwin(published, source, "en");
    if (!twin) continue;

    const sameDate = (twin.publishedAt || "") === (source.publishedAt || "");
    const sameImage = (twin.imageUrl || "") === (source.imageUrl || "");
    if (sameDate && sameImage) continue;

    try {
      const updated = await publishLocaleTwin({
        source,
        locale: "en",
        title: twin.title,
        summary: twin.summary,
        body: twin.body,
        category: twin.category,
        slug: twin.slug || source.slug,
        decidedBy: twin.decidedBy || "system:sync-meta",
      });
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
