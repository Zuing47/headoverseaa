import Script from "next/script";
import { getPeFaqEntities } from "@/lib/content/pe-learn";
import type { Locale } from "@/types/content";

const SITE_URL = "https://headoversea.com";

export function PePageJsonLd({ locale }: { locale: Locale }) {
  const path = locale === "en" ? "/en/private-equity" : "/private-equity";
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}${path}#faq`,
    mainEntity: getPeFaqEntities(locale),
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
        ? "Private Equity — Active Ownership | Head Oversea"
        : "Private Equity — Active Ownership | Head Oversea",
    description:
      locale === "en"
        ? "Learn active ownership, Brazil–U.S. private equity, governance as a valuation lever, and the ownership cycle guided by Head Oversea."
        : "Aprenda active ownership, private equity Brasil–EUA, governança como alavanca de valuation e o ciclo de ownership da Head Oversea.",
    inLanguage: locale === "en" ? "en-US" : "pt-BR",
    about: [
      "Private Equity",
      "Active Ownership",
      "Cross-border Investment",
      "Corporate Governance",
    ],
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <Script
      id={`jsonld-pe-${locale}`}
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
