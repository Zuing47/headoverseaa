"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import type { NewsArticleRecord, NewsQueuePayload } from "@/lib/news/types";
import {
  fieldsFromArticle,
  NewsSitePreview,
} from "@/components/admin/NewsSitePreview";

type DraftFields = ReturnType<typeof fieldsFromArticle>;
type Tab = "edit" | "preview";

function StatusChip({ status }: { status: string }) {
  const tone =
    status === "pending"
      ? "bg-amber-50 text-amber-900"
      : status === "published"
        ? "bg-emerald-50 text-emerald-900"
        : "bg-black/5 text-black/50";
  return (
    <span
      className={`rounded px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] ${tone}`}
    >
      {status}
    </span>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="label-caps text-black/40">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

const inputClass =
  "w-full border border-black/15 bg-white px-3 py-2.5 text-[14px] text-black outline-none transition-colors focus:border-black";

export function NewsQueueClient({ initial }: { initial: NewsQueuePayload }) {
  const router = useRouter();
  const [data, setData] = useState(initial);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [pendingRefresh, startRefresh] = useTransition();
  const [selectedId, setSelectedId] = useState<string | null>(
    initial.pending[0]?.id ?? null,
  );
  const [tab, setTab] = useState<Tab>("edit");
  const [draft, setDraft] = useState<DraftFields | null>(
    initial.pending[0] ? fieldsFromArticle(initial.pending[0]) : null,
  );
  const [dirty, setDirty] = useState(false);

  const selected = useMemo(() => {
    if (selectedId) {
      const found = data.pending.find((a) => a.id === selectedId);
      if (found) return found;
    }
    return data.pending[0] ?? null;
  }, [data.pending, selectedId]);

  const editorDraft =
    selected && draft && selected.id === (selectedId ?? selected.id)
      ? draft
      : selected
        ? fieldsFromArticle(selected)
        : null;

  function selectArticle(article: NewsArticleRecord) {
    if (
      dirty &&
      selected &&
      article.id !== selected.id &&
      !window.confirm("Descartar alterações não salvas?")
    ) {
      return;
    }
    setSelectedId(article.id);
    setDraft(fieldsFromArticle(article));
    setDirty(false);
    setTab("edit");
    setError(null);
    setNotice(null);
  }

  function patchDraft<K extends keyof DraftFields>(
    key: K,
    value: DraftFields[K],
  ) {
    const base =
      editorDraft ?? (selected ? fieldsFromArticle(selected) : null);
    if (!base || !selected) return;
    if (!selectedId) setSelectedId(selected.id);
    setDraft({ ...base, [key]: value });
    setDirty(true);
  }

  async function refresh(preferId?: string | null) {
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
    const pending = json.pending ?? [];
    setData({
      me: json.me,
      pending,
      published: json.published ?? [],
      rejected: json.rejected ?? [],
    });

    const keepId = preferId === undefined ? selectedId : preferId;
    const still = keepId ? pending.find((a) => a.id === keepId) : null;
    const next = still ?? pending[0] ?? null;
    setSelectedId(next?.id ?? null);
    setDraft(next ? fieldsFromArticle(next) : null);
    setDirty(false);
  }

  async function saveDraft() {
    if (!selected || !editorDraft) return;
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      const res = await fetch("/api/news/admin/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          id: selected.id,
          title: editorDraft.title,
          summary: editorDraft.summary,
          body: editorDraft.body,
          category: editorDraft.category,
          locale: editorDraft.locale,
          slug: editorDraft.slug,
          sourceName: editorDraft.sourceName,
          sourceUrl: selected.sourceUrl ?? "",
          imageUrl: editorDraft.imageUrl,
        }),
      });
      const json = (await res.json()) as {
        ok?: boolean;
        error?: string;
        article?: NewsArticleRecord;
      };
      if (!res.ok || !json.ok || !json.article) {
        setError(json.error || "Falha ao salvar");
        return;
      }
      setNotice("Alterações salvas.");
      await refresh(json.article.id);
      startRefresh(() => router.refresh());
    } catch {
      setError("Falha de rede ao salvar");
    } finally {
      setBusy(false);
    }
  }

  async function onDecide(decision: "approve" | "reject") {
    if (!selected) return;
    if (dirty) {
      setError("Salve as alterações antes de aprovar ou recusar.");
      setTab("edit");
      return;
    }
    if (
      decision === "approve" &&
      !window.confirm("Aprovar e publicar esta notícia em /insights agora?")
    ) {
      return;
    }
    if (
      decision === "reject" &&
      !window.confirm("Recusar esta notícia? Ela não será publicada.")
    ) {
      return;
    }

    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      const res = await fetch("/api/news/admin/decide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ id: selected.id, decision }),
      });
      const json = (await res.json()) as {
        ok?: boolean;
        error?: string;
        href?: string;
      };
      if (!res.ok || !json.ok) {
        setError(json.error || "Falha ao decidir");
        return;
      }
      setNotice(
        decision === "approve"
          ? `Publicada${json.href ? ` · ${json.href}` : ""}. Já aparece em Notícias.`
          : "Recusada.",
      );
      await refresh(null);
      startRefresh(() => router.refresh());
    } catch {
      setError("Falha de rede");
    } finally {
      setBusy(false);
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
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-black/10 pb-6">
        <div>
          <p className="label-caps text-black/40">Editorial</p>
          <h1 className="font-display mt-2 text-[clamp(1.75rem,3vw,2.5rem)] font-light">
            Fila de notícias
          </h1>
          <p className="mt-1 text-[14px] text-black/55">
            {data.me}
            {pendingRefresh ? " · sincronizando…" : ""}
            {dirty ? " · alterações não salvas" : ""}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => void refresh(selectedId)}
            className="border border-black/20 px-3 py-2 text-[11px] uppercase tracking-[0.14em]"
          >
            Atualizar
          </button>
          <button
            type="button"
            onClick={() => void logout()}
            className="border border-black/20 px-3 py-2 text-[11px] uppercase tracking-[0.14em]"
          >
            Sair
          </button>
        </div>
      </div>

      {error ? (
        <p className="mt-5 text-[14px] text-red-700" role="alert">
          {error}
        </p>
      ) : null}
      {notice ? (
        <p className="mt-5 text-[14px] text-emerald-800" role="status">
          {notice}
        </p>
      ) : null}

      <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-10">
        <aside className="lg:col-span-4">
          <p className="label-caps text-black/40">
            Pendentes ({data.pending.length})
          </p>
          <div className="mt-4 divide-y divide-black/10 border-y border-black/10">
            {data.pending.length === 0 ? (
              <p className="py-8 text-[14px] text-black/45">
                Nenhuma notícia na fila.
              </p>
            ) : (
              data.pending.map((a) => {
                const active = a.id === (selected?.id ?? "");
                return (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => selectArticle(a)}
                    className={`block w-full px-0 py-4 text-left transition-colors ${
                      active ? "bg-black/[0.03]" : "hover:bg-black/[0.02]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 px-2">
                      <StatusChip status={a.status} />
                      <span className="text-[11px] text-black/35">
                        {new Date(a.createdAt).toLocaleString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="font-display mt-2 px-2 text-[1.05rem] leading-snug text-black">
                      {a.title}
                    </p>
                    <p className="mt-1 line-clamp-2 px-2 text-[13px] text-black/45">
                      {a.summary}
                    </p>
                  </button>
                );
              })
            )}
          </div>

          <div className="mt-10">
            <p className="label-caps text-black/40">
              Publicadas ({data.published.length})
            </p>
            <ul className="mt-3 space-y-3">
              {data.published.slice(0, 6).map((a) => (
                <li key={a.id} className="text-[13px] text-black/55">
                  <a
                    href={
                      a.locale === "en"
                        ? `/en/insights/${a.slug}`
                        : `/insights/${a.slug}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-2 hover:text-black hover:underline"
                  >
                    {a.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <section className="lg:col-span-8">
          {!selected || !editorDraft ? (
            <div className="border border-dashed border-black/15 px-6 py-16 text-center text-[14px] text-black/45">
              Selecione uma notícia pendente para editar e pré-visualizar.
            </div>
          ) : (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 pb-4">
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setTab("edit")}
                    className={`px-3 py-2 text-[11px] uppercase tracking-[0.14em] ${
                      tab === "edit"
                        ? "bg-black text-white"
                        : "border border-black/15 text-black/60"
                    }`}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => setTab("preview")}
                    className={`px-3 py-2 text-[11px] uppercase tracking-[0.14em] ${
                      tab === "preview"
                        ? "bg-black text-white"
                        : "border border-black/15 text-black/60"
                    }`}
                  >
                    Pré-visualizar
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={busy || !dirty}
                    onClick={() => void saveDraft()}
                    className="border border-black/20 px-3 py-2 text-[11px] uppercase tracking-[0.14em] disabled:opacity-40"
                  >
                    Salvar
                  </button>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void onDecide("reject")}
                    className="border border-black/20 px-3 py-2 text-[11px] uppercase tracking-[0.14em] disabled:opacity-40"
                  >
                    Recusar
                  </button>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void onDecide("approve")}
                    className="bg-black px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-white disabled:opacity-40"
                  >
                    Aprovar e publicar
                  </button>
                </div>
              </div>

              {tab === "edit" ? (
                <div className="mt-6 space-y-5">
                  <Field label="Título">
                    <input
                      className={inputClass}
                      value={editorDraft.title}
                      onChange={(e) => patchDraft("title", e.target.value)}
                    />
                  </Field>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Categoria">
                      <input
                        className={inputClass}
                        value={editorDraft.category}
                        onChange={(e) => patchDraft("category", e.target.value)}
                      />
                    </Field>
                    <Field label="Idioma">
                      <select
                        className={inputClass}
                        value={editorDraft.locale}
                        onChange={(e) =>
                          patchDraft(
                            "locale",
                            e.target.value === "en" ? "en" : "pt",
                          )
                        }
                      >
                        <option value="pt">Português (/insights)</option>
                        <option value="en">English (/en/insights)</option>
                      </select>
                    </Field>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Slug (URL)">
                      <input
                        className={inputClass}
                        value={editorDraft.slug}
                        onChange={(e) => patchDraft("slug", e.target.value)}
                      />
                    </Field>
                    <Field label="Autor / fonte">
                      <input
                        className={inputClass}
                        value={editorDraft.sourceName}
                        onChange={(e) =>
                          patchDraft("sourceName", e.target.value)
                        }
                      />
                    </Field>
                  </div>
                  <Field label="Resumo">
                    <textarea
                      className={`${inputClass} min-h-[88px] resize-y`}
                      value={editorDraft.summary}
                      onChange={(e) => patchDraft("summary", e.target.value)}
                    />
                  </Field>
                  <Field label="Corpo (parágrafos separados por linha em branco)">
                    <textarea
                      className={`${inputClass} min-h-[240px] resize-y font-sans leading-relaxed`}
                      value={editorDraft.body}
                      onChange={(e) => patchDraft("body", e.target.value)}
                    />
                  </Field>
                  <Field label="URL da imagem (https://… ou /images/…)">
                    <input
                      className={inputClass}
                      value={editorDraft.imageUrl}
                      placeholder="https://… ou /images/sua-foto.jpg"
                      onChange={(e) => patchDraft("imageUrl", e.target.value)}
                    />
                  </Field>
                  {selected.sourceUrl ? (
                    <p className="text-[13px] text-black/45">
                      Fonte original:{" "}
                      <a
                        href={selected.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2"
                      >
                        {selected.sourceUrl}
                      </a>
                    </p>
                  ) : null}
                </div>
              ) : (
                <div className="mt-6">
                  <NewsSitePreview draft={editorDraft} />
                  <p className="mt-4 text-[13px] text-black/45">
                    Composição do site (hero preto + corpo editorial). Ao
                    aprovar, entra na aba Notícias após o publish.
                  </p>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
