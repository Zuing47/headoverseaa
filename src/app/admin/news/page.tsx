import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { NewsQueueClient } from "@/components/admin/NewsQueueClient";
import { loadNewsQueueForSession } from "@/lib/news/queue";
import { getNewsSession } from "@/lib/news/auth";

export const metadata: Metadata = {
  title: "News Studio · Head Oversea",
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
      <main className="min-h-screen bg-[#F0F2F5] text-[#050505]">
        <div className="mx-auto max-w-xl px-6 py-20">
          <div className="rounded-2xl border border-[#E4E6EB] bg-white p-8 shadow-sm">
            <p className="text-[17px] font-bold text-[#E41E3F]">
              Não foi possível carregar a fila
            </p>
            <p className="mt-2 text-[14px] text-[#65676B]">
              ({queue.error}) Confira Redis na Vercel e faça Redeploy.
            </p>
            {queue.missing?.length ? (
              <ul className="mt-4 list-disc space-y-1 pl-5 text-[13px] text-[#E41E3F]">
                {queue.missing.map((m) => (
                  <li key={m}>
                    <code>{m}</code>
                  </li>
                ))}
              </ul>
            ) : null}
            {queue.diagnostics?.length ? (
              <ul className="mt-4 list-disc space-y-1 pl-5 text-[12px] text-[#65676B]">
                {queue.diagnostics.map((d) => (
                  <li key={d}>
                    <code>{d}</code>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F0F2F5]">
      <NewsQueueClient initial={queue.data} />
    </main>
  );
}
