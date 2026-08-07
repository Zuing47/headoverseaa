import { AboutPageView } from "@/components/pages/AboutPageView";
import { AboutTeamJsonLd } from "@/components/seo/AboutTeamJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { getContent } from "@/lib/content";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "About us",
  description:
    "Meet Head Oversea — a private equity and real estate firm with active ownership across Brazil and the United States.",
  path: "/en/about",
  image: "/images/private-equity-team-collaboration.jpg",
  imageAlt: "Head Oversea — About us",
  keywords: [
    "about us",
    "Head Oversea",
    "team",
    "Douglas Bubna",
    "private equity",
    "active ownership",
  ],
});

export default function EnglishAboutPage() {
  const content = getContent("en");
  return (
    <>
      <AboutTeamJsonLd team={content.about.team} locale="en" />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "About", path: "/en/about" },
        ]}
      />
      <AboutPageView content={content} locale="en" />
    </>
  );
}
