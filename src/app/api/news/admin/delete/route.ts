import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { rateLimit } from "@/lib/form-guard";
import { assertSameOrigin, getNewsSession } from "@/lib/news/auth";
import { newsQueueReady, newsRedisConfigured } from "@/lib/news/config";
import { deleteArticle } from "@/lib/news/store";

export const runtime = "nodejs";

type DeleteBody = {
  id?: string;
};

/** Permanently delete a managed news article. */
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

  const limited = rateLimit(`news-delete:${session.email}`, 40, 60 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: DeleteBody;
  try {
    const text = await request.text();
    if (text.length > 2_000) {
      return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 });
    }
    body = JSON.parse(text) as DeleteBody;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const id = String(body.id ?? "").trim();
  if (!/^[a-f0-9]{32}$/i.test(id)) {
    return NextResponse.json({ ok: false, error: "invalid_id" }, { status: 400 });
  }

  try {
    const article = await deleteArticle(id);
    if (!article) {
      return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
    }

    if (article.status === "published") {
      revalidatePath("/insights");
      revalidatePath("/en/insights");
      revalidatePath(`/insights/${article.slug}`);
      revalidatePath(`/en/insights/${article.slug}`);
      revalidatePath("/");
      revalidatePath("/pt");
    }

    return NextResponse.json({
      ok: true,
      id: article.id,
      deleted: true,
      wasStatus: article.status,
    });
  } catch {
    return NextResponse.json({ ok: false, error: "store_error" }, { status: 503 });
  }
}
