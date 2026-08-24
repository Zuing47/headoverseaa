import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { rateLimit } from "@/lib/form-guard";
import { assertSameOrigin, getNewsSession } from "@/lib/news/auth";
import { newsQueueReady, newsRedisConfigured } from "@/lib/news/config";
import { fetchOgImage, persistRemoteImage } from "@/lib/news/media";
import { getArticleById, updateArticle } from "@/lib/news/store";

export const runtime = "nodejs";
export const maxDuration = 25;

type Body = { id?: string };

/** Pull cover from article sourceUrl (og:image) and persist. */
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

  const limited = rateLimit(`news-fetch-cover:${session.email}`, 30, 60 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const id = String(body.id ?? "").trim();
  if (!/^[a-f0-9]{32}$/i.test(id)) {
    return NextResponse.json({ ok: false, error: "invalid_id" }, { status: 400 });
  }

  const existing = await getArticleById(id);
  if (!existing || existing.status === "rejected") {
    return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  }
  if (!existing.sourceUrl) {
    return NextResponse.json({ ok: false, error: "missing_source_url" }, { status: 400 });
  }

  try {
    const remote = await fetchOgImage(existing.sourceUrl);
    if (!remote) {
      return NextResponse.json({ ok: false, error: "cover_not_found" }, { status: 404 });
    }
    const hosted = (await persistRemoteImage(remote)) || remote;
    const article = await updateArticle(id, { imageUrl: hosted });
    if (!article) {
      return NextResponse.json({ ok: false, error: "not_found_or_locked" }, { status: 404 });
    }

    if (article.status === "published") {
      revalidatePath("/news");
      revalidatePath("/en/news");
      revalidatePath(`/news/${article.slug}`);
      revalidatePath(`/en/news/${article.slug}`);
    }

    return NextResponse.json({ ok: true, article, imageUrl: article.imageUrl });
  } catch {
    return NextResponse.json({ ok: false, error: "fetch_failed" }, { status: 502 });
  }
}
