import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { NewsQueueClient } from "@/components/admin/NewsQueueClient";
import { loadNewsQueueForSession } from "@/lib/news/queue";
import { getNewsSession } from "@/lib/news/auth";

export const metadata: Metadata = {
  title: "Fila · News Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function NewsAdminPage() {
  const session = await getNewsSession();
  if (!session) redirect("/admin/news/login");

  const queue = await loadNewsQueueForSession();
  if (!queue.ok) {
    if (queue.status === 401) redirect("/admin/news/login");
    return (
      <main className="min-h-screen bg-white text-black">
        <div className="page-shell py-16 md:py-20">
          <p className="text-[15px] font-medium text-red-700">
            Não foi possível carregar a fila ({queue.error}).
          </p>
          <p className="mt-2 max-w-xl text-[14px] text-black/60">
            A fila vive no Redis (Upstash). Confira as variáveis na Vercel
            (Production) e faça Redeploy.
          </p>
          {queue.missing?.length ? (
            <ul className="mt-4 list-disc space-y-1 pl-5 text-[13px] text-red-800">
              {queue.missing.map((m) => (
                <li key={m}>
                  <code>{m}</code>
                </li>
              ))}
            </ul>
          ) : null}
          {queue.diagnostics?.length ? (
            <>
              <p className="mt-6 text-[13px] font-medium text-black/70">
                Diagnóstico deste deploy:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-[12px] text-black/55">
                {queue.diagnostics.map((d) => (
                  <li key={d}>
                    <code>{d}</code>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="page-shell py-16 md:py-20">
        <NewsQueueClient initial={queue.data} />
      </div>
    </main>
  );
}
