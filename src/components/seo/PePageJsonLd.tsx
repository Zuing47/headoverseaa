import { JsonLdScript } from "./JsonLdScript";
import { breadcrumbList, homeCrumb } from "./InteriorJsonLd";
import { getPeFaqEntities } from "@/lib/content/pe-learn";
import type { Locale } from "@/types/content";
import {
  absoluteUrl,
  getPublicSiteUrl,
  organizationId,
  schemaInLanguage,
  websiteId,
} from "@/lib/site";

export function PePageJsonLd({ locale }: { locale: Locale }) {
  const origin = getPublicSiteUrl();
  const path = locale === "en" ? "/en/private-equity" : "/private-equity";
  const url = absoluteUrl(path, origin);
  const inLanguage = schemaInLanguage(locale);
  const name =
    locale === "en"
      ? "Private Equity — Active Ownership | Head Oversea"
      : "Private Equity — Active Ownership | Head Oversea";
  const description =
    locale === "en"
      ? "Learn active ownership, Brazil–U.S. private equity, governance as a valuation lever, and the ownership cycle guided by Head Oversea."
      : "Aprenda active ownership, private equity Brasil–EUA, governança como alavanca de valuation e o ciclo de ownership da Head Oversea.";

  const crumbs = [
    homeCrumb(locale),
    {
      name: "Private Equity",
      path,
    },
  ];
  const breadcrumb = breadcrumbList(crumbs, origin);

  const service = {
    "@type": "Service",
    "@id": `${url}#service`,
    name: "Private Equity",
    serviceType: "Private Equity",
    provider: { "@id": organizationId(origin) },
    areaServed: [
      { "@type": "Country", name: "Brazil" },
      { "@type": "Country", name: "United States" },
    ],
    description,
    url,
  };

  const faq = {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: getPeFaqEntities(locale),
    inLanguage,
    isPartOf: { "@id": websiteId(origin) },
  };

  const page = {
    "@type": "WebPage",
    "@id": url,
    url,
    name,
    description,
    inLanguage,
    about: ["Private Equity", "Active Ownership", "Corporate Governance"],
    publisher: { "@id": organizationId(origin) },
    isPartOf: { "@id": websiteId(origin) },
    mainEntity: { "@id": `${url}#service` },
    breadcrumb: { "@id": breadcrumb["@id"] },
  };

  return (
    <JsonLdScript
      id={`jsonld-pe-${locale}`}
      data={{
        "@context": "https://schema.org",
        "@graph": [page, service, faq, breadcrumb],
      }}
    />
  );
}
