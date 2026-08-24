import type { NewsQueuePayload } from "@/lib/news/types";
import { getNewsSession } from "@/lib/news/auth";
import {
  newsQueueReady,
  newsRedisConfigured,
  newsRedisDiagnostics,
} from "@/lib/news/config";
import { listByStatus, purgeStalePendingArticles } from "@/lib/news/store";
import { PENDING_NEWS_TTL_MS } from "@/lib/news/authors";

export type { NewsQueuePayload };

export async function loadNewsQueueForSession(): Promise<
  | { ok: true; data: NewsQueuePayload }
  | { ok: false; status: number; error: string; missing?: string[]; diagnostics?: string[] }
> {
  // Auth first — never leak Redis diagnostics to anonymous callers.
  const session = await getNewsSession();
  if (!session) {
    return { ok: false, status: 401, error: "unauthorized" };
  }

  const ready = newsQueueReady();
  if (!ready.ok || !newsRedisConfigured()) {
    return {
      ok: false,
      status: 503,
      error: "news_system_unconfigured",
      missing: ready.missing,
      diagnostics: newsRedisDiagnostics(),
    };
  }

  try {
    const purgedStale = await purgeStalePendingArticles(PENDING_NEWS_TTL_MS);
    const [pending, published, rejected] = await Promise.all([
      listByStatus("pending", 100),
      listByStatus("published", 100),
      listByStatus("rejected", 50),
    ]);
    return {
      ok: true,
      data: {
        me: session.email,
        pending,
        published,
        rejected,
        purgedStale,
      },
    };
  } catch {
    return {
      ok: false,
      status: 503,
      error: "store_error",
      diagnostics: [
        ...newsRedisDiagnostics(),
        "Falha ao falar com o Redis — confira URL/TOKEN e se o banco Upstash está ativo.",
      ],
    };
  }
}
