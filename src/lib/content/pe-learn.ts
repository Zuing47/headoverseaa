import type { Locale } from "@/types/content";

export const PE_LEARN = {
  pt: {
    eyebrow: "Aprenda conosco",
    title: "O que separa capital passivo de ownership ativo.",
    intro:
      "Conteúdo original da Head Oversea para fundadores e investidores que querem entender private equity entre Brasil e EUA — sem jargão de folder.",
    topics: [
      {
        id: "ownership",
        title: "O que é ownership ativo",
        body: "Ownership ativo significa entrar como sócio com responsabilidade real: board, operação e decisões de capital. Não é cheque e espera. É presença na construção de valor — da governança à disciplina de execução — até o evento de liquidez.",
      },
      {
        id: "crossborder",
        title: "Por que Brasil ↔ Estados Unidos muda a tese",
        body: "Operar entre dois mercados exige estrutura, compliance e presença local. Originação e relacionamento no Brasil; estruturação, escala e disciplina nos EUA. A vantagem não é geografia no papel — é capacidade de executar nos dois lados.",
      },
      {
        id: "governance",
        title: "Governança como alavanca de valuation",
        body: "Controles, reporting e board bem desenhados reduzem risco e aumentam previsibilidade. Para investidores e compradores futuros, governança não é burocracia: é o que sustenta múltiplo e prepara a empresa para o próximo ciclo.",
      },
      {
        id: "path",
        title: "Do entry ao evento de liquidez",
        body: "Entramos, estruturamos, escalamos e preparamos a saída. Cada fase tem foco distinto — mas a tese é uma só: ownership ativo com horizonte longo, não atalho especulativo.",
      },
    ],
    frameworkEyebrow: "Framework",
    frameworkTitle: "O ciclo de ownership\nque guiamos.",
    frameworkNote:
      "Representação ilustrativa da tese Head Oversea — não é dado de mercado externo.",
    stages: [
      {
        n: "01",
        title: "Entry",
        body: "Tese, diligência e alinhamento com a liderança.",
      },
      {
        n: "02",
        title: "Estrutura",
        body: "Governança, controles e base operacional.",
      },
      {
        n: "03",
        title: "Escala",
        body: "Crescimento disciplinado e expansão cross-border.",
      },
      {
        n: "04",
        title: "Liquidez",
        body: "Preparação para evento de valor duradouro.",
      },
    ],
    contrastEyebrow: "Dois modelos",
    contrastTitle: "Presença de papel\nvs presença real.",
    paper: {
      label: "Presença de papel",
      items: [
        "Representação sem operação local",
        "Decisões distantes do dia a dia",
        "Reporting irregular",
        "Tese difícil de defender na saída",
      ],
    },
    real: {
      label: "Presença real",
      items: [
        "Sócios ativos nos dois mercados",
        "Governança e operação hands-on",
        "Disciplina de reporting",
        "Narrativa de valor auditável",
      ],
    },
  },
  en: {
    eyebrow: "Learn with us",
    title: "What separates passive capital from active ownership.",
    intro:
      "Original Head Oversea material for founders and investors who want to understand cross‑border private equity — without brochure jargon.",
    topics: [
      {
        id: "ownership",
        title: "What active ownership means",
        body: "Active ownership means entering as a partner with real responsibility: board, operations, and capital decisions. It is not write a check and wait. It is presence in value creation — from governance to execution discipline — through the liquidity event.",
      },
      {
        id: "crossborder",
        title: "Why Brazil ↔ United States changes the thesis",
        body: "Operating across two markets requires structure, compliance, and local presence. Origination and relationships in Brazil; structuring, scale, and discipline in the U.S. The edge is not geography on paper — it is the ability to execute on both sides.",
      },
      {
        id: "governance",
        title: "Governance as a valuation lever",
        body: "Controls, reporting, and a well-designed board reduce risk and increase predictability. For investors and future buyers, governance is not bureaucracy: it is what sustains multiples and prepares the company for the next cycle.",
      },
      {
        id: "path",
        title: "From entry to the liquidity event",
        body: "We enter, structure, scale, and prepare the exit. Each phase has a distinct focus — but one thesis: active ownership with a long horizon, not a speculative shortcut.",
      },
    ],
    frameworkEyebrow: "Framework",
    frameworkTitle: "The ownership cycle we guide.",
    frameworkNote:
      "Illustrative representation of the Head Oversea thesis — not external market data.",
    stages: [
      {
        n: "01",
        title: "Entry",
        body: "Thesis, diligence, and alignment with leadership.",
      },
      {
        n: "02",
        title: "Structure",
        body: "Governance, controls, and operating foundation.",
      },
      {
        n: "03",
        title: "Scale",
        body: "Disciplined growth and cross-border expansion.",
      },
      {
        n: "04",
        title: "Liquidity",
        body: "Preparation for an enduring value event.",
      },
    ],
    contrastEyebrow: "Two models",
    contrastTitle: "Paper presence\nvs real presence.",
    paper: {
      label: "Paper presence",
      items: [
        "Representation without local operations",
        "Decisions far from day-to-day reality",
        "Irregular reporting",
        "A thesis hard to defend at exit",
      ],
    },
    real: {
      label: "Real presence",
      items: [
        "Active partners in both markets",
        "Hands-on governance and operations",
        "Reporting discipline",
        "An auditable value narrative",
      ],
    },
  },
} as const;

export function getPeFaqEntities(locale: Locale) {
  return PE_LEARN[locale].topics.map((topic) => ({
    "@type": "Question" as const,
    name: topic.title,
    acceptedAnswer: {
      "@type": "Answer" as const,
      text: topic.body,
    },
  }));
}
