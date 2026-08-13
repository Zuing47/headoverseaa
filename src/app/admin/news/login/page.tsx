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
          <p className="mt-10 max-w-md text-[14px] text-black/55">
            Acesso temporariamente indisponível.
          </p>
        ) : (
          <div className="mt-12">
            <NewsLoginClient />
          </div>
        )}
      </div>
    </main>
  );
}
