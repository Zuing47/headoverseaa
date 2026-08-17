import type { Metadata } from "next";
import { MaterialsPageView } from "@/components/pages/MaterialsPageView";
import { InteriorJsonLd, homeCrumb } from "@/components/seo/InteriorJsonLd";
import { pageMeta } from "@/lib/seo";
import { DEFAULT_OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Materiais de estudo",
  description:
    "Guias Head Oversea para download — private equity, real estate, expansão Brasil–EUA, governança e narrativa institucional.",
  path: "/materiais",
  image: DEFAULT_OG_IMAGE,
  imageAlt: "Head Oversea — materiais de estudo",
  keywords: [
    "materiais",
    "guias",
    "private equity",
    "real estate",
    "Head Oversea",
    "estudo",
  ],
});

export default function MateriaisPage() {
  return (
    <>
      <InteriorJsonLd
        locale="pt"
        path="/materiais"
        name="Materiais de estudo"
        description="Guias Head Oversea para download — private equity, real estate, expansão Brasil–EUA, governança e narrativa institucional."
        type="CollectionPage"
        crumbs={[homeCrumb("pt"), { name: "Materiais", path: "/materiais" }]}
      />
      <MaterialsPageView locale="pt" />
    </>
  );
}
