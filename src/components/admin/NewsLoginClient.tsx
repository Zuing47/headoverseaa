"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function NewsLoginClient() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/news/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(
          data.error === "rate_limited"
            ? "Muitas tentativas. Tente mais tarde."
            : data.error === "news_system_unconfigured" ||
                data.error === "forbidden"
              ? "Acesso temporariamente indisponível."
              : "E-mail ou senha incorretos.",
        );
        return;
      }
      router.replace("/admin/news");
      router.refresh();
    } catch {
      setError("Falha de rede. Tente de novo.");
    } finally {
      setLoading(false);
    }
  }

  const field =
    "mt-1.5 w-full rounded-xl border border-[#CCD0D5] bg-[#F0F2F5] px-3.5 py-2.5 text-[15px] outline-none transition focus:border-[#1877F2] focus:bg-white focus:ring-2 focus:ring-[#1877F2]/30";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="news-email"
          className="text-[13px] font-semibold text-[#050505]"
        >
          E-mail
        </label>
        <input
          id="news-email"
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={field}
        />
      </div>
      <div>
        <label
          htmlFor="news-password"
          className="text-[13px] font-semibold text-[#050505]"
        >
          Senha
        </label>
        <input
          id="news-password"
          type="password"
          autoComplete="current-password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={field}
        />
      </div>
      {error ? (
        <p className="text-[14px] font-medium text-[#E41E3F]" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-[#1877F2] px-4 py-2.5 text-[15px] font-semibold text-white shadow-sm transition hover:bg-[#166FE5] disabled:opacity-50"
      >
        {loading ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
