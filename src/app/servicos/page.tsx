import { ServicesPageView } from "@/components/pages/ServicesPageView";
import { getContent } from "@/lib/content";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Como atuamos",
  description:
    "Private equity e real estate com ownership ativo — governança, operação e capital no corredor Brasil–Estados Unidos.",
  path: "/servicos",
  keywords: [
    "private equity",
    "real estate",
    "active ownership",
    "Head Oversea",
    "Brasil Estados Unidos",
  ],
});

export default function ServicesPage() {
  return <ServicesPageView content={getContent("pt")} locale="pt" />;
}
