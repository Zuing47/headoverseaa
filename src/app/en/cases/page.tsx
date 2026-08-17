import { CasesPageView } from "@/components/pages/CasesPageView";
import { InteriorJsonLd, homeCrumb } from "@/components/seo/InteriorJsonLd";
import { getContent } from "@/lib/content";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Portfolio",
  description:
    "Head Oversea portfolio companies in the United States — private equity and real estate with active ownership.",
  path: "/en/cases",
  image: "/images/empresas/riolaser.jpg",
  imageAlt:
    "Riolaser — Head Oversea private equity portfolio company in the United States",
  keywords: [
    "portfolio",
    "private equity",
    "cases",
    "Head Oversea",
    "Riolaser",
    "Drakkar",
  ],
});

export default function EnglishCasesPage() {
  return (
    <>
      <InteriorJsonLd
        locale="en"
        path="/en/cases"
        name="Portfolio"
        description="Head Oversea portfolio companies in the United States — private equity and real estate with active ownership."
        type="CollectionPage"
        crumbs={[homeCrumb("en"), { name: "Portfolio", path: "/en/cases" }]}
      />
      <CasesPageView
        content={getContent("en")}
        locale="en"
        subtitle="Ownership positions — with selected brand engagements as appendix."
      />
    </>
  );
}
