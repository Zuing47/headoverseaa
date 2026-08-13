import { InsightsPageView } from "@/components/pages/InsightsPageView";
import type { Metadata } from "next";
import { getPublicInsights } from "@/lib/news/public";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "News",
  description:
    "Notícias e perspectivas da Head Oversea — firma, portfólio e mercados entre Brasil e Estados Unidos.",
  path: "/insights",
  image: "/images/nyc-chrysler-building-midtown.jpg",
  imageAlt: "Midtown Manhattan — Head Oversea news",
  keywords: [
    "news",
    "notícias",
    "active ownership",
    "governança",
    "private equity",
    "Head Oversea",
  ],
});

export const dynamic = "force-dynamic";

export default async function InsightsPage() {
  const items = await getPublicInsights("pt");
  return <InsightsPageView locale="pt" items={items} />;
}
