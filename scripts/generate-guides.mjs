/**
 * Head Oversea — institutional study guides (PDF + covers)
 * Run: npm run guides:generate
 */
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "public", "guides");
const COVERS = path.join(OUT, "covers");
const LOGO = path.join(ROOT, "public", "icon.png");

const C = {
  black: "#050505",
  white: "#ffffff",
  off: "#f5f4f1",
  muted: "#6b6b6b",
  line: "#d8d6d1",
  gold: "#c4a35a",
};

const GUIDES = [
  {
    id: "comecar-com-ho",
    accent: "#1a1a1a",
    title: {
      pt: "Como começar com a Head Oversea",
      en: "How to start with Head Oversea",
    },
    subtitle: {
      pt: "Qualificação, diagnóstico e os primeiros 90 dias",
      en: "Qualification, diagnosis, and the first 90 days",
    },
    sections: {
      pt: [
        {
          h: "Para quem é este guia",
          body: "Fundadores e lideranças que avaliam uma parceria de ownership ativo — e investidores que querem entender como a Head Oversea entra na conversa.",
          bullets: [
            "Clareza sobre o que é (e não é) a parceria",
            "Critérios mínimos antes da primeira reunião",
            "O que acontece depois do sim",
          ],
        },
        {
          h: "O caminho em três atos",
          body: "Não vendemos consultoria pontual. Qualificamos, diagnosticamos e só então estruturamos a entrada.",
          bullets: [
            "01 · Qualificação — tese, momento e aderência, sem compromisso",
            "02 · Diagnóstico — operação, governança, números e potencial internacional",
            "03 · Estrutura — alinhamento de incentivos e plano dos primeiros 90 dias",
          ],
        },
        {
          h: "O que levar para a primeira conversa",
          body: "Informação suficiente para uma discussão séria — sem deck de 80 slides.",
          bullets: [
            "Modelo de negócio em uma página",
            "Situação de caixa e principais riscos",
            "Ambición geográfica (Brasil, EUA ou ambos)",
            "O que você espera de um sócio operacional",
          ],
        },
      ],
      en: [
        {
          h: "Who this guide is for",
          body: "Founders and leaders evaluating an active-ownership partnership — and investors who want to understand how Head Oversea enters the conversation.",
          bullets: [
            "Clarity on what the partnership is (and is not)",
            "Minimum criteria before a first meeting",
            "What happens after a yes",
          ],
        },
        {
          h: "The path in three acts",
          body: "We do not sell one-off consulting. We qualify, diagnose, and only then structure entry.",
          bullets: [
            "01 · Qualification — thesis, timing, and fit, with no commitment",
            "02 · Diagnosis — operations, governance, numbers, and international potential",
            "03 · Structure — incentive alignment and a first-90-day plan",
          ],
        },
        {
          h: "What to bring to the first conversation",
          body: "Enough information for a serious discussion — without an 80-slide deck.",
          bullets: [
            "Business model on one page",
            "Cash position and key risks",
            "Geographic ambition (Brazil, U.S., or both)",
            "What you expect from an operating partner",
          ],
        },
      ],
    },
    chart: "bars",
  },
  {
    id: "intro-private-markets",
    accent: "#2c3a4a",
    title: {
      pt: "Introdução a private markets",
      en: "Introducing private markets",
    },
    subtitle: {
      pt: "Private equity e real assets com linguagem legível",
      en: "Private equity and real assets in legible language",
    },
    sections: {
      pt: [
        {
          h: "Por que private markets entram na conversa",
          body: "Mercados públicos não cobrem todo o universo de empresas e ativos. Private markets ampliam o conjunto — com iliquidez, governança e horizonte diferentes.",
          bullets: [
            "Acesso a empresas e ativos fora do pregão",
            "Horizonte alinhado a construção de valor, não a ruído trimestral",
            "Papel da governança e da presença operacional",
          ],
        },
        {
          h: "Private equity vs. real estate na Head Oversea",
          body: "Dois eixos, a mesma disciplina: ownership presente, reporting claro e corredor Brasil–EUA.",
          bullets: [
            "PE — empresas com modelo validado e espaço de criação de valor",
            "RE — ativos reais com tese de localização, uso e ciclo",
            "Ambos exigem sócio que está na sala quando a decisão pesa",
          ],
        },
        {
          h: "O que perguntar antes de alocar atenção",
          body: "Critério antes de narrativa.",
          bullets: [
            "Quem opera e com que incentivos?",
            "Qual o horizonte real até liquidez?",
            "Como o risco é reportado mês a mês?",
          ],
        },
      ],
      en: [
        {
          h: "Why private markets enter the conversation",
          body: "Public markets do not cover the full universe of companies and assets. Private markets expand the set — with different liquidity, governance, and horizon.",
          bullets: [
            "Access to companies and assets off the exchange",
            "A horizon aligned to value creation, not quarterly noise",
            "The role of governance and operating presence",
          ],
        },
        {
          h: "Private equity vs. real estate at Head Oversea",
          body: "Two axes, one discipline: present ownership, clear reporting, and a Brazil–U.S. corridor.",
          bullets: [
            "PE — companies with a validated model and room to create value",
            "RE — real assets with a thesis of location, use, and cycle",
            "Both require a partner in the room when the decision weighs",
          ],
        },
        {
          h: "What to ask before allocating attention",
          body: "Criteria before narrative.",
          bullets: [
            "Who operates, and with what incentives?",
            "What is the real horizon to liquidity?",
            "How is risk reported month to month?",
          ],
        },
      ],
    },
    chart: "donut",
  },
  {
    id: "private-equity-ownership",
    accent: "#1e2a24",
    title: {
      pt: "Private Equity — ownership ativo",
      en: "Private Equity — active ownership",
    },
    subtitle: {
      pt: "Operar, expandir e multiplicar valor",
      en: "Operate, expand, and compound value",
    },
    sections: {
      pt: [
        {
          h: "O que significa ownership ativo",
          body: "Entrar como sócio com responsabilidade real: board, operação e decisões de capital. Não é cheque e espera.",
          bullets: [
            "Presença na construção de valor",
            "Incentivos alinhados ao horizonte longo",
            "Disciplina do primeiro trimestre ao evento de liquidez",
          ],
        },
        {
          h: "Três frentes em paralelo",
          body: "A Head Oversea trabalha operação, expansão e capital no mesmo ritmo.",
          bullets: [
            "Operamos — eficiência e execução lado a lado com a gestão",
            "Expandimos — presença real no Brasil e nos Estados Unidos",
            "Multiplicamos — governança e estrutura que sustentam múltiplo",
          ],
        },
        {
          h: "Sinais de uma tese séria",
          body: "O que separamos de narrativa ociosa.",
          bullets: [
            "Modelo validado e espaço legível de valor",
            "Liderança aberta a governança presente",
            "Potencial internacional com estrutura, não só ambição",
          ],
        },
      ],
      en: [
        {
          h: "What active ownership means",
          body: "Entering as a partner with real responsibility: board, operations, and capital decisions. It is not write a check and wait.",
          bullets: [
            "Presence in value creation",
            "Incentives aligned to a long horizon",
            "Discipline from the first quarter to the liquidity event",
          ],
        },
        {
          h: "Three fronts in parallel",
          body: "Head Oversea works operations, expansion, and capital in the same rhythm.",
          bullets: [
            "Operate — efficiency and execution side by side with management",
            "Expand — real presence in Brazil and the United States",
            "Multiply — governance and structure that sustain multiples",
          ],
        },
        {
          h: "Signals of a serious thesis",
          body: "What we separate from idle narrative.",
          bullets: [
            "Validated model and legible room for value",
            "Leadership open to present governance",
            "International potential with structure, not ambition alone",
          ],
        },
      ],
    },
    chart: "bars",
  },
  {
    id: "real-estate-horizonte",
    accent: "#3a342c",
    title: {
      pt: "Real Estate — ativos e horizonte longo",
      en: "Real Estate — assets and a long horizon",
    },
    subtitle: {
      pt: "Originação, gestão e ciclo paciente",
      en: "Origination, stewardship, and patient cycles",
    },
    sections: {
      pt: [
        {
          h: "Ativos que atravessam ciclos",
          body: "Real estate na Head Oversea não é fórmula genérica. É localização, uso e tese claras — com gestão presente.",
          bullets: [
            "Originação seletiva",
            "Acompanhamento operacional e financeiro",
            "Horizonte longo o suficiente para o ativo trabalhar",
          ],
        },
        {
          h: "Corredor Brasil–EUA",
          body: "Presença nos dois mercados para estruturar, alocar e acompanhar.",
          bullets: [
            "Leitura local com padrão institucional",
            "Disciplina de capital e reporting",
            "Narrativa clara para capital paciente",
          ],
        },
        {
          h: "Perguntas que importam",
          body: "Antes de qualquer alocação.",
          bullets: [
            "O risco é legível?",
            "O upside vem de execução ou só de narrativa?",
            "Quem está no terreno quando o ciclo aperta?",
          ],
        },
      ],
      en: [
        {
          h: "Assets that outlast cycles",
          body: "Real estate at Head Oversea is not a generic formula. It is clear location, use, and thesis — with present stewardship.",
          bullets: [
            "Selective origination",
            "Operating and financial oversight",
            "A horizon long enough for the asset to work",
          ],
        },
        {
          h: "Brazil–U.S. corridor",
          body: "Presence in both markets to structure, allocate, and oversee.",
          bullets: [
            "Local fluency with an institutional standard",
            "Capital discipline and reporting",
            "A clear narrative for patient capital",
          ],
        },
        {
          h: "Questions that matter",
          body: "Before any allocation.",
          bullets: [
            "Is risk legible?",
            "Does upside come from execution or narrative alone?",
            "Who is on the ground when the cycle tightens?",
          ],
        },
      ],
    },
    chart: "line",
  },
  {
    id: "expandir-brasil-eua",
    accent: "#243044",
    title: {
      pt: "Como expandir Brasil ↔ EUA",
      en: "How to expand Brazil ↔ U.S.",
    },
    subtitle: {
      pt: "Estrutura, presença e execução cross-border",
      en: "Structure, presence, and cross-border execution",
    },
    sections: {
      pt: [
        {
          h: "O que muda quando o mapa tem dois lados",
          body: "Expandir não é abrir um CNPJ nos EUA. É compliance, operação, distribuição e alguém responsável no terreno.",
          bullets: [
            "Estrutura societária e fiscal adequada",
            "Presença local — não só representação de papel",
            "Processos que sobrevivem a fuso e idioma",
          ],
        },
        {
          h: "O papel da Head Oversea",
          body: "Originação e confiança no Brasil; estrutura, escala e disciplina nos Estados Unidos.",
          bullets: [
            "Diagnóstico de prontidão internacional",
            "Setup e rede operacional",
            "Governança que une os dois mercados",
          ],
        },
        {
          h: "Erros comuns",
          body: "O que evitamos de propósito.",
          bullets: [
            "Ambição sem caixa nem time",
            "Marketing antes de operação",
            "Parceiro remoto sem skin in the game",
          ],
        },
      ],
      en: [
        {
          h: "What changes when the map has two sides",
          body: "Expansion is not opening an entity in the U.S. It is compliance, operations, distribution, and someone accountable on the ground.",
          bullets: [
            "Appropriate corporate and tax structure",
            "Local presence — not paper representation alone",
            "Processes that survive timezone and language",
          ],
        },
        {
          h: "Head Oversea’s role",
          body: "Origination and trust in Brazil; structure, scale, and discipline in the United States.",
          bullets: [
            "International readiness diagnosis",
            "Setup and operating network",
            "Governance that joins both markets",
          ],
        },
        {
          h: "Common mistakes",
          body: "What we deliberately avoid.",
          bullets: [
            "Ambition without cash or team",
            "Marketing before operations",
            "A remote partner with no skin in the game",
          ],
        },
      ],
    },
    chart: "bars",
  },
  {
    id: "governanca-reporting",
    accent: "#2a2a2a",
    title: {
      pt: "Governança e reporting que sustentam múltiplo",
      en: "Governance and reporting that sustain multiples",
    },
    subtitle: {
      pt: "Board, controles e disciplina mensal",
      en: "Board, controls, and monthly discipline",
    },
    sections: {
      pt: [
        {
          h: "Governança não é burocracia",
          body: "Para investidores e compradores futuros, controles bem desenhados reduzem risco e aumentam previsibilidade — e sustentam múltiplo.",
          bullets: [
            "Board com pauta e decisão",
            "Reporting mensal legível",
            "Separação clara entre operação e oversight",
          ],
        },
        {
          h: "O que instalamos cedo",
          body: "Disciplina desde o primeiro trimestre.",
          bullets: [
            "KPIs ligados a valor, não a vaidade",
            "Calendário de revisão com a liderança",
            "Rituais que sobrevivem à ausência do fundador",
          ],
        },
        {
          h: "Preparação para o próximo ciclo",
          body: "Governança é o que torna a empresa investível no próximo capítulo.",
          bullets: [
            "Dados auditáveis",
            "Narrativa alinhada aos números",
            "Menos surpresa no due diligence",
          ],
        },
      ],
      en: [
        {
          h: "Governance is not bureaucracy",
          body: "For investors and future buyers, well-designed controls reduce risk and increase predictability — and sustain multiples.",
          bullets: [
            "A board with agenda and decision",
            "Legible monthly reporting",
            "Clear separation between operations and oversight",
          ],
        },
        {
          h: "What we install early",
          body: "Discipline from the first quarter.",
          bullets: [
            "KPIs tied to value, not vanity",
            "A review calendar with leadership",
            "Rituals that survive founder absence",
          ],
        },
        {
          h: "Preparation for the next cycle",
          body: "Governance is what makes the company investable for the next chapter.",
          bullets: [
            "Auditable data",
            "Narrative aligned to the numbers",
            "Fewer surprises in diligence",
          ],
        },
      ],
    },
    chart: "line",
  },
  {
    id: "marketing-institucional",
    accent: "#3d2f28",
    title: {
      pt: "Marketing e narrativa institucional",
      en: "Institutional marketing and narrative",
    },
    subtitle: {
      pt: "Marca a serviço do ownership",
      en: "Brand in service of ownership",
    },
    sections: {
      pt: [
        {
          h: "Narrativa que aguenta diligência",
          body: "Marketing institucional na Head Oversea não é campanha solta. É clareza de tese, prova operacional e linguagem que sobrevive a perguntas difíceis.",
          bullets: [
            "Posicionamento alinhado ao modelo de negócio",
            "Prova (cases, números, presença) antes de slogan",
            "Consistência entre site, deck e sala de reunião",
          ],
        },
        {
          h: "O que evitar",
          body: "Sinais de folder vazio.",
          bullets: [
            "Jargão sem definição",
            "Promessa geográfica sem estrutura",
            "Visual premium sem substância",
          ],
        },
        {
          h: "Checklist rápido",
          body: "Antes de publicar ou apresentar.",
          bullets: [
            "Uma frase de tese que um investidor repete",
            "Três provas verificáveis",
            "Um CTA único e legítimo",
          ],
        },
      ],
      en: [
        {
          h: "Narrative that survives diligence",
          body: "Institutional marketing at Head Oversea is not a loose campaign. It is thesis clarity, operating proof, and language that survives hard questions.",
          bullets: [
            "Positioning aligned to the business model",
            "Proof (cases, numbers, presence) before slogan",
            "Consistency across site, deck, and meeting room",
          ],
        },
        {
          h: "What to avoid",
          body: "Signals of an empty brochure.",
          bullets: [
            "Jargon without definition",
            "Geographic promise without structure",
            "Premium visuals without substance",
          ],
        },
        {
          h: "Quick checklist",
          body: "Before publishing or presenting.",
          bullets: [
            "One thesis line an investor can repeat",
            "Three verifiable proofs",
            "One legitimate, single CTA",
          ],
        },
      ],
    },
    chart: "donut",
  },
  {
    id: "confianca-na-conversa",
    accent: "#1f2d2a",
    title: {
      pt: "Como conduzir a conversa com critério",
      en: "How to lead the conversation with criteria",
    },
    subtitle: {
      pt: "Objeções, reframes e perguntas certas",
      en: "Objections, reframes, and the right questions",
    },
    sections: {
      pt: [
        {
          h: "Objeção: “Já tenho capital / já tenho mercado”",
          body: "Reframe: capital sem presença e mercado sem estrutura raramente compostam. Ownership ativo muda o ritmo da decisão.",
          bullets: [
            "Pergunte quem está na sala no mês difícil",
            "Separe alocação de operação",
            "Mostre o custo da distância",
          ],
        },
        {
          h: "Objeção: “Private markets são opacos”",
          body: "Reframe: opacidade não é destino. Reporting disciplinado e board presente são o antídoto.",
          bullets: [
            "Exija calendário e formato de report",
            "Peça KPIs ligados a valor",
            "Defina o que é sucesso em 12 meses",
          ],
        },
        {
          h: "Perguntas que abrem espaço real",
          body: "Use com fundadores e com investidores.",
          bullets: [
            "O que precisa ser verdade em 18 meses?",
            "Onde a firma perde tempo hoje?",
            "Qual decisão você não quer tomar sozinho?",
          ],
        },
      ],
      en: [
        {
          h: "Objection: “I already have capital / market”",
          body: "Reframe: capital without presence and market without structure rarely compound. Active ownership changes the rhythm of decisions.",
          bullets: [
            "Ask who is in the room in the hard month",
            "Separate allocation from operations",
            "Show the cost of distance",
          ],
        },
        {
          h: "Objection: “Private markets are opaque”",
          body: "Reframe: opacity is not destiny. Disciplined reporting and a present board are the antidote.",
          bullets: [
            "Require a report calendar and format",
            "Ask for KPIs tied to value",
            "Define what success looks like in 12 months",
          ],
        },
        {
          h: "Questions that open real space",
          body: "Use with founders and with investors.",
          bullets: [
            "What must be true in 18 months?",
            "Where does the firm lose time today?",
            "Which decision do you not want to make alone?",
          ],
        },
      ],
    },
    chart: "bars",
  },
  {
    id: "proximos-passos",
    accent: "#222222",
    title: {
      pt: "Próximos passos — checklist prático",
      en: "Next steps — a practical checklist",
    },
    subtitle: {
      pt: "Do interesse à primeira reunião séria",
      en: "From interest to a serious first meeting",
    },
    sections: {
      pt: [
        {
          h: "Checklist do fundador",
          body: "Prepare o mínimo para uma conversa útil.",
          bullets: [
            "Uma página de tese e modelo",
            "Foto honesta de caixa e riscos",
            "Lista do que espera de um sócio",
            "Agenda disponível nas próximas duas semanas",
          ],
        },
        {
          h: "Checklist do investidor",
          body: "Antes de aprofundar qualquer alocação de atenção.",
          bullets: [
            "Horizonte e liquidez desejados",
            "Apetite a PE, RE ou ambos",
            "Perguntas de governança e reporting",
            "Canal preferido de contato",
          ],
        },
        {
          h: "Como falar com a Head Oversea",
          body: "Uma conversa de qualificação — sem pressa, com critério.",
          bullets: [
            "Escreva para contact@headoversea.com",
            "Ou use /contato no site",
            "Traga o checklist acima — encurtamos o caminho",
          ],
        },
      ],
      en: [
        {
          h: "Founder checklist",
          body: "Prepare the minimum for a useful conversation.",
          bullets: [
            "One page of thesis and model",
            "An honest view of cash and risks",
            "A list of what you expect from a partner",
            "Availability in the next two weeks",
          ],
        },
        {
          h: "Investor checklist",
          body: "Before deepening any allocation of attention.",
          bullets: [
            "Desired horizon and liquidity",
            "Appetite for PE, RE, or both",
            "Governance and reporting questions",
            "Preferred contact channel",
          ],
        },
        {
          h: "How to speak with Head Oversea",
          body: "A qualification conversation — without haste, with criteria.",
          bullets: [
            "Write to contact@headoversea.com",
            "Or use /en/contact on the site",
            "Bring the checklist above — we shorten the path",
          ],
        },
      ],
    },
    chart: "donut",
  },
];

function ensureDirs() {
  fs.mkdirSync(OUT, { recursive: true });
  fs.mkdirSync(COVERS, { recursive: true });
}

function drawHeader(doc, locale) {
  const mark = locale === "pt" ? "Brasil — USA" : "Brazil — USA";
  doc.fillColor(C.black).font("Helvetica-Bold").fontSize(9).text("HEAD OVERSEA", 48, 36);
  doc
    .fillColor(C.muted)
    .font("Helvetica")
    .fontSize(8)
    .text(mark, 48, 50);
  doc
    .strokeColor(C.line)
    .lineWidth(0.6)
    .moveTo(48, 68)
    .lineTo(547, 68)
    .stroke();
}

function drawFooter(doc, pageNum, total, locale) {
  const disc =
    locale === "pt"
      ? "Conteúdo educacional Head Oversea. Não constitui oferta de investimento."
      : "Head Oversea educational content. Not an offer to invest.";
  doc
    .strokeColor(C.line)
    .lineWidth(0.6)
    .moveTo(48, 742)
    .lineTo(547, 742)
    .stroke();
  doc.fillColor(C.muted).font("Helvetica").fontSize(7).text(disc, 48, 752, { width: 360 });
  doc.text(`${pageNum} / ${total}`, 480, 752, { width: 67, align: "right" });
}

function drawCover(doc, guide, locale) {
  doc.rect(0, 0, 595, 842).fill(C.black);
  if (fs.existsSync(LOGO)) {
    try {
      doc.image(LOGO, 48, 48, { width: 36, height: 36 });
    } catch {
      /* ignore */
    }
  }
  doc.fillColor(C.white).font("Helvetica").fontSize(9).text("HEAD OVERSEA", 96, 58);
  doc
    .fillColor(C.gold)
    .font("Helvetica")
    .fontSize(8)
    .text(locale === "pt" ? "Brasil — USA" : "Brazil — USA", 96, 72);

  doc
    .fillColor("#ffffff")
    .font("Times-Roman")
    .fontSize(28)
    .text(guide.title[locale], 48, 280, { width: 460, lineGap: 6 });

  doc
    .fillColor("#b8b8b8")
    .font("Helvetica")
    .fontSize(11)
    .text(guide.subtitle[locale], 48, 400, { width: 420 });

  doc
    .fillColor(C.gold)
    .font("Helvetica")
    .fontSize(8)
    .text(
      locale === "pt" ? "GUIA DE ESTUDO" : "STUDY GUIDE",
      48,
      760,
    );
  doc
    .fillColor("#888888")
    .fontSize(8)
    .text("headoversea.com", 420, 760, { width: 120, align: "right" });
}

function drawChart(doc, type, y) {
  const x = 48;
  if (type === "bars") {
    const bars = [
      { h: 70, label: "A" },
      { h: 110, label: "B" },
      { h: 90, label: "C" },
      { h: 140, label: "D" },
    ];
    bars.forEach((b, i) => {
      const bx = x + i * 70;
      doc.rect(bx, y + 150 - b.h, 42, b.h).fill(i === 3 ? C.gold : C.black);
      doc.fillColor(C.muted).fontSize(8).text(b.label, bx, y + 158, { width: 42, align: "center" });
    });
  } else if (type === "donut") {
    doc.circle(120, y + 70, 55).lineWidth(18).strokeColor(C.black).stroke();
    doc.circle(120, y + 70, 55).lineWidth(18).strokeColor(C.gold).stroke();
    doc.fillColor(C.black).font("Helvetica-Bold").fontSize(16).text("HO", 105, y + 62);
  } else {
    doc
      .strokeColor(C.black)
      .lineWidth(1.2)
      .moveTo(x, y + 120)
      .lineTo(x + 80, y + 90)
      .lineTo(x + 160, y + 100)
      .lineTo(x + 240, y + 50)
      .lineTo(x + 320, y + 40)
      .stroke();
    doc
      .strokeColor(C.gold)
      .dash(3, { space: 2 })
      .moveTo(x, y + 130)
      .lineTo(x + 320, y + 110)
      .stroke()
      .undash();
  }
}

function writeGuidePdf(guide, locale) {
  return new Promise((resolve, reject) => {
    const file = path.join(OUT, `${guide.id}-${locale}.pdf`);
    const doc = new PDFDocument({
      size: "A4",
      margins: { top: 72, bottom: 72, left: 48, right: 48 },
      info: {
        Title: guide.title[locale],
        Author: "Head Oversea",
        Subject: guide.subtitle[locale],
      },
    });
    const stream = fs.createWriteStream(file);
    doc.pipe(stream);

    const sections = guide.sections[locale];
    const totalPages = 1 + sections.length + 1;

    // Cover
    drawCover(doc, guide, locale);

    // Content pages
    sections.forEach((sec, idx) => {
      doc.addPage();
      drawHeader(doc, locale);
      let y = 88;
      doc
        .fillColor(C.black)
        .font("Times-Roman")
        .fontSize(18)
        .text(sec.h, 48, y, { width: 500 });
      y = doc.y + 14;
      doc
        .fillColor(C.muted)
        .font("Helvetica")
        .fontSize(10)
        .text(sec.body, 48, y, { width: 500, lineGap: 3 });
      y = doc.y + 18;
      sec.bullets.forEach((b) => {
        doc.fillColor(C.gold).fontSize(9).text("—", 48, y);
        doc
          .fillColor(C.black)
          .font("Helvetica")
          .fontSize(10)
          .text(b, 64, y, { width: 480 });
        y = doc.y + 10;
      });
      if (idx === 0) {
        y += 20;
        doc
          .fillColor(C.muted)
          .font("Helvetica")
          .fontSize(8)
          .text(
            locale === "pt" ? "Ilustração conceitual" : "Conceptual illustration",
            48,
            y,
          );
        drawChart(doc, guide.chart, y + 12);
      }
      // Notes box
      const notesY = 620;
      doc.rect(48, notesY, 499, 100).fill(C.off);
      doc
        .fillColor(C.black)
        .font("Helvetica-Bold")
        .fontSize(9)
        .text(locale === "pt" ? "NOTAS" : "NOTES", 64, notesY + 16);
      doc
        .strokeColor(C.line)
        .lineWidth(0.5)
        .moveTo(64, notesY + 40)
        .lineTo(520, notesY + 40)
        .moveTo(64, notesY + 58)
        .lineTo(520, notesY + 58)
        .moveTo(64, notesY + 76)
        .lineTo(520, notesY + 76)
        .stroke();
      drawFooter(doc, idx + 2, totalPages, locale);
    });

    // Closing page
    doc.addPage();
    drawHeader(doc, locale);
    doc
      .fillColor(C.black)
      .font("Times-Roman")
      .fontSize(22)
      .text(
        locale === "pt" ? "Próximo passo" : "Next step",
        48,
        120,
      );
    doc
      .fillColor(C.muted)
      .font("Helvetica")
      .fontSize(11)
      .text(
        locale === "pt"
          ? "Uma conversa de qualificação — sem pressa, com critério. Fundadores e investidores: contact@headoversea.com"
          : "A qualification conversation — without haste, with criteria. Founders and investors: contact@headoversea.com",
        48,
        170,
        { width: 460, lineGap: 4 },
      );
    doc
      .fillColor(C.gold)
      .font("Helvetica")
      .fontSize(10)
      .text("headoversea.com", 48, 260);
    doc
      .fillColor(C.muted)
      .fontSize(8)
      .text(
        locale === "pt"
          ? "Orlando, FL · Corredor Brasil — USA"
          : "Orlando, FL · Brazil — USA corridor",
        48,
        280,
      );
    drawFooter(doc, totalPages, totalPages, locale);

    doc.end();
    stream.on("finish", () => resolve(file));
    stream.on("error", reject);
  });
}

async function writeCoverJpg(guide) {
  const w = 900;
  const h = 1200;
  const title = guide.title.en.length > guide.title.pt.length ? guide.title.en : guide.title.pt;
  // Use EN title for cover visual consistency; short wrap via SVG text
  const lines = wrapTitle(guide.title.pt, 22);
  const textSvg = lines
    .map(
      (line, i) =>
        `<text x="72" y="${520 + i * 52}" font-family="Georgia, serif" font-size="42" fill="#ffffff">${escapeXml(line)}</text>`,
    )
    .join("");

  const svg = `
  <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#050505"/>
    <rect x="72" y="72" width="48" height="48" fill="#c4a35a"/>
    <text x="140" y="104" font-family="Helvetica, Arial, sans-serif" font-size="22" fill="#ffffff" letter-spacing="2">HEAD OVERSEA</text>
    <text x="140" y="128" font-family="Helvetica, Arial, sans-serif" font-size="14" fill="#c4a35a">Brasil — USA</text>
    <line x1="72" y1="180" x2="828" y2="180" stroke="#333" stroke-width="1"/>
    ${textSvg}
    <text x="72" y="1080" font-family="Helvetica, Arial, sans-serif" font-size="16" fill="#c4a35a" letter-spacing="3">STUDY GUIDE</text>
    <text x="72" y="1112" font-family="Helvetica, Arial, sans-serif" font-size="14" fill="#888888">${escapeXml(guide.subtitle.pt)}</text>
  </svg>`;

  const out = path.join(COVERS, `${guide.id}.jpg`);
  await sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toFile(out);
  return out;
}

function wrapTitle(text, max) {
  const words = text.split(" ");
  const lines = [];
  let cur = "";
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (next.length > max && cur) {
      lines.push(cur);
      cur = w;
    } else cur = next;
  }
  if (cur) lines.push(cur);
  return lines.slice(0, 4);
}

function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

async function main() {
  ensureDirs();
  console.log("Generating covers…");
  for (const g of GUIDES) {
    await writeCoverJpg(g);
    console.log("  cover", g.id);
  }
  console.log("Generating PDFs…");
  for (const g of GUIDES) {
    for (const locale of ["pt", "en"]) {
      await writeGuidePdf(g, locale);
      console.log("  pdf", `${g.id}-${locale}.pdf`);
    }
  }
  console.log("Done → public/guides/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
