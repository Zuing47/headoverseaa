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
          Área restrita da equipe. Use o e-mail e a senha da marketing.
        </p>

        {!ready.ok ? (
          <div className="mt-10 max-w-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[14px] text-amber-950">
            <p className="font-medium">Falta só a chave de sessão no servidor.</p>
            <p className="mt-2">
              Na Vercel, confira <code>NEWS_SESSION_SECRET</code> (≥32 caracteres)
              e faça Redeploy.
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              {ready.missing.map((item) => (
                <li key={item}>
                  <code className="text-[13px]">{item}</code>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="mt-12">
            <p className="mb-6 text-[13px] text-black/45">
              E-mail: <code>marketing@headoversea.com</code>
            </p>
            <NewsLoginClient />
          </div>
        )}
      </div>
    </main>
  );
}
