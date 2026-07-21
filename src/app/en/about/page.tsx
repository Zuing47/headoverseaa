import { AboutPageView } from "@/components/pages/AboutPageView";
import { getContent } from "@/lib/content";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "About us",
  description:
    "Meet Head Oversea — the firm and the people behind the equity across Brazil and the United States.",
  path: "/en/about",
  image: "/images/private-equity-team-collaboration.jpg",
  imageAlt: "Head Oversea — About us",
  keywords: ["about us", "Head Oversea", "team", "Douglas Bubna"],
});

export default function EnglishAboutPage() {
  return <AboutPageView content={getContent("en")} locale="en" />;
}
