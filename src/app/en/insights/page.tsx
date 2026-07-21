import { InsightsPageView } from "@/components/pages/InsightsPageView";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "News",
  description:
    "News and perspectives from Head Oversea — firm, portfolio, and markets across Brazil and the United States.",
  path: "/en/insights",
  image: "/images/nyc-chrysler-building-midtown.jpg",
  imageAlt: "Midtown Manhattan — Head Oversea news",
  keywords: [
    "news",
    "internationalization",
    "governance",
    "private equity",
    "Head Oversea",
  ],
});

export default function EnglishInsightsPage() {
  return <InsightsPageView locale="en" />;
}
