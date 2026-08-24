"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import type { NewsArticleRecord, NewsQueuePayload } from "@/lib/news/types";
import { NEWS_AUTHORS, getNewsAuthor } from "@/lib/news/authors";
import {
  fieldsFromArticle,
  NewsSitePreview,
} from "@/components/admin/NewsSitePreview";

type DraftFields = ReturnType<typeof fieldsFromArticle>;
type EditorTab = "edit" | "preview";
type Filter = "all" | "pending" | "published" | "rejected";

const META = {
  blue: "#1877F2",
  blueHover: "#166FE5",
  bg: "#F0F2F5",
  card: "#FFFFFF",
  border: "#E4E6EB",
  text: "#050505",
  muted: "#65676B",
  green: "#31A24C",
  amber: "#F7B928",
  red: "#E41E3F",
};

function StatusChip({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: "bg-[#FFF8E6] text-[#B76E00]",
    published: "bg-[#E7F6EC] text-[#1B7A36]",
    rejected: "bg-[#F2F2F2] text-[#65676B]",
  };
  const label =
    status === "pending"
      ? "Pendente"
      : status === "published"
        ? "No site"
        : "Recusada";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${map[status] || map.rejected}`}
    >
      {label}
    </span>
  );
}

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="text-[13px] font-semibold text-[#050505]">{label}</span>
      {hint ? (
        <span className="mt-0.5 block text-[12px] text-[#65676B]">{hint}</span>
      ) : null}
      <div className="mt-2">{children}</div>
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-[#CCD0D5] bg-[#F0F2F5] px-3.5 py-2.5 text-[15px] text-[#050505] outline-none transition focus:border-[#1877F2] focus:bg-white focus:ring-2 focus:ring-[#1877F2]/30";

const btnGhost =
  "inline-flex items-center justify-center rounded-lg border border-[#CCD0D5] bg-white px-3.5 py-2 text-[13px] font-semibold text-[#050505] transition hover:bg-[#F0F2F5] disabled:opacity-40";

const btnPrimary =
  "inline-flex items-center justify-center rounded-lg bg-[#1877F2] px-4 py-2 text-[13px] font-semibold text-white shadow-sm transition hover:bg-[#166FE5] disabled:opacity-40";

const btnDanger =
  "inline-flex items-center justify-center rounded-lg border border-[#FEC9C9] bg-[#FFF1F1] px-3.5 py-2 text-[13px] font-semibold text-[#E41E3F] transition hover:bg-[#FFE3E3] disabled:opacity-40";

function articleHref(a: NewsArticleRecord) {
  return a.locale === "en" ? `/en/news/${a.slug}` : `/news/${a.slug}`;
}

function matchesQuery(a: NewsArticleRecord, q: string) {
  if (!q) return true;
  const hay = [
    a.title,
    a.summary,
    a.category,
    a.slug,
    a.sourceName ?? "",
    a.authorId ?? "",
    a.body,
  ]
    .join(" ")
    .toLowerCase();
  return hay.includes(q);
}

function isNewsAuthorSelected(a: NewsArticleRecord) {
  return Boolean(a.authorId && getNewsAuthor(a.authorId));
}

function formatWhen(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
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
    initial.pending[0]?.id ?? initial.published[0]?.id ?? null,
  );
  const [editorTab, setEditorTab] = useState<EditorTab>("edit");
  const [draft, setDraft] = useState<DraftFields | null>(() => {
    const first = initial.pending[0] ?? initial.published[0] ?? null;
    return first ? fieldsFromArticle(first) : null;
  });
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (initial.purgedStale && initial.purgedStale > 0) {
      setNotice(
        `${initial.purgedStale} notícia(s) pendente(s) com mais de 2 dias foram apagadas automaticamente.`,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const selectedAuthor = selected?.authorId
    ? getNewsAuthor(selected.authorId)
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
    setDraft(article.status === "rejected" ? null : fieldsFromArticle(article));
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
    const base = editorDraft ?? fieldsFromArticle(selected);
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
      purgedStale?: number;
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
      purgedStale: json.purgedStale,
    };
    setData(nextData);
    if (json.purgedStale && json.purgedStale > 0) {
      setNotice(
        `${json.purgedStale} notícia(s) pendente(s) com mais de 2 dias foram apagadas automaticamente.`,
      );
    }

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
          authorId: editorDraft.authorId || null,
          sourceUrl: editorDraft.sourceUrl || "",
          sourceLogoUrl: editorDraft.sourceLogoUrl || "",
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

  async function improveWithAi() {
    if (!selected || !editorDraft || selected.status === "rejected") return;
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      const res = await fetch("/api/news/admin/improve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          title: editorDraft.title,
          summary: editorDraft.summary,
          body: editorDraft.body,
          category: editorDraft.category,
          locale: editorDraft.locale,
          sourceName: editorDraft.sourceName,
          imageUrl: editorDraft.imageUrl,
        }),
      });
      const json = (await res.json()) as {
        ok?: boolean;
        error?: string;
        hint?: string;
        title?: string;
        summary?: string;
        body?: string;
      };
      if (!res.ok || !json.ok || !json.body) {
        if (json.error === "ai_unconfigured") {
          setError(
            json.hint ||
              "Configure OPENAI_API_KEY na Vercel e faça Redeploy.",
          );
        } else if (json.error === "rate_limited") {
          setError("Limite de melhorias com IA atingido. Tente mais tarde.");
        } else {
          setError("A IA não conseguiu melhorar o texto. Tente de novo.");
        }
        return;
      }
      setDraft({
        ...editorDraft,
        title: json.title || editorDraft.title,
        summary: json.summary || editorDraft.summary,
        body: json.body,
      });
      setDirty(true);
      setEditorTab("edit");
      setNotice(
        "Texto expandido pela IA (com destaques em negrito). Revise e clique em Salvar.",
      );
    } catch {
      setError("Falha de rede ao chamar a IA");
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
    if (decision === "approve" && !isNewsAuthorSelected(selected)) {
      setError(
        "Selecione o responsável pela postagem (foto + nome) e salve antes de aprovar.",
      );
      setEditorTab("edit");
      return;
    }
    if (
      decision === "approve" &&
      !window.confirm(
        "Aprovar e publicar em /news e /en/news? A tradução do outro idioma é automática.",
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
      };
      if (!res.ok || !json.ok) {
        const msg =
          json.error === "author_required"
            ? "Selecione e salve o responsável antes de aprovar."
            : json.error || "Falha ao decidir";
        setError(msg);
        return;
      }
      setNotice(
        decision === "approve"
          ? `Publicada em PT e EN${json.href ? ` · ${json.href}` : ""}.`
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
    { id: "published", label: "Publicadas" },
    { id: "rejected", label: "Recusadas" },
  ];

  return (
    <div className="min-h-screen" style={{ background: META.bg, color: META.text }}>
      {/* Top bar — Meta Business Suite */}
      <header className="sticky top-0 z-30 border-b border-[#E4E6EB] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3 md:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-white"
              style={{ background: META.blue }}
            >
              HO
            </div>
            <div className="min-w-0">
              <p className="truncate text-[15px] font-bold tracking-tight">
                News Studio
              </p>
              <p className="truncate text-[12px] text-[#65676B]">
                {data.me}
                {pendingRefresh ? " · sincronizando…" : ""}
                {dirty ? " · não salvas" : ""}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => void refresh(selectedId)}
              className={btnGhost}
            >
              Atualizar
            </button>
            <button type="button" onClick={() => void logout()} className={btnGhost}>
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-4 py-5 md:px-6 md:py-6">
        {error ? (
          <div
            className="mb-4 rounded-xl border border-[#FEC9C9] bg-[#FFF1F1] px-4 py-3 text-[14px] text-[#E41E3F]"
            role="alert"
          >
            {error}
          </div>
        ) : null}
        {notice ? (
          <div
            className="mb-4 rounded-xl border border-[#B7E4C7] bg-[#E7F6EC] px-4 py-3 text-[14px] text-[#1B7A36]"
            role="status"
          >
            {notice}
          </div>
        ) : null}

        <div className="grid gap-5 lg:grid-cols-12">
          {/* Feed */}
          <aside className="lg:col-span-4">
            <div className="overflow-hidden rounded-2xl border border-[#E4E6EB] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
              <div className="border-b border-[#E4E6EB] px-4 py-3">
                <p className="text-[16px] font-bold">Fila editorial</p>
                <p className="mt-0.5 text-[12px] text-[#65676B]">
                  Pendentes expiram em 2 dias
                </p>
              </div>

              <div className="flex gap-1 overflow-x-auto border-b border-[#E4E6EB] px-2 py-2">
                {filters.map((f) => {
                  const active = filter === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFilter(f.id)}
                      className={`shrink-0 rounded-full px-3 py-1.5 text-[12px] font-semibold transition ${
                        active
                          ? "bg-[#E7F3FF] text-[#1877F2]"
                          : "text-[#65676B] hover:bg-[#F0F2F5]"
                      }`}
                    >
                      {f.label}
                      <span className="ml-1 opacity-70">{counts[f.id]}</span>
                    </button>
                  );
                })}
              </div>

              <div className="border-b border-[#E4E6EB] px-3 py-2.5">
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar na biblioteca…"
                  className={inputClass}
                />
              </div>

              <div className="max-h-[min(70vh,720px)] overflow-y-auto">
                {filtered.length === 0 ? (
                  <p className="px-4 py-12 text-center text-[14px] text-[#65676B]">
                    Nenhuma notícia neste filtro.
                  </p>
                ) : (
                  filtered.map((a) => {
                    const active = a.id === (selected?.id ?? "");
                    const author = getNewsAuthor(a.authorId);
                    return (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => selectArticle(a)}
                        className={`flex w-full gap-3 border-b border-[#F0F2F5] px-3 py-3 text-left transition ${
                          active
                            ? "bg-[#E7F3FF]"
                            : "hover:bg-[#F7F8FA]"
                        }`}
                      >
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[#E4E6EB]">
                          {a.imageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={a.imageUrl}
                              alt=""
                              className="h-full w-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-[10px] font-semibold text-[#65676B]">
                              HO
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <StatusChip status={a.status} />
                            <span className="shrink-0 text-[11px] text-[#65676B]">
                              {formatWhen(a.updatedAt || a.createdAt)}
                            </span>
                          </div>
                          <p className="mt-1 line-clamp-2 text-[14px] font-semibold leading-snug text-[#050505]">
                            {a.title}
                          </p>
                          <div className="mt-1.5 flex items-center gap-2">
                            {author?.photo ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={author.photo}
                                alt=""
                                className="h-5 w-5 rounded-full object-cover object-top"
                              />
                            ) : null}
                            <p className="truncate text-[12px] text-[#65676B]">
                              {author?.name || a.category} · PT+EN
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </aside>

          {/* Composer / editor */}
          <section className="lg:col-span-8">
            {!selected ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#CCD0D5] bg-white px-6 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full text-white"
                  style={{ background: META.blue }}
                >
                  ✎
                </div>
                <p className="mt-4 text-[17px] font-bold">
                  Selecione uma notícia
                </p>
                <p className="mt-1 max-w-sm text-[14px] text-[#65676B]">
                  Edite, escolha o responsável e publique no site.
                </p>
              </div>
            ) : selected.status === "rejected" ? (
              <div className="rounded-2xl border border-[#E4E6EB] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.06)] md:p-8">
                <StatusChip status="rejected" />
                <h2 className="mt-4 text-[22px] font-bold leading-snug">
                  {selected.title}
                </h2>
                <p className="mt-3 max-w-[60ch] text-[15px] text-[#65676B]">
                  {selected.summary}
                </p>
                <p className="mt-6 text-[13px] text-[#65676B]">
                  Recusadas não são editáveis. Você pode removê-las da biblioteca.
                </p>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => void onDelete()}
                  className={`${btnDanger} mt-5`}
                >
                  Apagar definitivamente
                </button>
              </div>
            ) : !editorDraft ? (
              <div className="rounded-2xl border border-[#E4E6EB] bg-white px-6 py-16 text-center text-[14px] text-[#65676B]">
                Carregando editor…
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-[#E4E6EB] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
                {/* Action bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E4E6EB] bg-[#F7F8FA] px-4 py-3 md:px-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusChip status={selected.status} />
                    {selectedAuthor ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2 py-1 text-[12px] font-medium text-[#050505] ring-1 ring-[#E4E6EB]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={selectedAuthor.photo}
                          alt=""
                          className="h-5 w-5 rounded-full object-cover object-top"
                        />
                        {selectedAuthor.name}
                      </span>
                    ) : (
                      <span className="text-[12px] font-medium text-[#B76E00]">
                        Sem responsável
                      </span>
                    )}
                    <div className="ml-1 flex rounded-lg bg-[#E4E6EB] p-0.5">
                      <button
                        type="button"
                        onClick={() => setEditorTab("edit")}
                        className={`rounded-md px-3 py-1.5 text-[12px] font-semibold ${
                          editorTab === "edit"
                            ? "bg-white text-[#050505] shadow-sm"
                            : "text-[#65676B]"
                        }`}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditorTab("preview")}
                        className={`rounded-md px-3 py-1.5 text-[12px] font-semibold ${
                          editorTab === "preview"
                            ? "bg-white text-[#050505] shadow-sm"
                            : "text-[#65676B]"
                        }`}
                      >
                        Preview
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selected.status === "published" ? (
                      <a
                        href={articleHref(selected)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={btnGhost}
                      >
                        Ver no site
                      </a>
                    ) : null}
                    <button
                      type="button"
                      disabled={busy || !dirty}
                      onClick={() => void saveDraft()}
                      className={btnGhost}
                    >
                      Salvar
                    </button>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => void onDelete()}
                      className={btnDanger}
                    >
                      Apagar
                    </button>
                    {selected.status === "pending" ? (
                      <>
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => void onDecide("reject")}
                          className={btnGhost}
                        >
                          Recusar
                        </button>
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => void onDecide("approve")}
                          className={btnPrimary}
                        >
                          Aprovar e publicar
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>

                {editorTab === "edit" ? (
                  <div className="space-y-6 px-4 py-5 md:px-6 md:py-6">
                    <Field label="Título">
                      <input
                        className={inputClass}
                        value={editorDraft.title}
                        onChange={(e) => patchDraft("title", e.target.value)}
                      />
                    </Field>

                    <div className="rounded-xl bg-[#E7F3FF] px-4 py-3 text-[13px] text-[#1877F2]">
                      Publicação padrão: <strong>PT + EN</strong> (tradução
                      automática do outro idioma na aprovação).
                    </div>

                    <Field
                      label="Responsável pela postagem"
                      hint="Foto e nome aparecem na notícia publicada"
                    >
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
                        {NEWS_AUTHORS.map((author) => {
                          const active = editorDraft.authorId === author.id;
                          return (
                            <button
                              key={author.id}
                              type="button"
                              disabled={busy}
                              onClick={() => {
                                if (!selected || selected.status === "rejected")
                                  return;
                                const base =
                                  editorDraft ?? fieldsFromArticle(selected);
                                if (!selectedId) setSelectedId(selected.id);
                              setDraft({
                                ...base,
                                authorId: author.id,
                              });
                              setDirty(true);
                            }}
                              className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition ${
                                active
                                  ? "border-[#1877F2] bg-[#E7F3FF] ring-2 ring-[#1877F2]/25"
                                  : "border-[#E4E6EB] bg-[#F7F8FA] hover:border-[#CCD0D5] hover:bg-white"
                              }`}
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={author.photo}
                                alt=""
                                className="h-11 w-11 shrink-0 rounded-full object-cover object-top ring-2 ring-white"
                              />
                              <span className="min-w-0">
                                <span className="block truncate text-[13px] font-semibold text-[#050505]">
                                  {author.name}
                                </span>
                                <span className="block truncate text-[11px] text-[#65676B]">
                                  {author.rolePt}
                                </span>
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      {!editorDraft.authorId ? (
                        <p className="mt-2 text-[12px] font-medium text-[#B76E00]">
                          Obrigatório para aprovar.
                        </p>
                      ) : null}
                    </Field>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Categoria">
                        <input
                          className={inputClass}
                          value={editorDraft.category}
                          onChange={(e) =>
                            patchDraft("category", e.target.value)
                          }
                        />
                      </Field>
                      <Field label="Slug (URL)">
                        <input
                          className={inputClass}
                          value={editorDraft.slug}
                          onChange={(e) => patchDraft("slug", e.target.value)}
                        />
                      </Field>
                    </div>

                    <Field
                      label="Fonte da notícia"
                      hint="Nome, link e logo opcional — aparece no final da matéria"
                    >
                      <div className="space-y-3 rounded-2xl border border-[#E4E6EB] bg-[#F7F8FA] p-4">
                        <input
                          className={inputClass}
                          value={editorDraft.sourceName}
                          placeholder="Nome do site — ex. PE Hub"
                          onChange={(e) =>
                            patchDraft("sourceName", e.target.value)
                          }
                        />
                        <input
                          className={inputClass}
                          value={editorDraft.sourceUrl}
                          placeholder="https://… link da matéria original"
                          onChange={(e) =>
                            patchDraft("sourceUrl", e.target.value)
                          }
                        />
                        <div className="flex flex-wrap items-center gap-3">
                          {editorDraft.sourceLogoUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={editorDraft.sourceLogoUrl}
                              alt=""
                              className="h-11 w-11 rounded-xl bg-white object-contain p-1 ring-1 ring-[#E4E6EB]"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[10px] font-bold text-[#65676B] ring-1 ring-[#E4E6EB]">
                              LOGO
                            </div>
                          )}
                          <input
                            className={`${inputClass} flex-1`}
                            value={editorDraft.sourceLogoUrl}
                            placeholder="URL do logo (opcional)"
                            onChange={(e) =>
                              patchDraft("sourceLogoUrl", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </Field>

                    <Field label="Resumo / lead">
                      <textarea
                        className={`${inputClass} min-h-[96px] resize-y`}
                        value={editorDraft.summary}
                        onChange={(e) => patchDraft("summary", e.target.value)}
                      />
                    </Field>

                    <Field
                      label="Corpo"
                      hint="Parágrafos separados por linha em branco · use **texto** para negrito"
                    >
                      <div className="mb-2 flex flex-wrap gap-2">
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => void improveWithAi()}
                          className={btnPrimary}
                        >
                          {busy ? "Melhorando…" : "Melhorar com IA"}
                        </button>
                        <span className="self-center text-[12px] text-[#65676B]">
                          Expande o texto, adiciona contexto e destaques
                        </span>
                      </div>
                      <textarea
                        className={`${inputClass} min-h-[260px] resize-y leading-relaxed`}
                        value={editorDraft.body}
                        onChange={(e) => patchDraft("body", e.target.value)}
                      />
                    </Field>

                    <Field label="Capa">
                      <div className="space-y-3">
                        {editorDraft.imageUrl ? (
                          <div className="relative aspect-[16/10] max-w-lg overflow-hidden rounded-2xl bg-[#E4E6EB]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={editorDraft.imageUrl}
                              alt=""
                              className="absolute inset-0 h-full w-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        ) : (
                          <div className="rounded-2xl border border-dashed border-[#CCD0D5] bg-[#F7F8FA] px-4 py-10 text-center text-[13px] text-[#65676B]">
                            Sem capa — faça upload ou cole a URL
                          </div>
                        )}
                        <div className="flex flex-wrap items-center gap-2">
                          <label className={`${btnGhost} cursor-pointer`}>
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
                              className={btnGhost}
                            >
                              Puxar da fonte
                            </button>
                          ) : null}
                          {editorDraft.imageUrl ? (
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => patchDraft("imageUrl", "")}
                              className="text-[13px] font-semibold text-[#65676B] underline-offset-2 hover:underline"
                            >
                              Remover
                            </button>
                          ) : null}
                        </div>
                        <input
                          className={inputClass}
                          value={editorDraft.imageUrl}
                          placeholder="https://… ou /api/news/media/…"
                          onChange={(e) =>
                            patchDraft("imageUrl", e.target.value)
                          }
                        />
                      </div>
                    </Field>
                  </div>
                ) : (
                  <div className="bg-[#F0F2F5] p-4 md:p-6">
                    <NewsSitePreview draft={editorDraft} />
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
