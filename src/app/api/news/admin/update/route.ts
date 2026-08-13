import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/form-guard";
import { assertSameOrigin, getNewsSession } from "@/lib/news/auth";
import { newsQueueReady, newsRedisConfigured } from "@/lib/news/config";
import {
  NEWS_FIELD_MAX,
  parseLocale,
  sanitizeHttpsUrl,
  slugify,
  stripToPlainText,
} from "@/lib/news/sanitize";
import { updatePendingArticle } from "@/lib/news/store";

export const runtime = "nodejs";

type UpdateBody = {
  id?: string;
  title?: string;
  summary?: string;
  body?: string;
  category?: string;
  locale?: string;
  slug?: string;
  sourceName?: string;
  sourceUrl?: string;
  imageUrl?: string;
};

/** Edit a pending article before approve/reject. */
export async function POST(request: Request) {
  const ready = newsQueueReady();
  if (!ready.ok || !newsRedisConfigured()) {
    return NextResponse.json(
      { ok: false, error: "news_system_unconfigured", missing: ready.missing },
      { status: 503 },
    );
  }

  if (!assertSameOrigin(request)) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  const session = await getNewsSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const limited = rateLimit(`news-update:${session.email}`, 120, 60 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: UpdateBody;
  try {
    const text = await request.text();
    if (text.length > 120_000) {
      return NextResponse.json({ ok: false, error: "payload_too_large" }, { status: 413 });
    }
    body = JSON.parse(text) as UpdateBody;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const id = String(body.id ?? "").trim();
  if (!/^[a-f0-9]{32}$/i.test(id)) {
    return NextResponse.json({ ok: false, error: "invalid_id" }, { status: 400 });
  }

  const title = stripToPlainText(body.title, NEWS_FIELD_MAX.title);
  if (title.length < 8) {
    return NextResponse.json({ ok: false, error: "invalid_title" }, { status: 400 });
  }

  const summary = stripToPlainText(body.summary, NEWS_FIELD_MAX.summary);
  const articleBody = stripToPlainText(body.body, NEWS_FIELD_MAX.body);
  if (articleBody.length < 20) {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const category =
    stripToPlainText(body.category, NEWS_FIELD_MAX.category) || "News";
  const locale = parseLocale(body.locale);
  const slug = body.slug ? slugify(String(body.slug)) : slugify(title);
  const sourceName =
    stripToPlainText(body.sourceName, NEWS_FIELD_MAX.sourceName) || null;

  let sourceUrl: string | null = null;
  if (body.sourceUrl !== undefined) {
    const raw = String(body.sourceUrl ?? "").trim();
    sourceUrl = raw ? sanitizeHttpsUrl(raw) : null;
    if (raw && !sourceUrl) {
      return NextResponse.json({ ok: false, error: "invalid_source_url" }, { status: 400 });
    }
  }

  let imageUrl: string | null = null;
  if (body.imageUrl !== undefined) {
    const raw = String(body.imageUrl ?? "").trim();
    if (!raw) {
      imageUrl = null;
    } else if (raw.startsWith("/images/")) {
      imageUrl = raw.slice(0, NEWS_FIELD_MAX.url);
    } else {
      imageUrl = sanitizeHttpsUrl(raw);
      if (!imageUrl) {
        return NextResponse.json({ ok: false, error: "invalid_image_url" }, { status: 400 });
      }
    }
  }

  try {
    const article = await updatePendingArticle(id, {
      title,
      summary: summary || articleBody.slice(0, 280),
      body: articleBody,
      category,
      locale,
      slug,
      sourceName,
      ...(body.sourceUrl !== undefined ? { sourceUrl } : {}),
      ...(body.imageUrl !== undefined ? { imageUrl } : {}),
    });
    if (!article) {
      return NextResponse.json({ ok: false, error: "not_found_or_not_pending" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, article });
  } catch {
    return NextResponse.json({ ok: false, error: "store_error" }, { status: 503 });
  }
}
