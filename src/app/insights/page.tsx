import { InsightsPageView } from "@/components/pages/InsightsPageView";
import type { Metadata } from "next";
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
    "internacionalização",
    "governança",
    "private equity",
    "Head Oversea",
  ],
});

export default function InsightsPage() {
  return <InsightsPageView locale="pt" />;
}
