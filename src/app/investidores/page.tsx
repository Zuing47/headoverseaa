import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { InvestorsPageView } from "@/components/pages/InvestorsPageView";

export const metadata: Metadata = {
  alternates: { canonical: "/investidores" },
  title: "Para Investidores",
  description:
    "Deal flow qualificado de médio porte no Brasil e nos EUA, com um sócio operacional local, tese transparente e governança ativa sobre cada ativo do portfólio.",
};

export default function InvestidoresPage() {
  return (
    <InvestorsPageView content={getContent("pt")} locale="pt" />
  );
}
