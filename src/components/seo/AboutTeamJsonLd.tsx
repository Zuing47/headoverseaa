import Script from "next/script";
import type { Locale, TeamMember } from "@/types/content";

const SITE_URL = "https://headoversea.com";

type AboutTeamJsonLdProps = {
  team: TeamMember[];
  locale: Locale;
};

/** Person schemas for leadership — strengthens E-E-A-T on About. */
export function AboutTeamJsonLd({ team, locale }: AboutTeamJsonLdProps) {
  const aboutPath = locale === "en" ? "/en/about" : "/sobre";
  const people = team.map((member, index) => {
    const personId = `${SITE_URL}${aboutPath}#person-${index}`;
    return {
      "@type": "Person",
      "@id": personId,
      name: member.name,
      jobTitle: member.role,
      description: member.bio,
      ...(member.photo
        ? {
            image: member.photo.startsWith("http")
              ? member.photo
              : `${SITE_URL}${member.photo}`,
          }
        : {}),
      ...(member.linkedin && member.linkedin !== "#"
        ? { sameAs: [member.linkedin], url: member.linkedin }
        : {}),
      worksFor: { "@id": `${SITE_URL}/#organization` },
    };
  });

  const page = {
    "@type": "AboutPage",
    "@id": `${SITE_URL}${aboutPath}`,
    url: `${SITE_URL}${aboutPath}`,
    name:
      locale === "en"
        ? "About Head Oversea"
        : "Sobre a Head Oversea",
    inLanguage: locale === "en" ? "en-US" : "pt-BR",
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntity: people.map((p) => ({ "@id": p["@id"] })),
  };

  return (
    <Script
      id={`jsonld-about-team-${locale}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [page, ...people],
        }),
      }}
    />
  );
}
