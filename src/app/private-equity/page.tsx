import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { PrivateEquityPageView } from "@/components/pages/PrivateEquityPageView";
import { PePageJsonLd } from "@/components/seo/PePageJsonLd";

export const metadata: Metadata = pageMeta({
  title: "Private Equity | Active Ownership",
  description:
    "Private equity com active ownership Brasil–EUA. Aprenda o que é ownership ativo, governança como alavanca de valuation e o ciclo até o evento de liquidez — Head Oversea.",
  path: "/private-equity",
  image: "/images/private-equity-team-collaboration.jpg",
  imageAlt:
    "Investment team collaboration — Head Oversea private equity active ownership",
  keywords: [
    "private equity",
    "active ownership",
    "governança",
    "private equity Brasil Estados Unidos",
    "ownership ativo",
    "Head Oversea",
    "valuation",
    "evento de liquidez",
  ],
});

export default function PrivateEquityPage() {
  return (
    <>
      <PePageJsonLd locale="pt" />
      <PrivateEquityPageView content={getContent("pt")} locale="pt" />
    </>
  );
}
