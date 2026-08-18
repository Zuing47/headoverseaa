"use client";

import { useCallback, useEffect, useState } from "react";
import type { Locale } from "@/types/content";

type NewsShareBarProps = {
  title: string;
  path: string;
  locale?: Locale;
};

const COPY = {
  pt: {
    label: "Compartilhar",
    whatsapp: "WhatsApp",
    instagram: "Copiar link para Instagram",
    share: "Compartilhar",
    copy: "Copiar link",
    copied: "Link copiado",
    shareUnavailable: "Compartilhar disponível no celular",
  },
  en: {
    label: "Share",
    whatsapp: "WhatsApp",
    instagram: "Copy link for Instagram",
    share: "Share",
    copy: "Copy link",
    copied: "Link copied",
    shareUnavailable: "Share is available on mobile",
  },
} as const;

function resolveShareUrl(path: string): string {
  if (typeof window !== "undefined") {
    return window.location.href.split("#")[0];
  }
  if (path.startsWith("http")) return path;
  return path;
}

async function writeClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through */
  }
  try {
    const el = document.createElement("textarea");
    el.value = text;
    el.setAttribute("readonly", "");
    el.style.position = "fixed";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(el);
    return ok;
  } catch {
    return false;
  }
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"
      />
    </svg>
  );
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
      />
    </svg>
  );
}

/** Icon-only: WhatsApp, copy for Instagram, native share sheet, copy link. */
export function NewsShareBar({
  title,
  path,
  locale = "pt",
}: NewsShareBarProps) {
  const t = COPY[locale];
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!status) return;
    const id = window.setTimeout(() => setStatus(null), 2800);
    return () => window.clearTimeout(id);
  }, [status]);

  const shareUrl = useCallback(() => resolveShareUrl(path), [path]);

  const onWhatsApp = useCallback(() => {
    const url = shareUrl();
    window.open(
      `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }, [shareUrl, title]);

  const onInstagram = useCallback(async () => {
    const ok = await writeClipboard(shareUrl());
    if (ok) setStatus(t.copied);
  }, [shareUrl, t.copied]);

  const onNativeShare = useCallback(async () => {
    const url = shareUrl();
    if (!navigator.share) {
      setStatus(t.shareUnavailable);
      return;
    }
    try {
      await navigator.share({ title, text: title, url });
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setStatus(t.shareUnavailable);
    }
  }, [shareUrl, t.shareUnavailable, title]);

  const onCopy = useCallback(async () => {
    const ok = await writeClipboard(shareUrl());
    if (ok) setStatus(t.copied);
  }, [shareUrl, t.copied]);

  const btn =
    "inline-flex h-10 w-10 items-center justify-center text-black/45 transition-colors hover:text-black";

  return (
    <div className="mt-12 border-t border-black/[0.08] pt-10">
      <p className="label-caps text-black/40">{t.label}</p>
      <div className="mt-4 flex items-center gap-1">
        <button
          type="button"
          onClick={onWhatsApp}
          className={btn}
          aria-label={t.whatsapp}
          title={t.whatsapp}
        >
          <WhatsAppIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={onInstagram}
          className={btn}
          aria-label={t.instagram}
          title={t.instagram}
        >
          <InstagramIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={onNativeShare}
          className={btn}
          aria-label={t.share}
          title={t.share}
        >
          <ShareIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={onCopy}
          className={btn}
          aria-label={t.copy}
          title={t.copy}
        >
          <LinkIcon className="h-5 w-5" />
        </button>
      </div>
      {status ? (
        <p className="mt-3 text-[12px] tracking-[0.04em] text-black/40" role="status">
          {status}
        </p>
      ) : null}
    </div>
  );
}
