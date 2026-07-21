import Script from "next/script";
import { getReFaqEntities } from "@/lib/content/re-learn";
import type { Locale } from "@/types/content";

const SITE_URL = "https://headoversea.com";

export function RePageJsonLd({ locale }: { locale: Locale }) {
  const path = locale === "en" ? "/en/real-estate" : "/real-estate";
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}${path}#faq`,
    mainEntity: getReFaqEntities(locale),
    inLanguage: locale === "en" ? "en-US" : "pt-BR",
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };

  const page = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}${path}`,
    url: `${SITE_URL}${path}`,
    name:
      locale === "en"
        ? "Real Estate — Real Assets Brazil–U.S. | Head Oversea"
        : "Real Estate — Ativos reais Brasil–EUA | Head Oversea",
    description:
      locale === "en"
        ? "Head Oversea Real Estate: patient capital, selective origination, and active stewardship of real assets across Brazil and the United States — including Geromel and Superbloom."
        : "Head Oversea Real Estate: capital paciente, originação seletiva e gestão presente de ativos reais entre Brasil e Estados Unidos — incluindo Geromel e Superbloom.",
    inLanguage: locale === "en" ? "en-US" : "pt-BR",
    about: [
      "Real Estate",
      "Real Assets",
      "Cross-border Investment",
      "Brazil United States",
      "Geromel Construction",
      "Superbloom Real Estate",
    ],
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <Script
      id={`jsonld-re-${locale}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [page, faq],
        }),
      }}
    />
  );
}
