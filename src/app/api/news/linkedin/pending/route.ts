import { NextResponse } from "next/server";
import { clientIp, rateLimit } from "@/lib/form-guard";
import { ingestAuthorized } from "@/lib/news/auth";
import { newsIngestKey, newsIngestReady, newsRedisConfigured } from "@/lib/news/config";
import { listPublishedForLinkedIn } from "@/lib/news/store";
import { parseLocale } from "@/lib/news/sanitize";
import { absoluteUrl, getPublicSiteUrl } from "@/lib/site";
import { previewHref } from "@/lib/news/map";

export const runtime = "nodejs";

/**
 * n8n — approved (published) articles not yet posted to LinkedIn.
 * Auth: Authorization: Bearer $NEWS_INGEST_API_KEY
 *
 * GET /api/news/linkedin/pending?locale=pt&limit=10
 */
export async function GET(request: Request) {
  const ready = newsIngestReady();
  if (!ready.ok || !newsRedisConfigured()) {
    return NextResponse.json(
      { ok: false, error: "news_system_unconfigured", missing: ready.missing },
      { status: 503 },
    );
  }

  const ingestKey = newsIngestKey();
  if (!ingestKey || !ingestAuthorized(request, ingestKey)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const ip = clientIp(request);
  const limited = rateLimit(`news-li-pending:${ip}`, 60, 60 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const { searchParams } = new URL(request.url);
  const locale = parseLocale(searchParams.get("locale") || "pt");
  const limitRaw = Number(searchParams.get("limit") || "10");
  const limit = Number.isFinite(limitRaw)
    ? Math.min(Math.max(Math.floor(limitRaw), 1), 50)
    : 10;

  const origin = getPublicSiteUrl();
  const articles = await listPublishedForLinkedIn({ locale, limit });

  return NextResponse.json({
    ok: true,
    count: articles.length,
    items: articles.map((a) => {
      const path = previewHref(a.locale, a.slug);
      return {
        id: a.id,
        locale: a.locale,
        slug: a.slug,
        title: a.title,
        summary: a.summary,
        body: a.body,
        category: a.category,
        imageUrl: a.imageUrl
          ? a.imageUrl.startsWith("http")
            ? a.imageUrl
            : absoluteUrl(a.imageUrl, origin)
          : null,
        sourceUrl: a.sourceUrl,
        sourceName: a.sourceName,
        publishedAt: a.publishedAt,
        path,
        url: absoluteUrl(path, origin),
      };
    }),
  });
}
