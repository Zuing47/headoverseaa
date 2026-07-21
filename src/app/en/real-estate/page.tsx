import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { RealEstatePageView } from "@/components/pages/RealEstatePageView";
import { RePageJsonLd } from "@/components/seo/RePageJsonLd";

export const metadata: Metadata = pageMeta({
  title: "Real Estate | Real Assets Brazil–U.S.",
  description:
    "Head Oversea Real Estate: patient capital, selective origination, and active stewardship of real assets across Brazil and the United States — including Geromel Construction and Superbloom Real Estate.",
  path: "/en/real-estate",
  image: "/images/real-estate-nyc-skyline.png",
  imageAlt:
    "New York skyline — Head Oversea Real Estate, real assets across Brazil and the United States",
  keywords: [
    "real estate",
    "real assets",
    "Brazil United States real estate",
    "institutional real estate",
    "Geromel Construction",
    "Superbloom Real Estate",
    "Head Oversea",
    "patient capital",
    "private real estate",
  ],
});

export default function EnRealEstatePage() {
  return (
    <>
      <RePageJsonLd locale="en" />
      <RealEstatePageView content={getContent("en")} locale="en" />
    </>
  );
}
