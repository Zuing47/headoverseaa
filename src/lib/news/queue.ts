import type { NewsArticleRecord, NewsQueuePayload } from "@/lib/news/types";
import { getNewsSession } from "@/lib/news/auth";
import { newsRedisConfigured, newsSystemReady } from "@/lib/news/config";
import { listByStatus } from "@/lib/news/store";

export type { NewsQueuePayload };

export async function loadNewsQueueForSession(): Promise<
  | { ok: true; data: NewsQueuePayload }
  | { ok: false; status: number; error: string }
> {
  const ready = newsSystemReady();
  if (!ready.ok || !newsRedisConfigured()) {
    return { ok: false, status: 503, error: "news_system_unconfigured" };
  }

  const session = await getNewsSession();
  if (!session) {
    return { ok: false, status: 401, error: "unauthorized" };
  }

  try {
    const [pending, published, rejected] = await Promise.all([
      listByStatus("pending", 80),
      listByStatus("published", 20),
      listByStatus("rejected", 20),
    ]);
    return {
      ok: true,
      data: {
        me: session.email,
        pending,
        published,
        rejected,
      },
    };
  } catch {
    return { ok: false, status: 503, error: "store_error" };
  }
}
