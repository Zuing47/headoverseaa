import type { Metadata } from "next";
import { MaterialsPageView } from "@/components/pages/MaterialsPageView";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Study materials",
  description:
    "Downloadable Head Oversea guides — private equity, real estate, Brazil–U.S. expansion, governance, and institutional narrative.",
  path: "/en/materials",
  image: "/og-nyc.jpg",
  imageAlt: "Head Oversea — study materials",
  keywords: [
    "materials",
    "guides",
    "private equity",
    "real estate",
    "Head Oversea",
    "study",
  ],
});

export default function MaterialsPageEn() {
  return <MaterialsPageView locale="en" />;
}
