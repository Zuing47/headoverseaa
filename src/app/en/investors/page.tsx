import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { InvestorsPageView } from "@/components/pages/InvestorsPageView";
import { InteriorJsonLd, homeCrumb } from "@/components/seo/InteriorJsonLd";

export const metadata: Metadata = pageMeta({
  title: "For Investors",
  description:
    "Qualified mid-market deal flow in Brazil and the U.S., with a local operating partner, a clear thesis, and active governance over every portfolio asset.",
  path: "/en/investors",
});

export default function EnInvestorsPage() {
  return (
    <>
      <InteriorJsonLd
        locale="en"
        path="/en/investors"
        name="For Investors"
        description="Qualified mid-market deal flow in Brazil and the U.S., with a local operating partner, a clear thesis, and active governance over every portfolio asset."
        crumbs={[homeCrumb("en"), { name: "Investors", path: "/en/investors" }]}
      />
      <InvestorsPageView content={getContent("en")} locale="en" />
    </>
  );
}
