import { CasesPageView } from "@/components/pages/CasesPageView";
import { getContent } from "@/lib/content";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Portfólio",
  description:
    "Empresas do portfólio Head Oversea nos Estados Unidos — private equity e real estate com active ownership.",
  path: "/cases",
  image: "/images/empresas/riolaser.jpg",
  imageAlt:
    "Riolaser — Head Oversea private equity portfolio company in the United States",
  keywords: [
    "portfólio",
    "private equity",
    "cases",
    "Head Oversea",
    "Riolaser",
    "Drakkar",
  ],
});

export default function CasesPage() {
  return (
    <CasesPageView
      content={getContent("pt")}
      locale="pt"
      subtitle="Posições de ownership — e, em apêndice, engajamentos de marca."
    />
  );
}
