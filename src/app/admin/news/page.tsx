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
          <p className="text-[15px] text-red-700">
            Não foi possível carregar a fila ({queue.error}). Verifique Redis e
            as variáveis de ambiente.
          </p>
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
