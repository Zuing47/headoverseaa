"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types/content";

const COPY = {
  pt: {
    title: "Acesso ao material gratuito",
    body: "Para fazer o download, informe nome, telefone e e-mail.",
    name: "Nome",
    phone: "Telefone",
    email: "E-mail",
    submit: "Baixar material",
    submitting: "Enviando…",
    close: "Fechar",
    error: "Não foi possível enviar. Tente de novo em instantes.",
    required: "Preencha todos os campos.",
  },
  en: {
    title: "Access free material",
    body: "To download, please share your name, phone, and email.",
    name: "Name",
    phone: "Phone",
    email: "Email",
    submit: "Download material",
    submitting: "Sending…",
    close: "Close",
    error: "Could not submit. Please try again shortly.",
    required: "Please fill in all fields.",
  },
} as const;

export type GuideLeadPayload = {
  name: string;
  phone: string;
  email: string;
  guideId: string;
  guideTitle: string;
  locale: Locale;
};

type GuideLeadModalProps = {
  open: boolean;
  locale: Locale;
  guideId: string;
  guideTitle: string;
  pdfHref: string;
  onClose: () => void;
  onUnlocked?: () => void;
};

export function GuideLeadModal({
  open,
  locale,
  guideId,
  guideTitle,
  pdfHref,
  onClose,
  onUnlocked,
}: GuideLeadModalProps) {
  const t = COPY[locale];
  const titleId = useId();
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setStatus("idle");
    setMessage(null);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const tId = window.setTimeout(() => firstFieldRef.current?.focus(), 40);
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(tId);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
    };
    if (!trimmed.name || !trimmed.phone || !trimmed.email) {
      setStatus("error");
      setMessage(t.required);
      return;
    }

    setStatus("loading");
    setMessage(null);

    const payload: GuideLeadPayload = {
      ...trimmed,
      guideId,
      guideTitle,
      locale,
    };

    try {
      const res = await fetch("/api/guide-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("lead_failed");

      onUnlocked?.();
      // Trigger download
      const a = document.createElement("a");
      a.href = pdfHref;
      a.download = "";
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      a.remove();
      onClose();
    } catch {
      setStatus("error");
      setMessage(t.error);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/65 backdrop-blur-[2px]"
        aria-label={t.close}
        onClick={onClose}
      />

      <div className="relative w-full max-w-[28rem] border border-black/[0.08] bg-white text-black shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
        <div className="flex items-start justify-between gap-4 border-b border-black/[0.08] px-6 py-5 md:px-7">
          <div>
            <p className="label-caps text-black/40">Head Oversea</p>
            <h2
              id={titleId}
              className="font-display mt-2 text-[1.55rem] leading-snug md:text-[1.75rem]"
            >
              {t.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="mt-1 text-[13px] uppercase tracking-[0.14em] text-black/40 transition-colors hover:text-black"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 md:px-7 md:py-7">
          <p className="text-[14px] leading-relaxed text-black/55">{t.body}</p>
          <p className="mt-3 text-[13px] text-black/40">{guideTitle}</p>

          <div className="mt-7 space-y-4">
            <Field
              ref={firstFieldRef}
              label={t.name}
              name="name"
              autoComplete="name"
              value={name}
              onChange={setName}
            />
            <Field
              label={t.phone}
              name="phone"
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={setPhone}
            />
            <Field
              label={t.email}
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={setEmail}
            />
          </div>

          {message ? (
            <p
              className={cn(
                "mt-4 text-[13px]",
                status === "error" ? "text-[#8a2e1a]" : "text-black/50",
              )}
              role="alert"
            >
              {message}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-7 flex w-full items-center justify-center gap-2 border border-black bg-black py-3.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white transition-opacity hover:opacity-85 disabled:cursor-wait disabled:opacity-55"
          >
            {status === "loading" ? t.submitting : t.submit}
            <span aria-hidden>→</span>
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  value,
  onChange,
  ref,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  value: string;
  onChange: (v: string) => void;
  ref?: React.Ref<HTMLInputElement>;
}) {
  const id = `lead-${name}`;
  return (
    <div>
      <label htmlFor={id} className="label-caps mb-2 block text-black/40">
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-black/15 bg-transparent px-3.5 py-3 text-[15px] text-black outline-none transition-colors placeholder:text-black/25 focus:border-black/40"
      />
    </div>
  );
}
