import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { NewsLoginClient } from "@/components/admin/NewsLoginClient";
import { getNewsSession } from "@/lib/news/auth";
import { newsLoginReady } from "@/lib/news/config";

export const metadata: Metadata = {
  title: "Login · News Studio",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function NewsAdminLoginPage() {
  const session = await getNewsSession();
  if (session) redirect("/admin/news");

  const ready = newsLoginReady();

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F0F2F5] px-4 py-16 text-[#050505]">
      <div className="w-full max-w-[420px] overflow-hidden rounded-2xl border border-[#E4E6EB] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
        <div className="border-b border-[#E4E6EB] bg-[#1877F2] px-6 py-5 text-white">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/80">
            Head Oversea
          </p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight">
            News Studio
          </h1>
          <p className="mt-1 text-[13px] text-white/85">
            Área restrita da equipe editorial
          </p>
        </div>

        <div className="px-6 py-6">
          {!ready.ok ? (
            <div className="space-y-3 text-[14px] text-[#65676B]">
              <p className="font-semibold text-[#050505]">
                Acesso temporariamente indisponível.
              </p>
              <p>
                Falta configurar variáveis no Vercel (Production) e fazer{" "}
                <span className="font-semibold text-[#050505]">Redeploy</span>.
              </p>
              {ready.missing.length > 0 ? (
                <ul className="list-disc space-y-1 pl-5 font-mono text-[12px] text-[#E41E3F]">
                  {ready.missing.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : (
            <NewsLoginClient />
          )}
        </div>
      </div>
    </main>
  );
}
