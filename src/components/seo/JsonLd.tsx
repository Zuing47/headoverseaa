import Script from "next/script";

const SITE_URL = "https://headoversea.com";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#organization`,
  name: "Head Oversea",
  alternateName: "Head Oversea Private Equity & Real Estate",
  description:
    "Active ownership and long-term investment across private equity and real estate in Brazil and the United States.",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-white.svg`,
  image: [
    `${SITE_URL}/og-nyc.jpg`,
    `${SITE_URL}/images/us-skyline-presence.jpg`,
    `${SITE_URL}/images/private-equity-team-collaboration.jpg`,
    `${SITE_URL}/images/luxury-residential-real-estate.jpg`,
  ],
  email: "contact@headoversea.com",
  telephone: "+1-689-777-1149",
  priceRange: "$$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "189 South Orange Ave, Ste 1250, South Tower",
    addressLocality: "Orlando",
    addressRegion: "FL",
    postalCode: "32801",
    addressCountry: "US",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-689-777-1149",
    email: "contact@headoversea.com",
    contactType: "sales",
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
  ],
  foundingDate: "2022",
  sameAs: [] as string[],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Head Oversea",
  inLanguage: ["pt-BR", "en-US"],
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export function JsonLd() {
  return (
    <Script
      id="jsonld-graph"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [organizationSchema, websiteSchema],
        }),
      }}
    />
  );
}
