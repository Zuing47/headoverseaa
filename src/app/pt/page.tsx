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

export const metadata: Metadata = pageMeta({
  title: "Head Oversea | Private Equity & Real Estate",
  description:
    "Firma de investimento em private equity e real estate — ownership ativo e valor de longo prazo no Brasil e nos Estados Unidos.",
  path: "/pt",
  image: "/og-nyc.jpg",
  imageAlt:
    "Head Oversea — Private Equity & Real Estate entre Brasil e Estados Unidos",
  keywords: [
    "Head Oversea",
    "private equity",
    "real estate",
    "ownership ativo",
    "investment firm",
    "Brasil",
    "Estados Unidos",
  ],
});

/** Portuguese homepage. */
export default function PtHomePage() {
  const content = getContent("pt");

  return (
    <main className="bg-black text-white" style={{ overflowX: "clip" }}>
      <Header content={content} locale="pt" />
      <HomeHero content={content} locale="pt" />
      <FirmAbout content={content} locale="pt" />
      <InvestmentPillars locale="pt" />
      <ApproachBand locale="pt" />
      <PortfolioGrid content={content} locale="pt" />
      <StoryBand locale="pt" />
      <InsightsSignup locale="pt" />
      <Footer content={content} locale="pt" />
    </main>
  );
}
