import type { Locale } from "@/types/content";

export type ReFaqItem = { question: string; answer: string };

const FAQ: Record<Locale, ReFaqItem[]> = {
  pt: [
    {
      question: "O que a Head Oversea faz em Real Estate?",
      answer:
        "Investimos e estruturamos ativos reais com capital paciente, disciplina de alocação e presença operacional entre Brasil e Estados Unidos — com a mesma lógica de ownership ativo do private equity.",
    },
    {
      question: "Quais tipos de ativos entram na tese?",
      answer:
        "Priorizamos ativos com localização, uso e tese claras: construção, plataformas imobiliárias e imóveis com potencial de valor durável sob gestão presente — não especulação de curto prazo.",
    },
    {
      question: "Como funciona o corredor Brasil–Estados Unidos?",
      answer:
        "Originação e confiança no Brasil; estrutura, disciplina e escala nos EUA. A firma opera com presença nos dois lados para avaliar, alocar e acompanhar cada ativo.",
    },
    {
      question: "Geromel e Superbloom fazem parte do portfólio?",
      answer:
        "Sim. Geromel Construction e Superbloom Real Estate são exemplos de real estate na plataforma — construção e plataforma imobiliária estruturadas com horizonte longo.",
    },
    {
      question: "Como começar uma conversa sobre real assets?",
      answer:
        "Pelo contato da firma. Avaliamos aderência à tese, momento do ativo e o papel dele no corredor Brasil–EUA antes de qualquer proposta de parceria.",
    },
  ],
  en: [
    {
      question: "What does Head Oversea do in Real Estate?",
      answer:
        "We invest in and structure real assets with patient capital, allocation discipline, and operating presence across Brazil and the United States — with the same active-ownership logic as our private equity work.",
    },
    {
      question: "What kinds of assets fit the thesis?",
      answer:
        "We prioritize assets with clear location, use, and thesis: construction, real estate platforms, and properties with durable value potential under present stewardship — not short-term speculation.",
    },
    {
      question: "How does the Brazil–United States corridor work?",
      answer:
        "Origination and trust in Brazil; structure, discipline, and scale in the U.S. The firm operates with presence on both sides to underwrite, allocate, and oversee each asset.",
    },
    {
      question: "Are Geromel and Superbloom part of the platform?",
      answer:
        "Yes. Geromel Construction and Superbloom Real Estate are real estate examples on the platform — construction and a real estate platform structured for a long horizon.",
    },
    {
      question: "How do we start a conversation about real assets?",
      answer:
        "Through the firm’s contact channel. We assess thesis fit, asset moment, and its role in the Brazil–U.S. corridor before any partnership proposal.",
    },
  ],
};

export function getReFaq(locale: Locale): ReFaqItem[] {
  return FAQ[locale];
}

export function getReFaqEntities(locale: Locale) {
  return getReFaq(locale).map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  }));
}
