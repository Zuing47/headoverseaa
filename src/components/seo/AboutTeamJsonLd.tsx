import { JsonLdScript } from "./JsonLdScript";
import type { Locale, TeamMember } from "@/types/content";
import {
  absoluteUrl,
  getPublicSiteUrl,
  organizationId,
  schemaInLanguage,
  websiteId,
} from "@/lib/site";
import { breadcrumbList, homeCrumb } from "./InteriorJsonLd";

type AboutTeamJsonLdProps = {
  team: TeamMember[];
  locale: Locale;
};

/** Person schemas for leadership — E-E-A-T on About. */
export function AboutTeamJsonLd({ team, locale }: AboutTeamJsonLdProps) {
  const origin = getPublicSiteUrl();
  const aboutPath = locale === "en" ? "/en/about" : "/sobre";
  const url = absoluteUrl(aboutPath, origin);

  const people = team.map((member, index) => {
    const personId = `${url}#person-${index}`;
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
              : absoluteUrl(member.photo, origin),
          }
        : {}),
      ...(member.linkedin && member.linkedin !== "#"
        ? { sameAs: [member.linkedin], url: member.linkedin }
        : {}),
      worksFor: { "@id": organizationId(origin) },
    };
  });

  const crumbs = [
    homeCrumb(locale),
    { name: locale === "en" ? "About" : "Sobre", path: aboutPath },
  ];
  const breadcrumb = breadcrumbList(crumbs, origin);

  const page = {
    "@type": "AboutPage",
    "@id": url,
    url,
    name: locale === "en" ? "About Head Oversea" : "Sobre a Head Oversea",
    inLanguage: schemaInLanguage(locale),
    publisher: { "@id": organizationId(origin) },
    isPartOf: { "@id": websiteId(origin) },
    mainEntity: people.map((p) => ({ "@id": p["@id"] })),
    breadcrumb: { "@id": breadcrumb["@id"] },
  };

  return (
    <JsonLdScript
      id={`jsonld-about-team-${locale}`}
      data={{
        "@context": "https://schema.org",
        "@graph": [page, breadcrumb, ...people],
      }}
    />
  );
}
