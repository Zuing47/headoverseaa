import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { WhyHeadOverseaPageView } from "@/components/pages/WhyHeadOverseaPageView";

export const metadata: Metadata = pageMeta({
  title: "Why Head Oversea | For Investors",
  description:
    "Why invest with Head Oversea: active ownership across Brazil and the U.S., real operating presence, selective deal flow, and a track record in equity — for family offices and institutional investors.",
  path: "/en/why-head-oversea",
  image: "/images/us-skyline-presence.jpg",
  imageAlt:
    "United States presence — Head Oversea private equity and real estate",
  keywords: [
    "why Head Oversea",
    "Brazil US private equity",
    "active ownership",
    "family office",
    "institutional investors",
    "Head Oversea",
  ],
});

export default function WhyHeadOverseaPage() {
  return (
    <WhyHeadOverseaPageView content={getContent("en")} locale="en" />
  );
}
