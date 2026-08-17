import { JsonLdScript } from "./JsonLdScript";
import {
  ORG,
  absoluteUrl,
  getPublicSiteUrl,
  organizationId,
  websiteId,
} from "@/lib/site";

export function organizationGraph(origin = getPublicSiteUrl()) {
  return {
    "@type": ["Organization", "FinancialService"],
    "@id": organizationId(origin),
    name: ORG.name,
    legalName: ORG.legalName,
    alternateName: ORG.alternateName,
    description:
      "Active ownership and long-term investment across private equity and real estate in Brazil and the United States.",
    url: origin,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(ORG.logoPath, origin),
    },
    image: [absoluteUrl("/images/us-skyline-presence.jpg", origin)],
    email: ORG.email,
    telephone: ORG.telephone,
    foundingDate: ORG.foundingDate,
    address: {
      "@type": "PostalAddress",
      ...ORG.address,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: ORG.telephone,
      email: ORG.email,
      contactType: "customer service",
      availableLanguage: ["Portuguese", "English"],
    },
    areaServed: [
      { "@type": "Country", name: "Brazil" },
      { "@type": "Country", name: "United States" },
    ],
    knowsAbout: [
      "Private Equity",
      "Real Estate",
      "Active Ownership",
      "Corporate Governance",
      "Long-term Investment",
      "Cross-border Investment",
      "Middle Market",
    ],
    sameAs: [...ORG.sameAs],
  };
}

export function websiteGraph(origin = getPublicSiteUrl()) {
  return {
    "@type": "WebSite",
    "@id": websiteId(origin),
    url: origin,
    name: ORG.name,
    inLanguage: ["en-US", "pt-BR"],
    publisher: { "@id": organizationId(origin) },
  };
}

export function JsonLd() {
  const origin = getPublicSiteUrl();
  return (
    <JsonLdScript
      id="jsonld-graph"
      data={{
        "@context": "https://schema.org",
        "@graph": [organizationGraph(origin), websiteGraph(origin)],
      }}
    />
  );
}
