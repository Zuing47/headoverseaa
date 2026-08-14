import type { Insight, Locale } from "@/types/content";
import { getContent } from "@/lib/content";
import { newsRedisConfigured } from "./config";
import { recordToInsight } from "./map";
import { getArticleBySlug, listPublished } from "./store";
import {
  backfillMissingTwins,
  retranslateStaleTwins,
  syncTwinListingMeta,
} from "./twins";
import type { NewsArticleRecord } from "./types";

export { recordToInsight } from "./map";

function pairIdOf(a: NewsArticleRecord): string {
  return a.pairId || a.id;
}

function externalBase(ext: string | null | undefined): string | null {
  if (!ext) return null;
  return ext.replace(/:(pt|en)$/i, "");
}

function isPair(a: NewsArticleRecord, b: NewsArticleRecord): boolean {
  if (a.id === b.id) return false;
  if (pairIdOf(a) === pairIdOf(b) || a.pairId === b.id || b.pairId === a.id) {
    return true;
  }
  if (a.slug && b.slug && a.slug === b.slug) return true;
  const ea = externalBase(a.externalId);
  const eb = externalBase(b.externalId);
  if (ea && eb && ea === eb) return true;
  if (a.imageUrl && b.imageUrl && a.imageUrl === b.imageUrl) return true;
  if (a.createdAt && b.createdAt && a.createdAt === b.createdAt) return true;
  return false;
}

function publishTime(a: NewsArticleRecord): number {
  return Date.parse(a.publishedAt || a.createdAt || "") || 0;
}

/**
 * EN listing follows PT publish order so the same story is featured in both locales.
 */
function orderForLocale(
  locale: Locale,
  published: NewsArticleRecord[],
): NewsArticleRecord[] {
  const ptOrdered = published
    .filter((a) => a.locale === "pt" && a.status === "published")
    .sort((a, b) => publishTime(b) - publishTime(a));

  if (locale === "pt") return ptOrdered;

  const enAll = published.filter(
    (a) => a.locale === "en" && a.status === "published",
  );
  const used = new Set<string>();
  const ordered: NewsArticleRecord[] = [];

  for (const pt of ptOrdered) {
    const en = enAll.find((e) => !used.has(e.id) && isPair(pt, e));
    if (en) {
      ordered.push(en);
      used.add(en.id);
    }
  }

  const rest = enAll
    .filter((e) => !used.has(e.id))
    .sort((a, b) => publishTime(b) - publishTime(a));

  return [...ordered, ...rest];
}

/** Public listing: newest published first (featured), then older static pieces. */
export async function getPublicInsights(locale: Locale): Promise<Insight[]> {
  const staticItems = getContent(locale).insights.items;
  if (!newsRedisConfigured()) return staticItems;

  try {
    await backfillMissingTwins(4);
    await retranslateStaleTwins(2);
    await syncTwinListingMeta(20);

    const published = await listPublished(100);
    const dynamicRecords = orderForLocale(locale, published);
    const dynamic = dynamicRecords.map(recordToInsight);
    const seen = new Set(dynamic.map((i) => i.slug));
    const staticRest = staticItems.filter((i) => !seen.has(i.slug));
    return [...dynamic, ...staticRest];
  } catch {
    return staticItems;
  }
}

export async function getPublicInsightBySlug(
  locale: Locale,
  slug: string,
): Promise<Insight | null> {
  if (!newsRedisConfigured()) {
    return (
      getContent(locale).insights.items.find((a) => a.slug === slug) ?? null
    );
  }

  try {
    if (locale === "en") {
      await retranslateStaleTwins(1);
    }

    const article = await getArticleBySlug(locale, slug);
    if (article && article.status === "published" && article.locale === locale) {
      return recordToInsight(article);
    }
  } catch {
    // fall through to static
  }

  return getContent(locale).insights.items.find((a) => a.slug === slug) ?? null;
}
