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

function publishTime(a: NewsArticleRecord): number {
  return Date.parse(a.publishedAt || a.createdAt || "") || 0;
}

/**
 * EN board mirrors PT ranking by matching the same slug across locales.
 * (Twins keep the source slug so /insights/x ↔ /en/insights/x.)
 */
function orderForLocale(
  locale: Locale,
  published: NewsArticleRecord[],
): NewsArticleRecord[] {
  const ptOrdered = published
    .filter((a) => a.locale === "pt" && a.status === "published")
    .sort((a, b) => publishTime(b) - publishTime(a));

  if (locale === "pt") return ptOrdered;

  const timeBySlug = new Map<string, number>();
  for (const p of ptOrdered) {
    if (p.slug) timeBySlug.set(p.slug, publishTime(p));
  }

  const enAll = published.filter(
    (a) => a.locale === "en" && a.status === "published",
  );

  return [...enAll].sort((a, b) => {
    const ta = timeBySlug.get(a.slug) ?? publishTime(a);
    const tb = timeBySlug.get(b.slug) ?? publishTime(b);
    if (tb !== ta) return tb - ta;
    // Prefer articles that have a PT twin (same slug)
    const al = timeBySlug.has(a.slug) ? 1 : 0;
    const bl = timeBySlug.has(b.slug) ? 1 : 0;
    return bl - al;
  });
}

async function repairTwinsBestEffort() {
  try {
    await Promise.race([
      (async () => {
        await backfillMissingTwins(3);
        await retranslateStaleTwins(1);
        await syncTwinListingMeta(10);
      })(),
      new Promise<void>((resolve) => {
        setTimeout(resolve, 4_000);
      }),
    ]);
  } catch {
    // listing must still work
  }
}

/** Public listing: newest published first (featured), then older static pieces. */
export async function getPublicInsights(locale: Locale): Promise<Insight[]> {
  const staticItems = getContent(locale).insights.items;
  if (!newsRedisConfigured()) return staticItems;

  try {
    await repairTwinsBestEffort();
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
