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

/** Prefer the PT sibling's publish time so EN featured matches PT. */
function featuredSortKey(
  article: NewsArticleRecord,
  all: NewsArticleRecord[],
): number {
  const pid = pairIdOf(article);
  const pt =
    article.locale === "pt"
      ? article
      : all.find(
          (p) =>
            p.locale === "pt" &&
            p.status === "published" &&
            (pairIdOf(p) === pid ||
              p.id === article.pairId ||
              p.pairId === article.id),
        );
  const iso =
    pt?.publishedAt || pt?.createdAt || article.publishedAt || article.createdAt;
  return Date.parse(iso || "") || 0;
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
    const dynamicRecords = published
      .filter((a) => a.locale === locale && a.status === "published")
      .sort(
        (a, b) => featuredSortKey(b, published) - featuredSortKey(a, published),
      );

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
