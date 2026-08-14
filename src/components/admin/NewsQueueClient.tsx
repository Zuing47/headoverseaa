"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import type { NewsArticleRecord, NewsQueuePayload } from "@/lib/news/types";
import {
  fieldsFromArticle,
  NewsSitePreview,
} from "@/components/admin/NewsSitePreview";

type DraftFields = ReturnType<typeof fieldsFromArticle>;
type EditorTab = "edit" | "preview";
type Filter = "all" | "pending" | "published" | "rejected";

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

function articleHref(a: NewsArticleRecord) {
  return a.locale === "en"
    ? `/en/insights/${a.slug}`
    : `/insights/${a.slug}`;
}

function matchesQuery(a: NewsArticleRecord, q: string) {
  if (!q) return true;
  const hay = [
    a.title,
    a.summary,
    a.category,
    a.slug,
    a.sourceName ?? "",
    a.body,
  ]
    .join(" ")
    .toLowerCase();
  return hay.includes(q);
}

export function NewsQueueClient({ initial }: { initial: NewsQueuePayload }) {
  const router = useRouter();
  const [data, setData] = useState(initial);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [pendingRefresh, startRefresh] = useTransition();
  const [filter, setFilter] = useState<Filter>("pending");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(
    initial.pending[0]?.id ??
      initial.published[0]?.id ??
      null,
  );
  const [editorTab, setEditorTab] = useState<EditorTab>("edit");
  const [draft, setDraft] = useState<DraftFields | null>(() => {
    const first = initial.pending[0] ?? initial.published[0] ?? null;
    return first ? fieldsFromArticle(first) : null;
  });
  const [dirty, setDirty] = useState(false);

  const catalog = useMemo(() => {
    return [...data.pending, ...data.published, ...data.rejected].sort(
      (a, b) =>
        Date.parse(b.updatedAt || b.createdAt) -
        Date.parse(a.updatedAt || a.createdAt),
    );
  }, [data]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return catalog.filter((a) => {
      if (filter !== "all" && a.status !== filter) return false;
      return matchesQuery(a, q);
    });
  }, [catalog, filter, query]);

  const selected = useMemo(() => {
    if (selectedId) {
      const found = catalog.find((a) => a.id === selectedId);
      if (found) return found;
    }
    return filtered[0] ?? null;
  }, [catalog, selectedId, filtered]);

  const editorDraft =
    selected && draft && selected.id === (selectedId ?? selected.id)
      ? draft
      : selected && selected.status !== "rejected"
        ? fieldsFromArticle(selected)
        : null;

  const counts = {
    all: catalog.length,
    pending: data.pending.length,
    published: data.published.length,
    rejected: data.rejected.length,
  };

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
    setDraft(
      article.status === "rejected" ? null : fieldsFromArticle(article),
    );
    setDirty(false);
    setEditorTab("edit");
    setError(null);
    setNotice(null);
  }

  function patchDraft<K extends keyof DraftFields>(
    key: K,
    value: DraftFields[K],
  ) {
    if (!selected || selected.status === "rejected") return;
    const base =
      editorDraft ?? fieldsFromArticle(selected);
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
      setError(json.error || "Falha ao carregar biblioteca");
      return;
    }
    const nextData: NewsQueuePayload = {
      me: json.me,
      pending: json.pending ?? [],
      published: json.published ?? [],
      rejected: json.rejected ?? [],
    };
    setData(nextData);

    const all = [
      ...nextData.pending,
      ...nextData.published,
      ...nextData.rejected,
    ];
    const keepId = preferId === undefined ? selectedId : preferId;
    const still = keepId ? all.find((a) => a.id === keepId) : null;
    const next = still ?? nextData.pending[0] ?? nextData.published[0] ?? null;
    setSelectedId(next?.id ?? null);
    setDraft(
      next && next.status !== "rejected" ? fieldsFromArticle(next) : null,
    );
    setDirty(false);
  }

  async function saveDraft() {
    if (!selected || !editorDraft || selected.status === "rejected") return;
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
      setNotice(
        json.article.status === "published"
          ? "Salvo e atualizado no site."
          : "Alterações salvas.",
      );
      await refresh(json.article.id);
      startRefresh(() => router.refresh());
    } catch {
      setError("Falha de rede ao salvar");
    } finally {
      setBusy(false);
    }
  }

  async function uploadCover(file: File) {
    if (!selected || selected.status === "rejected") return;
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/news/admin/upload", {
        method: "POST",
        credentials: "same-origin",
        body: form,
      });
      const json = (await res.json()) as {
        ok?: boolean;
        error?: string;
        imageUrl?: string;
      };
      if (!res.ok || !json.ok || !json.imageUrl) {
        setError(
          json.error === "invalid_image_size"
            ? "Imagem muito grande (máx. ~1,8 MB)."
            : json.error === "invalid_image_type"
              ? "Use JPG, PNG, WebP ou GIF."
              : "Falha no upload da capa.",
        );
        return;
      }
      patchDraft("imageUrl", json.imageUrl);
      setNotice("Capa enviada — salve para gravar na notícia.");
      setDirty(true);
    } catch {
      setError("Falha de rede no upload");
    } finally {
      setBusy(false);
    }
  }

  async function fetchCoverFromSource() {
    if (!selected || selected.status === "rejected" || !selected.sourceUrl) {
      return;
    }
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      const res = await fetch("/api/news/admin/fetch-cover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ id: selected.id }),
      });
      const json = (await res.json()) as {
        ok?: boolean;
        error?: string;
        article?: NewsArticleRecord;
        imageUrl?: string;
      };
      if (!res.ok || !json.ok || !json.imageUrl) {
        setError(
          json.error === "cover_not_found"
            ? "Não achou capa na página da fonte."
            : "Falha ao puxar capa da fonte.",
        );
        return;
      }
      patchDraft("imageUrl", json.imageUrl);
      setNotice("Capa puxada da fonte.");
      setDirty(false);
      await refresh(json.article?.id || selected.id);
      startRefresh(() => router.refresh());
    } catch {
      setError("Falha de rede ao puxar capa");
    } finally {
      setBusy(false);
    }
  }

  async function onDecide(decision: "approve" | "reject") {
    if (!selected || selected.status !== "pending") return;
    if (dirty) {
      setError("Salve as alterações antes de aprovar ou recusar.");
      setEditorTab("edit");
      return;
    }
    if (
      decision === "approve" &&
      !window.confirm(
        "Aprovar e publicar em /insights e /en/insights? A tradução do outro idioma é automática.",
      )
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
        hrefEn?: string | null;
        hrefPt?: string | null;
      };
      if (!res.ok || !json.ok) {
        setError(json.error || "Falha ao decidir");
        return;
      }
      setNotice(
        decision === "approve"
          ? `Publicada em PT e EN${json.href ? ` · ${json.href}` : ""}${
              json.hrefEn && json.hrefEn !== json.href ? ` · ${json.hrefEn}` : ""
            }.`
          : "Recusada.",
      );
      if (decision === "approve") setFilter("published");
      await refresh(null);
      startRefresh(() => router.refresh());
    } catch {
      setError("Falha de rede");
    } finally {
      setBusy(false);
    }
  }

  async function onDelete() {
    if (!selected) return;
    const label =
      selected.status === "published"
        ? "Apagar esta notícia do site permanentemente?"
        : "Apagar esta notícia permanentemente?";
    if (!window.confirm(label)) return;
    if (
      selected.status === "published" &&
      !window.confirm("Confirma exclusão? Isso remove a página pública.")
    ) {
      return;
    }

    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      const res = await fetch("/api/news/admin/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ id: selected.id }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setError(json.error || "Falha ao apagar");
        return;
      }
      setNotice("Notícia apagada.");
      await refresh(null);
      startRefresh(() => router.refresh());
    } catch {
      setError("Falha de rede ao apagar");
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

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: "Todas" },
    { id: "pending", label: "Pendentes" },
    { id: "published", label: "No site" },
    { id: "rejected", label: "Recusadas" },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-black/10 pb-6">
        <div>
          <p className="label-caps text-black/40">Editorial</p>
          <h1 className="font-display mt-2 text-[clamp(1.75rem,3vw,2.5rem)] font-light">
            Biblioteca de notícias
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
          <div className="flex flex-wrap gap-1">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`px-2.5 py-1.5 text-[10px] uppercase tracking-[0.14em] ${
                  filter === f.id
                    ? "bg-black text-white"
                    : "border border-black/15 text-black/55"
                }`}
              >
                {f.label} ({counts[f.id]})
              </button>
            ))}
          </div>

          <div className="mt-4">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pesquisar título, categoria, texto…"
              className={inputClass}
            />
          </div>

          <div className="mt-4 max-h-[70vh] divide-y divide-black/10 overflow-y-auto border-y border-black/10">
            {filtered.length === 0 ? (
              <p className="py-8 text-[14px] text-black/45">
                Nenhuma notícia neste filtro.
              </p>
            ) : (
              filtered.map((a) => {
                const active = a.id === (selected?.id ?? "");
                return (
                  <div
                    key={a.id}
                    className={`group flex items-stretch gap-0 ${
                      active ? "bg-black/[0.03]" : "hover:bg-black/[0.02]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => selectArticle(a)}
                      className="min-w-0 flex-1 px-2 py-4 text-left"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <StatusChip status={a.status} />
                        <span className="text-[11px] text-black/35">
                          {new Date(a.updatedAt || a.createdAt).toLocaleString(
                            "pt-BR",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </span>
                      </div>
                      <p className="font-display mt-2 text-[1.02rem] leading-snug text-black">
                        {a.title}
                      </p>
                      <p className="mt-1 line-clamp-2 text-[12px] text-black/45">
                        {a.category} · PT + EN
                      </p>
                    </button>
                    <button
                      type="button"
                      title="Apagar"
                      disabled={busy}
                      onClick={(e) => {
                        e.stopPropagation();
                        selectArticle(a);
                        void (async () => {
                          setSelectedId(a.id);
                          setDraft(
                            a.status === "rejected"
                              ? null
                              : fieldsFromArticle(a),
                          );
                          setDirty(false);
                          // slight delay so selected is a; call delete with confirm for this id
                          if (
                            !window.confirm(
                              a.status === "published"
                                ? "Apagar do site permanentemente?"
                                : "Apagar permanentemente?",
                            )
                          ) {
                            return;
                          }
                          if (
                            a.status === "published" &&
                            !window.confirm(
                              "Confirma exclusão da página pública?",
                            )
                          ) {
                            return;
                          }
                          setBusy(true);
                          setError(null);
                          try {
                            const res = await fetch("/api/news/admin/delete", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              credentials: "same-origin",
                              body: JSON.stringify({ id: a.id }),
                            });
                            const json = (await res.json()) as {
                              ok?: boolean;
                              error?: string;
                            };
                            if (!res.ok || !json.ok) {
                              setError(json.error || "Falha ao apagar");
                              return;
                            }
                            setNotice("Notícia apagada.");
                            await refresh(null);
                            startRefresh(() => router.refresh());
                          } catch {
                            setError("Falha de rede ao apagar");
                          } finally {
                            setBusy(false);
                          }
                        })();
                      }}
                      className="shrink-0 border-l border-black/10 px-3 text-[11px] uppercase tracking-[0.12em] text-black/40 opacity-0 transition-opacity hover:bg-red-50 hover:text-red-700 group-hover:opacity-100 disabled:opacity-30"
                    >
                      Apagar
                    </button>
                  </div>
                );
              })
            )}
          </div>

          <p className="mt-4 text-[12px] leading-relaxed text-black/40">
            Gerencia notícias da automação/API. Peças editoriais estáticas do
            código não aparecem aqui.
          </p>
        </aside>

        <section className="lg:col-span-8">
          {!selected ? (
            <div className="border border-dashed border-black/15 px-6 py-16 text-center text-[14px] text-black/45">
              Selecione uma notícia para editar, pré-visualizar ou apagar.
            </div>
          ) : selected.status === "rejected" ? (
            <div className="border border-black/10 px-6 py-10">
              <StatusChip status="rejected" />
              <h2 className="font-display mt-4 text-[1.75rem]">{selected.title}</h2>
              <p className="mt-3 max-w-[60ch] text-[15px] text-black/55">
                {selected.summary}
              </p>
              <p className="mt-6 text-[13px] text-black/40">
                Recusadas não são editáveis. Você pode apagá-las da biblioteca.
              </p>
              <button
                type="button"
                disabled={busy}
                onClick={() => void onDelete()}
                className="mt-6 border border-red-200 bg-red-50 px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-red-800 disabled:opacity-40"
              >
                Apagar definitivamente
              </button>
            </div>
          ) : !editorDraft ? (
            <div className="border border-dashed border-black/15 px-6 py-16 text-center text-[14px] text-black/45">
              Carregando editor…
            </div>
          ) : (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 pb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusChip status={selected.status} />
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => setEditorTab("edit")}
                      className={`px-3 py-2 text-[11px] uppercase tracking-[0.14em] ${
                        editorTab === "edit"
                          ? "bg-black text-white"
                          : "border border-black/15 text-black/60"
                      }`}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorTab("preview")}
                      className={`px-3 py-2 text-[11px] uppercase tracking-[0.14em] ${
                        editorTab === "preview"
                          ? "bg-black text-white"
                          : "border border-black/15 text-black/60"
                      }`}
                    >
                      Pré-visualizar
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selected.status === "published" ? (
                    <a
                      href={articleHref(selected)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-black/20 px-3 py-2 text-[11px] uppercase tracking-[0.14em]"
                    >
                      Ver no site
                    </a>
                  ) : null}
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
                    onClick={() => void onDelete()}
                    className="border border-red-200 px-3 py-2 text-[11px] uppercase tracking-[0.14em] text-red-800 disabled:opacity-40"
                  >
                    Apagar
                  </button>
                  {selected.status === "pending" ? (
                    <>
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
                    </>
                  ) : null}
                </div>
              </div>

              {editorTab === "edit" ? (
                <div className="mt-6 space-y-5">
                  <Field label="Título">
                    <input
                      className={inputClass}
                      value={editorDraft.title}
                      onChange={(e) => patchDraft("title", e.target.value)}
                    />
                  </Field>
                  <p className="text-[12px] leading-relaxed text-black/45">
                    Publicação padrão:{" "}
                    <span className="text-black/70">PT + EN</span> (tradução
                    automática do outro idioma na aprovação).
                  </p>
                  <Field label="Categoria">
                    <input
                      className={inputClass}
                      value={editorDraft.category}
                      onChange={(e) => patchDraft("category", e.target.value)}
                    />
                  </Field>
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
                      className={`${inputClass} min-h-[240px] resize-y leading-relaxed`}
                      value={editorDraft.body}
                      onChange={(e) => patchDraft("body", e.target.value)}
                    />
                  </Field>
                  <Field label="Capa da notícia">
                    <div className="space-y-3">
                      {editorDraft.imageUrl ? (
                        <div className="relative aspect-[16/10] max-w-md overflow-hidden border border-black/10 bg-black/[0.04]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={editorDraft.imageUrl}
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ) : (
                        <p className="text-[13px] text-black/40">
                          Sem capa ainda — faça upload ou cole a URL.
                        </p>
                      )}
                      <div className="flex flex-wrap items-center gap-3">
                        <label className="cursor-pointer border border-black/20 bg-white px-3 py-2 text-[11px] uppercase tracking-[0.14em] transition-colors hover:border-black">
                          {busy ? "Enviando…" : "Upload da capa"}
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/gif"
                            className="sr-only"
                            disabled={busy}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              e.target.value = "";
                              if (file) void uploadCover(file);
                            }}
                          />
                        </label>
                        {selected.sourceUrl ? (
                          <button
                            type="button"
                            disabled={busy}
                            onClick={() => void fetchCoverFromSource()}
                            className="border border-black/20 px-3 py-2 text-[11px] uppercase tracking-[0.14em] disabled:opacity-40"
                          >
                            Puxar da fonte
                          </button>
                        ) : null}
                        {editorDraft.imageUrl ? (
                          <button
                            type="button"
                            disabled={busy}
                            onClick={() => patchDraft("imageUrl", "")}
                            className="text-[12px] text-black/45 underline underline-offset-2"
                          >
                            Remover capa
                          </button>
                        ) : null}
                      </div>
                      <input
                        className={inputClass}
                        value={editorDraft.imageUrl}
                        placeholder="https://… ou /api/news/media/… (opcional)"
                        onChange={(e) => patchDraft("imageUrl", e.target.value)}
                      />
                    </div>
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
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
