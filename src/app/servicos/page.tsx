import { ServicesPageView } from "@/components/pages/ServicesPageView";
import { getContent } from "@/lib/content";
import type { Metadata } from "next";
import { alternates } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: alternates("/servicos"),
  title: "Serviços",
  description:
    "Equity por serviço, Internacionalização, Assessoria em M&A e Real Estate — quatro pilares da tese Equity Builders.",
};

export default function ServicesPage() {
  return <ServicesPageView content={getContent("pt")} locale="pt" />;
}
