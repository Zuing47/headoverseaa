import type { Metadata } from "next";
import { MaterialsPageView } from "@/components/pages/MaterialsPageView";
import { InteriorJsonLd, homeCrumb } from "@/components/seo/InteriorJsonLd";
import { pageMeta } from "@/lib/seo";
import { DEFAULT_OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Study materials",
  description:
    "Downloadable Head Oversea guides — private equity, real estate, Brazil–U.S. expansion, governance, and institutional narrative.",
  path: "/en/materials",
  image: DEFAULT_OG_IMAGE,
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
  return (
    <>
      <InteriorJsonLd
        locale="en"
        path="/en/materials"
        name="Study materials"
        description="Downloadable Head Oversea guides — private equity, real estate, Brazil–U.S. expansion, governance, and institutional narrative."
        type="CollectionPage"
        crumbs={[homeCrumb("en"), { name: "Materials", path: "/en/materials" }]}
      />
      <MaterialsPageView locale="en" />
    </>
  );
}
