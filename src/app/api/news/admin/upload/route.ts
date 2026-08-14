import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/form-guard";
import { assertSameOrigin, getNewsSession } from "@/lib/news/auth";
import { newsQueueReady, newsRedisConfigured } from "@/lib/news/config";
import { putNewsMedia } from "@/lib/news/media";

export const runtime = "nodejs";
export const maxDuration = 20;

const MAX_UPLOAD = 1_800_000;

/** Marketing cover upload — multipart field `file`. */
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

  const limited = rateLimit(`news-upload:${session.email}`, 40, 60 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("multipart/form-data")) {
    return NextResponse.json({ ok: false, error: "invalid_content_type" }, { status: 415 });
  }

  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ ok: false, error: "missing_file" }, { status: 400 });
    }
    if (file.size <= 0 || file.size > MAX_UPLOAD) {
      return NextResponse.json({ ok: false, error: "invalid_image_size" }, { status: 400 });
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const stored = await putNewsMedia({
      bytes,
      contentType: file.type || "image/jpeg",
      sourceUrl: null,
    });

    return NextResponse.json({
      ok: true,
      imageUrl: stored.path,
      id: stored.id,
    });
  } catch {
    return NextResponse.json({ ok: false, error: "upload_failed" }, { status: 400 });
  }
}
