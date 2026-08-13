import { InsightsPageView } from "@/components/pages/InsightsPageView";
import type { Metadata } from "next";
import { getPublicInsights } from "@/lib/news/public";
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
    "active ownership",
    "governance",
    "private equity",
    "Head Oversea",
  ],
});

export const dynamic = "force-dynamic";

export default async function EnglishInsightsPage() {
  const items = await getPublicInsights("en");
  return <InsightsPageView locale="en" items={items} />;
}
