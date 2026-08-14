import type { Insight, Locale } from "@/types/content";
import { getContent } from "@/lib/content";
import { newsRedisConfigured } from "./config";
import { recordToInsight } from "./map";
import { getArticleBySlug, listPublished } from "./store";
import { backfillMissingTwins, retranslateStaleTwins } from "./twins";
import type { NewsArticleRecord } from "./types";

export { recordToInsight } from "./map";

function publishedSortKey(a: NewsArticleRecord) {
  return Date.parse(a.publishedAt || a.updatedAt || a.createdAt) || 0;
}

/** Public listing: newest published first (featured), then older static pieces. */
export async function getPublicInsights(locale: Locale): Promise<Insight[]> {
  const staticItems = getContent(locale).insights.items;
  if (!newsRedisConfigured()) return staticItems;

  try {
    // Repair twins that failed during approve / were copy-only backfills.
    await backfillMissingTwins(4);
    await retranslateStaleTwins(2);

    const published = await listPublished(100);
    const dynamicRecords = published
      .filter((a) => a.locale === locale && a.status === "published")
      .sort((a, b) => publishedSortKey(b) - publishedSortKey(a));

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
  const staticItem = getContent(locale).insights.items.find(
    (a) => a.slug === slug,
  );
  if (staticItem) return staticItem;
  if (!newsRedisConfigured()) return null;

  try {
    // If opening an EN article that is still PT text, fix it before render.
    if (locale === "en") {
      await retranslateStaleTwins(1);
    }

    const article = await getArticleBySlug(locale, slug);
    if (!article || article.status !== "published") return null;
    if (article.locale !== locale) return null;
    return recordToInsight(article);
  } catch {
    return null;
  }
}
