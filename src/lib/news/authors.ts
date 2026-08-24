/**
 * Stable news bylines — same people/photos as About Us.
 * IDs are intentional keys stored on NewsArticleRecord.authorId.
 */

export type NewsAuthor = {
  id: string;
  name: string;
  rolePt: string;
  roleEn: string;
  photo: string;
};

export const NEWS_AUTHORS: readonly NewsAuthor[] = [
  {
    id: "douglas-bubna",
    name: "Douglas Bubna",
    rolePt: "CEO & Founder",
    roleEn: "CEO & Founder",
    photo: "/images/team/Douglas.jpg",
  },
  {
    id: "lucas-policarpo",
    name: "Lucas Policarpo",
    rolePt: "CFO & Founder",
    roleEn: "CFO & Founder",
    photo: "/images/team/Lucas.jpg",
  },
  {
    id: "beatriz-nicola",
    name: "Beatriz Nicola",
    rolePt: "Líder de Marketing",
    roleEn: "Marketing Lead",
    photo: "/images/team/beatriz.jpg",
  },
  {
    id: "jakson-martins",
    name: "Jakson Martins",
    rolePt: "Project Manager",
    roleEn: "Project Manager",
    photo: "/images/team/Jakson.jpg",
  },
  {
    id: "mariana-levandoski",
    name: "Mariana Levandoski",
    rolePt: "Coordenadora de RH",
    roleEn: "HR Coordinator",
    photo: "/images/team/mariana.jpg",
  },
  {
    id: "thales-de-lorenzi",
    name: "Thales De Lorenzi",
    rolePt: "Business Development",
    roleEn: "Business Development",
    photo: "/images/team/thales.jpg",
  },
  {
    id: "rafael-zardo",
    name: "Rafael Zardo",
    rolePt: "Corporate Controller",
    roleEn: "Corporate Controller",
    photo: "/images/team/rafael.jpg",
  },
  {
    id: "pedro-castro",
    name: "Pedro Castro",
    rolePt: "Analista Financeiro",
    roleEn: "Financial Analyst",
    photo: "/images/team/Pedro-Castro.jpg",
  },
  {
    id: "joyce",
    name: "Joyce",
    rolePt: "Assistente de Marketing",
    roleEn: "Marketing Assistant",
    photo: "/images/team/joyce.jpg",
  },
  {
    id: "marcela-portela",
    name: "Marcela Portela",
    rolePt: "Analista Financeiro",
    roleEn: "Financial Analyst",
    photo: "/images/team/marcela-portela.png",
  },
  {
    id: "mateus-lucas",
    name: "Mateus Lucas",
    rolePt: "Technology Junior",
    roleEn: "Technology Junior",
    photo: "/images/team/mateus.jpg",
  },
] as const;

const BY_ID = new Map(NEWS_AUTHORS.map((a) => [a.id, a]));

export function isNewsAuthorId(raw: unknown): raw is string {
  return typeof raw === "string" && BY_ID.has(raw);
}

export function getNewsAuthor(id: string | null | undefined): NewsAuthor | null {
  if (!id) return null;
  return BY_ID.get(id) ?? null;
}

export function authorRole(author: NewsAuthor, locale: "pt" | "en"): string {
  return locale === "en" ? author.roleEn : author.rolePt;
}

/** Pending queue TTL — auto-deleted after this age. */
export const PENDING_NEWS_TTL_MS = 2 * 24 * 60 * 60 * 1000;
