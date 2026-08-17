import { JsonLdScript } from "./JsonLdScript";
import { breadcrumbList, homeCrumb } from "./InteriorJsonLd";
import { getReFaqEntities } from "@/lib/content/re-learn";
import type { Locale } from "@/types/content";
import {
  absoluteUrl,
  getPublicSiteUrl,
  organizationId,
  schemaInLanguage,
  websiteId,
} from "@/lib/site";

export function RePageJsonLd({ locale }: { locale: Locale }) {
  const origin = getPublicSiteUrl();
  const path = locale === "en" ? "/en/real-estate" : "/real-estate";
  const url = absoluteUrl(path, origin);
  const inLanguage = schemaInLanguage(locale);
  const name =
    locale === "en"
      ? "Real Estate — Real Assets Brazil–U.S. | Head Oversea"
      : "Real Estate — Ativos reais Brasil–EUA | Head Oversea";
  const description =
    locale === "en"
      ? "Head Oversea Real Estate: patient capital, selective origination, and active stewardship of real assets across Brazil and the United States — including Geromel and Superbloom."
      : "Head Oversea Real Estate: capital paciente, originação seletiva e gestão presente de ativos reais entre Brasil e Estados Unidos — incluindo Geromel e Superbloom.";

  const crumbs = [
    homeCrumb(locale),
    { name: "Real Estate", path },
  ];
  const breadcrumb = breadcrumbList(crumbs, origin);

  const service = {
    "@type": "Service",
    "@id": `${url}#service`,
    name: "Real Estate",
    serviceType: "Real Estate",
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
    mainEntity: getReFaqEntities(locale),
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
    about: [
      "Real Estate",
      "Real Assets",
      "Geromel Construction",
      "Superbloom Real Estate",
    ],
    publisher: { "@id": organizationId(origin) },
    isPartOf: { "@id": websiteId(origin) },
    mainEntity: { "@id": `${url}#service` },
    breadcrumb: { "@id": breadcrumb["@id"] },
  };

  return (
    <JsonLdScript
      id={`jsonld-re-${locale}`}
      data={{
        "@context": "https://schema.org",
        "@graph": [page, service, faq, breadcrumb],
      }}
    />
  );
}
