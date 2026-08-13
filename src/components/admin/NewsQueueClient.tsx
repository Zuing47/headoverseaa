"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { NewsArticleRecord, NewsQueuePayload } from "@/lib/news/types";

function ArticleRow({
  article,
  onDecide,
  busyId,
}: {
  article: NewsArticleRecord;
  onDecide?: (id: string, decision: "approve" | "reject") => void;
  busyId?: string | null;
}) {
  const pending = article.status === "pending" && onDecide;
  return (
    <article className="border-b border-black/10 py-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="label-caps text-black/40">
          {article.locale.toUpperCase()} · {article.category} · {article.status}
        </p>
        <p className="text-[12px] text-black/40">
          {new Date(article.createdAt).toLocaleString("pt-BR")}
        </p>
      </div>
      <h2 className="font-display mt-2 text-[1.35rem] leading-snug text-black">
        {article.title}
      </h2>
      <p className="mt-2 max-w-[70ch] text-[15px] leading-relaxed text-black/60">
        {article.summary}
      </p>
      {article.sourceUrl ? (
        <a
          href={article.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-[13px] text-black/50 underline underline-offset-2 hover:text-black"
        >
          Fonte{article.sourceName ? `: ${article.sourceName}` : ""}
        </a>
      ) : null}
      {pending ? (
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            disabled={busyId === article.id}
            onClick={() => onDecide(article.id, "approve")}
            className="bg-black px-4 py-2 text-[12px] font-medium uppercase tracking-[0.12em] text-white disabled:opacity-50"
          >
            Aprovar
          </button>
          <button
            type="button"
            disabled={busyId === article.id}
            onClick={() => onDecide(article.id, "reject")}
            className="border border-black/20 px-4 py-2 text-[12px] font-medium uppercase tracking-[0.12em] text-black disabled:opacity-50"
          >
            Recusar
          </button>
        </div>
      ) : null}
    </article>
  );
}

export function NewsQueueClient({ initial }: { initial: NewsQueuePayload }) {
  const router = useRouter();
  const [data, setData] = useState(initial);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [pendingRefresh, startRefresh] = useTransition();

  async function refresh() {
    setError(null);
    const res = await fetch("/api/news/admin/queue", {
      credentials: "same-origin",
      cache: "no-store",
    });
    if (res.status === 401) {
      router.replace("/admin/news/login");
      return;
    }
    const json = (await res.json()) as {
      ok?: boolean;
      error?: string;
      me?: string;
      pending?: NewsArticleRecord[];
      published?: NewsArticleRecord[];
      rejected?: NewsArticleRecord[];
    };
    if (!res.ok || !json.ok || !json.me) {
      setError(json.error || "Falha ao carregar fila");
      return;
    }
    setData({
      me: json.me,
      pending: json.pending ?? [],
      published: json.published ?? [],
      rejected: json.rejected ?? [],
    });
  }

  async function onDecide(id: string, decision: "approve" | "reject") {
    setBusyId(id);
    setError(null);
    try {
      const res = await fetch("/api/news/admin/decide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ id, decision }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setError(json.error || "Falha ao decidir");
        return;
      }
      await refresh();
      startRefresh(() => router.refresh());
    } catch {
      setError("Falha de rede");
    } finally {
      setBusyId(null);
    }
  }

  async function logout() {
    await fetch("/api/news/admin/logout", {
      method: "POST",
      credentials: "same-origin",
    });
    router.replace("/admin/news/login");
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-6">
        <div>
          <p className="label-caps text-black/40">Fila de notícias</p>
          <p className="mt-1 text-[14px] text-black/55">
            Logado como {data.me}
            {pendingRefresh ? " · atualizando…" : ""}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => void refresh()}
            className="border border-black/20 px-3 py-2 text-[12px] uppercase tracking-[0.12em]"
          >
            Atualizar
          </button>
          <button
            type="button"
            onClick={() => void logout()}
            className="border border-black/20 px-3 py-2 text-[12px] uppercase tracking-[0.12em]"
          >
            Sair
          </button>
        </div>
      </div>

      {error ? (
        <p className="mt-6 text-[14px] text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <section className="mt-8">
        <h2 className="font-display text-[1.75rem]">Pendentes</h2>
        <div className="mt-2">
          {data.pending.length === 0 ? (
            <p className="py-8 text-[15px] text-black/45">
              Nenhuma notícia aguardando aprovação.
            </p>
          ) : (
            data.pending.map((a) => (
              <ArticleRow
                key={a.id}
                article={a}
                onDecide={onDecide}
                busyId={busyId}
              />
            ))
          )}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-[1.5rem]">Publicadas recentemente</h2>
        <div className="mt-2">
          {data.published.map((a) => (
            <ArticleRow key={a.id} article={a} />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-[1.5rem]">Recusadas recentemente</h2>
        <div className="mt-2">
          {data.rejected.map((a) => (
            <ArticleRow key={a.id} article={a} />
          ))}
        </div>
      </section>
    </div>
  );
}
