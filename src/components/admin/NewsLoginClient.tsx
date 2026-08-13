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
            ? "Muitas tentativas. Aguarde alguns minutos."
            : data.error === "news_system_unconfigured"
              ? "Sistema de news ainda não configurado no servidor."
              : "Credenciais inválidas.",
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

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-md space-y-5">
      <div>
        <label htmlFor="news-email" className="label-caps text-black/45">
          E-mail
        </label>
        <input
          id="news-email"
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full border border-black/15 bg-white px-4 py-3 text-[15px] outline-none focus:border-black"
        />
      </div>
      <div>
        <label htmlFor="news-password" className="label-caps text-black/45">
          Senha
        </label>
        <input
          id="news-password"
          type="password"
          autoComplete="current-password"
          required
          minLength={10}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full border border-black/15 bg-white px-4 py-3 text-[15px] outline-none focus:border-black"
        />
      </div>
      {error ? (
        <p className="text-[14px] text-red-700" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black px-4 py-3 text-[13px] font-medium uppercase tracking-[0.14em] text-white disabled:opacity-50"
      >
        {loading ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
