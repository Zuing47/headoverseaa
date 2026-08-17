import { ServicesPageView } from "@/components/pages/ServicesPageView";
import { getContent } from "@/lib/content";
import type { Metadata } from "next";
import { InteriorJsonLd, homeCrumb } from "@/components/seo/InteriorJsonLd";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Quatro frentes | Private Equity e Real Estate",
  description:
    "Ownership ativo, corredor Brasil–EUA, criação de valor e liquidez, e real estate — quatro frentes de uma tese Head Oversea.",
  path: "/servicos",
  keywords: [
    "private equity",
    "real estate",
    "active ownership",
    "Head Oversea",
    "Brasil Estados Unidos",
  ],
});

export default function ServicesPage() {
  return (
    <>
      <InteriorJsonLd
        locale="pt"
        path="/servicos"
        name="Quatro frentes | Private Equity e Real Estate"
        description="Ownership ativo, corredor Brasil–EUA, criação de valor e liquidez, e real estate — quatro frentes de uma tese Head Oversea."
        crumbs={[
          homeCrumb("pt"),
          { name: "Quatro frentes", path: "/servicos" },
        ]}
      />
      <ServicesPageView content={getContent("pt")} locale="pt" />
    </>
  );
}
