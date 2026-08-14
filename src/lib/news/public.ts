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

function findPtSibling(
  article: NewsArticleRecord,
  all: NewsArticleRecord[],
): NewsArticleRecord | null {
  if (article.locale === "pt") return article;
  const pid = pairIdOf(article);
  const ext = externalBase(article.externalId);
  return (
    all.find((p) => {
      if (p.locale !== "pt" || p.status !== "published") return false;
      if (pairIdOf(p) === pid || p.id === article.pairId || p.pairId === article.id) {
        return true;
      }
      if (p.slug && article.slug && p.slug === article.slug) return true;
      const pExt = externalBase(p.externalId);
      if (ext && pExt && ext === pExt) return true;
      return false;
    }) ?? null
  );
}

/** Prefer the PT sibling's publish time so EN featured matches PT. */
function featuredSortKey(
  article: NewsArticleRecord,
  all: NewsArticleRecord[],
): number {
  const pt = findPtSibling(article, all);
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
