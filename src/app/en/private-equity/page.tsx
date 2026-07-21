import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { PrivateEquityPageView } from "@/components/pages/PrivateEquityPageView";
import { PePageJsonLd } from "@/components/seo/PePageJsonLd";

export const metadata: Metadata = pageMeta({
  title: "Private Equity | Active Ownership",
  description:
    "Private equity with active ownership across Brazil and the U.S. Learn what active ownership means, governance as a valuation lever, and the path to liquidity — Head Oversea.",
  path: "/en/private-equity",
  image: "/images/private-equity-team-collaboration.jpg",
  imageAlt:
    "Investment team collaboration — Head Oversea private equity active ownership",
  keywords: [
    "private equity",
    "active ownership",
    "governance",
    "Brazil United States private equity",
    "cross-border investment",
    "Head Oversea",
    "valuation",
    "liquidity event",
  ],
});

export default function EnglishPrivateEquityPage() {
  return (
    <>
      <PePageJsonLd locale="en" />
      <PrivateEquityPageView content={getContent("en")} locale="en" />
    </>
  );
}
