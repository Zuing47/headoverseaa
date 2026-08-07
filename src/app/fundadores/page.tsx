import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { FoundersPageView } from "@/components/pages/FoundersPageView";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Para Fundadores",
  description:
    "Um sócio operacional que entra na empresa para estruturar governança, criar valor e conduzir capital e expansão — sem que você perca o controle da visão.",
  path: "/fundadores",
  keywords: [
    "fundadores",
    "private equity",
    "vender participação",
    "Head Oversea",
    "governança",
  ],
});

export default function FundadoresPage() {
  return <FoundersPageView content={getContent("pt")} locale="pt" />;
}
