import { ServicesPageView } from "@/components/pages/ServicesPageView";
import { getContent } from "@/lib/content";
import type { Metadata } from "next";
import { InteriorJsonLd, homeCrumb } from "@/components/seo/InteriorJsonLd";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Four fronts | Private Equity & Real Estate",
  description:
    "Active ownership, Brazil–U.S. corridor, value creation and liquidity, and real estate — four fronts of one Head Oversea thesis.",
  path: "/en/services",
  keywords: [
    "private equity",
    "real estate",
    "active ownership",
    "Head Oversea",
    "Brazil United States",
  ],
});

export default function EnglishServicesPage() {
  return (
    <>
      <InteriorJsonLd
        locale="en"
        path="/en/services"
        name="Four fronts | Private Equity & Real Estate"
        description="Active ownership, Brazil–U.S. corridor, value creation and liquidity, and real estate — four fronts of one Head Oversea thesis."
        crumbs={[
          homeCrumb("en"),
          { name: "Four fronts", path: "/en/services" },
        ]}
      />
      <ServicesPageView content={getContent("en")} locale="en" />
    </>
  );
}
