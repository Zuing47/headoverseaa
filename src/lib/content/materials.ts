import type { Locale } from "@/types/content";

export type MaterialsCategory = "start" | "portfolio" | "assets";

export type MaterialsGuide = {
  id: string;
  category: MaterialsCategory;
  /** Filename under /guides/files/ (no locale — PDFs are bilingual-ready EN pack) */
  file: string;
  title: { pt: string; en: string };
  blurb: { pt: string; en: string };
};

export type MaterialsSection = {
  id: MaterialsCategory;
  label: { pt: string; en: string };
  title: { pt: string; en: string };
  tone: "dark" | "light";
};

export const MATERIALS_SECTIONS: MaterialsSection[] = [
  {
    id: "start",
    label: { pt: "Começar", en: "Getting started" },
    title: {
      pt: "Primeiros passos com clareza.",
      en: "First steps with clarity.",
    },
    tone: "dark",
  },
  {
    id: "portfolio",
    label: { pt: "Portfólio", en: "Portfolio" },
    title: {
      pt: "Alocação, diversificação e expansão.",
      en: "Allocation, diversification, and expansion.",
    },
    tone: "light",
  },
  {
    id: "assets",
    label: { pt: "Ativos", en: "Asset classes" },
    title: {
      pt: "Private markets em profundidade.",
      en: "Private markets in depth.",
    },
    tone: "dark",
  },
];

export const MATERIALS_GUIDES: MaterialsGuide[] = [
  {
    id: "how-to-get-started",
    category: "start",
    file: "how-to-get-started.pdf",
    title: {
      pt: "How to Get Started",
      en: "How to Get Started",
    },
    blurb: {
      pt: "O ponto de partida para entender private markets com linguagem clara.",
      en: "The starting point to understand private markets in clear language.",
    },
  },
  {
    id: "private-markets",
    category: "start",
    file: "private-markets.pdf",
    title: {
      pt: "Private Markets",
      en: "Private Markets",
    },
    blurb: {
      pt: "O mapa dos mercados privados — o que são, por que importam e como entram na conversa.",
      en: "A map of private markets — what they are, why they matter, and how they enter the conversation.",
    },
  },
  {
    id: "risks-liquidity",
    category: "start",
    file: "risks-liquidity.pdf",
    title: {
      pt: "Risks, Liquidity & What to Watch",
      en: "Risks, Liquidity & What to Watch",
    },
    blurb: {
      pt: "Riscos, liquidez e o que observar antes de comprometer capital.",
      en: "Risks, liquidity, and what to watch before committing capital.",
    },
  },
  {
    id: "diversification-portfolio-design",
    category: "portfolio",
    file: "diversification-portfolio-design.pdf",
    title: {
      pt: "Diversification & Portfolio Design",
      en: "Diversification & Portfolio Design",
    },
    blurb: {
      pt: "Como desenhar exposição a private markets com diversificação real.",
      en: "How to design private-markets exposure with real diversification.",
    },
  },
  {
    id: "how-to-expand-allocation",
    category: "portfolio",
    file: "how-to-expand-allocation.pdf",
    title: {
      pt: "How to Expand Your Allocation",
      en: "How to Expand Your Allocation",
    },
    blurb: {
      pt: "Quando e como ampliar a alocação — com método, não com pressa.",
      en: "When and how to expand allocation — with method, not haste.",
    },
  },
  {
    id: "private-credit",
    category: "assets",
    file: "private-credit.pdf",
    title: {
      pt: "Private Credit",
      en: "Private Credit",
    },
    blurb: {
      pt: "Crédito privado: papel na carteira, risco e o que diferencia a tese.",
      en: "Private credit: role in the portfolio, risk, and what sets the thesis apart.",
    },
  },
  {
    id: "real-estate-and-private-equity",
    category: "assets",
    file: "real-estate-and-private-equity.pdf",
    title: {
      pt: "Real Estate and Private Equity",
      en: "Real Estate and Private Equity",
    },
    blurb: {
      pt: "Dois pilares de private markets — ativos reais e ownership em empresas.",
      en: "Two pillars of private markets — real assets and ownership in companies.",
    },
  },
];

/** Single official cover for every guide card. */
export const MATERIALS_OFFICIAL_COVER = "/guides/covers/official-cover.jpg";

export function guidePdfPath(guide: MaterialsGuide): string {
  return `/guides/files/${guide.file}`;
}

export function guideCoverPath(): string {
  return MATERIALS_OFFICIAL_COVER;
}

export function guidesForCategory(category: MaterialsCategory): MaterialsGuide[] {
  return MATERIALS_GUIDES.filter((g) => g.category === category);
}
