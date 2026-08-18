import type { Locale } from "@/types/content";

const WHY_FAQ = {
  pt: [
    {
      question: "O que diferencia a Head Oversea?",
      answer:
        "Presença real Brasil–EUA, ownership ativo e execução operacional — não capital à distância nem consultoria pontual.",
    },
    {
      question: "Como funciona a presença nos dois mercados?",
      answer:
        "Originação e relações de confiança no Brasil; estrutura, disciplina e escala nos Estados Unidos, com a firma operando nos dois lados.",
    },
    {
      question: "Para quem é a conversa?",
      answer:
        "Fundadores, lideranças e investidores alinhados a horizonte longo, governança ativa e construção de valor em private equity e real estate.",
    },
    {
      question: "Como começar?",
      answer:
        "Por uma conversa de qualificação. Avaliamos tese, momento e aderência antes de qualquer proposta de parceria.",
    },
  ],
  en: [
    {
      question: "What sets Head Oversea apart?",
      answer:
        "Real Brazil–U.S. presence, active ownership, and operational execution — not distant capital or one-off consulting.",
    },
    {
      question: "How does presence in both markets work?",
      answer:
        "Origination and relationships of trust in Brazil; structure, discipline, and scale in the United States, with the firm operating on both sides.",
    },
    {
      question: "Who is the conversation for?",
      answer:
        "Founders, leaders, and investors aligned with a long horizon, active governance, and value building in private equity and real estate.",
    },
    {
      question: "How do we start?",
      answer:
        "With a qualification conversation. We assess thesis, timing, and fit before any partnership proposal.",
    },
  ],
} as const;

/** Server-safe FAQ for Why Head Oversea (JSON-LD + page UI). */
export function getWhyFaq(locale: Locale) {
  return WHY_FAQ[locale].map((item) => ({
    question: item.question,
    answer: item.answer,
  }));
}
