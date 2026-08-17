import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  HomeHero,
  FirmAbout,
  InvestmentPillars,
  ApproachBand,
  StoryBand,
  PortfolioGrid,
  InsightsSignup,
} from "@/components/home";
import { InteriorJsonLd, homeCrumb } from "@/components/seo/InteriorJsonLd";
import { DEFAULT_OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Head Oversea | Private Equity & Real Estate",
  description:
    "Private equity and real estate investment firm — active ownership and long-term value across Brazil and the United States.",
  path: "/",
  image: DEFAULT_OG_IMAGE,
  imageAlt:
    "Head Oversea — Private Equity & Real Estate across Brazil and the United States",
  keywords: [
    "Head Oversea",
    "private equity",
    "real estate",
    "active ownership",
    "investment firm",
    "Brazil",
    "United States",
  ],
});

/** Default homepage — English. */
export default function HomePage() {
  const content = getContent("en");

  return (
    <>
      <InteriorJsonLd
        locale="en"
        path="/"
        name="Head Oversea | Private Equity & Real Estate"
        description="Private equity and real estate investment firm — active ownership and long-term value across Brazil and the United States."
        crumbs={[homeCrumb("en")]}
      />
      <main className="bg-black text-white" style={{ overflowX: "clip" }}>
        <Header content={content} locale="en" />
        <HomeHero content={content} locale="en" />
        <FirmAbout content={content} locale="en" />
        <InvestmentPillars locale="en" />
        <ApproachBand locale="en" />
        <PortfolioGrid content={content} locale="en" />
        <StoryBand locale="en" />
        <InsightsSignup locale="en" />
        <Footer content={content} locale="en" />
      </main>
    </>
  );
}
