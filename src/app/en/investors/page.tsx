import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { InvestorsPageView } from "@/components/pages/InvestorsPageView";

export const metadata: Metadata = pageMeta({
  title: "For Investors",
  description:
    "Qualified mid-market deal flow in Brazil and the U.S., with a local operating partner, a clear thesis, and active governance over every portfolio asset.",
  path: "/en/investors",
});

export default function EnInvestorsPage() {
  return (
    <InvestorsPageView content={getContent("en")} locale="en" />
  );
}
