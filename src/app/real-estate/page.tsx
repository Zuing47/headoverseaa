import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { RealEstatePageView } from "@/components/pages/RealEstatePageView";
import { RePageJsonLd } from "@/components/seo/RePageJsonLd";

export const metadata: Metadata = pageMeta({
  title: "Real Estate | Ativos reais Brasil–EUA",
  description:
    "Real Estate Head Oversea: capital paciente, originação seletiva e gestão presente de ativos reais entre Brasil e Estados Unidos. Portfólio com Geromel Construction e Superbloom Real Estate.",
  path: "/real-estate",
  image: "/images/real-estate-nyc-skyline.png",
  imageAlt:
    "Skyline de Nova York — Head Oversea Real Estate, ativos reais Brasil e Estados Unidos",
  keywords: [
    "real estate",
    "ativos reais",
    "real estate Brasil Estados Unidos",
    "investimento imobiliário",
    "Geromel Construction",
    "Superbloom Real Estate",
    "Head Oversea",
    "capital paciente",
    "private real estate",
  ],
});

export default function RealEstatePage() {
  return (
    <>
      <RePageJsonLd locale="pt" />
      <RealEstatePageView content={getContent("pt")} locale="pt" />
    </>
  );
}
