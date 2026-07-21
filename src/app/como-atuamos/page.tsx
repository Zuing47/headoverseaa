import { HowWeWorkPageView } from "@/components/pages/HowWeWorkPageView";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageMeta({
  title: "Como Atuamos",
  description:
    "O que muda quando a Head Oversea entra como sócia: operação, governança e capital trabalhados em paralelo, com metodologia comprovada e presença nos EUA.",
  path: "/como-atuamos",
});

export default function ComoAtuamosPage() {
  return <HowWeWorkPageView content={getContent("pt")} locale="pt" />;
}
