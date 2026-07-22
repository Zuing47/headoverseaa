"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import type { Locale } from "@/types/content";
import { isEmail } from "@/lib/form-guard";
import { Reveal } from "./reveal";
import { BackLabel } from "@/components/back";
import { cn } from "@/lib/utils";

interface InsightsSignupProps {
  locale?: Locale;
}

/**
 * Premium newsletter signup — posts to /api/newsletter (Resend → contact@).
 */
export function InsightsSignup({ locale = "en" }: InsightsSignupProps) {
  const en = locale === "en";
  const formStartedAt = useRef(0);
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );

  useEffect(() => {
    formStartedAt.current = Date.now();
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !isEmail(trimmed)) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmed,
          locale,
          website,
          formStartedAt: formStartedAt.current,
        }),
      });
      const json = (await res.json().catch(() => null)) as { ok?: boolean } | null;
      if (res.ok && json?.ok) {
        setStatus("done");
        setEmail("");
        formStartedAt.current = Date.now();
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      className="border-t border-white/[0.08] text-white"
      style={{
        backgroundColor: "#071428",
        color: "#ffffff",
        colorScheme: "dark",
      }}
      aria-label={en ? "Insights signup" : "Inscrição em insights"}
    >
      <div className="page-shell py-[clamp(3.25rem,7vw,5.5rem)]">
        <div className="mx-auto max-w-[36rem]">
          <Reveal variant="rise">
            <BackLabel tone="light">{en ? "News" : "Notícias"}</BackLabel>
          </Reveal>
          <Reveal delay={0.08} variant="rise">
            <h2
              className="font-display mt-8 text-[clamp(1.85rem,3.4vw,2.85rem)] leading-[1.12] text-white"
              style={{ color: "#ffffff" }}
            >
              {en
                ? "Sign up for our latest insights"
                : "Assine nossos últimos insights"}
            </h2>
          </Reveal>
          <Reveal delay={0.14} variant="fadeUp">
            <p
              className="mt-5 max-w-[34ch] text-[15px] leading-relaxed text-white/60"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              {en
                ? "Perspectives on active ownership across Brazil and the United States — no noise."
                : "Perspectivas sobre active ownership entre Brasil e Estados Unidos — sem ruído."}
            </p>
          </Reveal>

          <Reveal delay={0.2} variant="fadeUp" className="mt-12">
            {status === "done" ? (
              <p
                className="font-display text-[1.35rem] text-white/80"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                {en ? "You’re on the list." : "Você está na lista."}
              </p>
            ) : (
              <form
                onSubmit={onSubmit}
                className="group flex flex-col gap-0 border-b border-white/25 sm:flex-row sm:items-end"
                noValidate
              >
                <div
                  className="absolute left-[-9999px] h-0 w-0 overflow-hidden opacity-0"
                  aria-hidden
                >
                  <label htmlFor="insights-website">Website</label>
                  <input
                    id="insights-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
                <label className="sr-only" htmlFor="insights-email">
                  {en ? "Email address" : "E-mail"}
                </label>
                <input
                  id="insights-email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder={en ? "Email address" : "Seu e-mail"}
                  className={cn(
                    "w-full min-w-0 flex-1 bg-transparent py-4 text-[15px] text-white",
                    "placeholder:text-white/30",
                    "outline-none focus:placeholder:text-white/45",
                  )}
                  style={{ color: "#ffffff" }}
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex shrink-0 items-center gap-3 py-4 text-[13px] tracking-[0.04em] text-white transition-opacity hover:opacity-65 disabled:opacity-45 sm:pl-8"
                  style={{ color: "#ffffff" }}
                >
                  {status === "sending"
                    ? en
                      ? "Sending…"
                      : "Enviando…"
                    : en
                      ? "Subscribe"
                      : "Inscrever-se"}
                  <span
                    className="flex h-8 w-8 items-center justify-center border border-white/25 transition-colors group-hover:border-white/55"
                    aria-hidden
                  >
                    <span className="relative flex h-1.5 w-5 items-center justify-between">
                      <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
                      <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
                    </span>
                  </span>
                </button>
              </form>
            )}
            {status === "error" ? (
              <p className="mt-4 text-[13px] text-white/55">
                {en
                  ? "Could not subscribe. Please try again."
                  : "Não foi possível inscrever. Tente de novo."}
              </p>
            ) : null}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
