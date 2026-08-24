import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { NewsLoginClient } from "@/components/admin/NewsLoginClient";
import { getNewsSession } from "@/lib/news/auth";
import { newsLoginReady } from "@/lib/news/config";

export const metadata: Metadata = {
  title: "Login · News Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function NewsAdminLoginPage() {
  const session = await getNewsSession();
  if (session) redirect("/admin/news");

  const ready = newsLoginReady();

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="page-shell py-20 md:py-28">
        <p className="label-caps text-black/40">Head Oversea</p>
        <h1 className="font-display mt-4 text-[clamp(2rem,4vw,3rem)] font-light">
          News — acesso
        </h1>
        <p className="mt-3 max-w-[44ch] text-[15px] text-black/55">
          Área restrita da equipe.
        </p>

        {!ready.ok ? (
          <div className="mt-10 max-w-lg space-y-3 text-[14px] text-black/55">
            <p>Acesso temporariamente indisponível.</p>
            <p>
              Falta configurar variáveis no Vercel (Production) e fazer{" "}
              <span className="text-black/80">Redeploy</span>. Só alterar a
              variável sem redeploy não atualiza o site.
            </p>
            {ready.missing.length > 0 ? (
              <ul className="list-disc space-y-1 pl-5 font-mono text-[12px] text-black/70">
                {ready.missing.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : (
          <div className="mt-12">
            <NewsLoginClient />
          </div>
        )}
      </div>
    </main>
  );
}
