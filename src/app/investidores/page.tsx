import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { InvestorsPageView } from "@/components/pages/InvestorsPageView";
import { InteriorJsonLd, homeCrumb } from "@/components/seo/InteriorJsonLd";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Para Investidores",
  description:
    "Deal flow qualificado de médio porte no Brasil e nos EUA, com um sócio operacional local, tese transparente e governança ativa sobre cada ativo do portfólio.",
  path: "/investidores",
  keywords: [
    "investidores",
    "private equity",
    "middle market",
    "Head Oversea",
    "Brasil Estados Unidos",
  ],
});

export default function InvestidoresPage() {
  return (
    <>
      <InteriorJsonLd
        locale="pt"
        path="/investidores"
        name="Para Investidores"
        description="Deal flow qualificado de médio porte no Brasil e nos EUA, com um sócio operacional local, tese transparente e governança ativa sobre cada ativo do portfólio."
        crumbs={[
          homeCrumb("pt"),
          { name: "Investidores", path: "/investidores" },
        ]}
      />
      <InvestorsPageView content={getContent("pt")} locale="pt" />
    </>
  );
}
