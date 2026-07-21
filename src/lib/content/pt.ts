import type { SiteContent } from "@/types/content";

export const pt: SiteContent = {
  meta: {
    title: "Head Oversea | Private Equity & Real Estate",
    description:
      "Firma de investimento em private equity e real estate — ownership ativo e valor de longo prazo no Brasil e nos Estados Unidos.",
  },
  nav: [
    { label: "Sobre", href: "/sobre" },
    { label: "Private Equity", href: "/private-equity" },
    { label: "Real Estate", href: "/real-estate" },
    { label: "Portfólio", href: "/cases" },
    { label: "Notícias", href: "/insights" },
  ],
  cta: {
    primary: "Falar conosco",
    secondary: "Conhecer a tese",
  },
  hero: {
    eyebrow: "Private Equity · Real Estate",
    title: "Construindo valor",
    titleAccent: "duradouro.",
    subtitle:
      "Firma de investimento em private equity e real estate. Ownership ativo em empresas e ativos reais — Brasil e Estados Unidos.",
    statement:
      "Mais de US$ 42 milhões em equity gerado em ativos do portfólio.",
    cta: "Explorar investimentos",
    ctaHref: "/cases",
    trustLine:
      "Portfólio ativo nos Estados Unidos — presença operacional Brasil–EUA desde 2022.",
    founderCta: "Sou fundador",
    investorCta: "Sou investidor",
    image: "/images/us-skyline-presence.jpg",
  },
  home: {
    trust: [
      { value: "42", suffix: "M+", label: "Equity gerado" },
      { value: "15", suffix: "+", label: "Empresas" },
      { value: "2", suffix: "", label: "Mercados" },
      { value: "10", suffix: "+", label: "Anos" },
    ],
    thesis: {
      eyebrow: "Nossa tese",
      title: "Investimos em negócios\nfeitos para durar.",
      body: "Assumimos posições de propriedade ativa em empresas consolidadas e ativos reais. Governança, disciplina operacional e capital paciente — com horizonte de longo prazo.",
      cta: "Saiba mais",
      href: "/tese",
      image: "/images/investment-strategy-workspace.jpg",
    },
    valueCreation: {
      eyebrow: "Como criamos valor",
      title: "Três alavancas.\nUma tese de ownership.",
      intro:
        "Não vendemos serviços avulsos. Entramos como sócios e trabalhamos três frentes em paralelo.",
      items: [
        {
          id: "operacional",
          number: "01",
          title: "Operação",
          description:
            "Eficiência, margem e disciplina de execução lado a lado com a liderança.",
        },
        {
          id: "governanca",
          number: "02",
          title: "Governança",
          description:
            "Board, controles e estrutura societária que sustentam valuation.",
        },
        {
          id: "capital",
          number: "03",
          title: "Capital & expansão",
          description:
            "Capital estruturado e expansão internacional até o evento de liquidez.",
        },
      ],
    },
    realEstate: {
      eyebrow: "02 / Real Estate",
      title: "Ativos reais.\nPerspectiva de longo prazo.",
      body: "Investimos em ativos imobiliários com disciplina estratégica, capital paciente e horizonte de longo prazo.",
      cta: "Explorar Real Estate",
      href: "/real-estate",
      image: "/images/luxury-residential-real-estate.jpg",
    },
    portfolio: {
      eyebrow: "Portfólio",
      title: "Empresas que acreditamos.",
      viewAll: "Ver todos",
      viewAllHref: "/cases",
      viewProject: "Ver projeto",
    },
    featuredCase: {
      eyebrow: "Investimento em destaque",
      company: "Riolaser",
      context:
        "Clínica de estética a laser nos Estados Unidos, com modelo validado e potencial de consolidação de marca.",
      thesis:
        "Ownership ativo em private equity — governança e operação para transformar potencial em referência no mercado americano.",
      action:
        "Entrada na liderança, estruturação de governança e disciplina operacional desde o primeiro trimestre.",
      result: "Do lançamento à consolidação como marca de referência.",
      cta: "Ler o case",
      href: "/cases/riolaser",
      image: "/images/empresas/riolaser.jpg",
    },
    insights: {
      eyebrow: "Notícias",
      title: "Notícias e perspectivas do nosso mercado.",
      viewAll: "Saiba mais",
      viewAllHref: "/insights",
    },
    finalCta: {
      title: "Valor duradouro começa com a parceria certa.",
      foundersLabel: "Para fundadores",
      foundersHref: "/fundadores",
      investorsLabel: "Para investidores",
      investorsHref: "/investidores",
    },
  },
  metrics: [
    { value: "42", suffix: "M+", label: "Em equity gerado", icon: "capital" },
    { value: "15", suffix: "+", label: "Empresas estruturadas", icon: "companies" },
    { value: "2", suffix: "", label: "Mercados integrados", icon: "markets" },
    { value: "10", suffix: "+", label: "Anos de experiência combinada", icon: "experience" },
    { value: "98", suffix: "%", label: "Taxa de retenção de clientes", icon: "retention" },
  ],
  pillars: {
    eyebrow: "Pilares",
    title: "Quatro frentes. Uma tese.",
    items: [
      {
        id: "equity",
        title: "Equity por serviço",
        description:
          "Atuamos como parceiros estratégicos para reestruturar, revalorizar e preparar negócios para o mercado internacional — sem injeção de capital, com execução hands-on.",
        highlights: [
          "Governança ativa junto à liderança",
          "Reestruturação integral do modelo de negócio",
          "Preparação para escala ou venda",
        ],
        image: "/images/products/equity.jpg",
      },
      {
        id: "internationalization",
        title: "Internacionalização",
        description:
          "Internacionalizamos empresas com inteligência estrutural, estratégia assertiva e segurança jurídica em cada etapa do processo.",
        highlights: [
          "Setup completo nos EUA",
          "Suporte local especializado",
          "Crescimento sobre bases sólidas",
        ],
        image: "/images/products/internationalization.jpg",
      },
      {
        id: "brokerage",
        title: "Assessoria em M&A",
        description:
          "Conectamos empreendedores a investidores internacionais por meio de processos de venda estruturados que maximizam valor e garantem liquidez.",
        highlights: [
          "Empresa preparada para venda",
          "Matching com investidores qualificados",
          "Negociação ponta a ponta",
        ],
        image: "/images/products/brokerage.jpg",
      },
      {
        id: "realestate",
        title: "Real Estate",
        description:
          "Identificamos e desenvolvemos oportunidades imobiliárias estratégicas nos EUA, com foco em liquidez, valorização e segurança patrimonial.",
        highlights: [
          "Investimentos orientados à liquidez",
          "Ativos sólidos internacionalmente",
          "Gestão profissional de portfólio",
        ],
        image: "/images/luxury-residential-real-estate.jpg",
      },
    ],
  },
  philosophy: {
    eyebrow: "Nossa tese",
    title: "Ownership ativo",
    body: "Identificamos empresas com modelos validados e ativos reais, e construímos valor de longo prazo por meio de ownership ativo — governança, operação e capital.",
    thesis:
      "Não somos uma agência. Não somos uma consultoria. Somos uma firma de investimento — com ownership ativo e horizonte de longo prazo.",
    mission: {
      label: "Missão",
      text: "Guiar empresas na expansão internacional com soluções práticas, personalizadas e seguras, criando valor duradouro por meio de parcerias estratégicas e governança ativa.",
    },
    vision: {
      label: "Visão",
      text: "Ser referência global em internacionalização e crescimento empresarial, com governança ativa e soft landing nos Estados Unidos.",
    },
  },
  cases: {
    eyebrow: "Portfólio",
    title: "Empresas que construímos e fazemos crescer",
    items: [
      {
        id: "riolaser",
        company: "Riolaser",
        headline: "Do lançamento à consolidação como marca de referência.",
        description:
          "Clínica de estética a laser nos Estados Unidos. Entramos na operação para estruturar governança, marca e disciplina de crescimento — transformando potencial em referência de mercado.",
        category: "Private Equity",
        location: "Estados Unidos",
        result: "Marca consolidada e operação profissionalizada",
        resultLabel: "Resultado",
        logo: "/images/logos-empresas/riolaser-areia.svg",
        logoBg: "light",
        visitUrl: "https://riolaser.com/",
        instagramUrl: "https://www.instagram.com/riolaser.us/",
        image: "/images/empresas/riolaser.jpg",
        video: "/videos/riolaser.mp4",
        gallery: [
          "/images/empresas/riolaser.jpg",
          "/images/empresas/riolaser2.jpg",
          "/images/empresas/riolaser3.jpg",
        ],
        detail: {
          sector: "Private Equity · Estética",
          summary:
            "A Head Oversea entrou na operação da Riolaser para estruturar governança, marca e disciplina de crescimento — transformando potencial em referência no mercado americano.",
          highlights: [
            {
              value: "Marca consolidada",
              label: "Operação profissionalizada nos Estados Unidos",
            },
            {
              value: "Ownership ativo",
              label: "Governança e execução lado a lado com a liderança",
            },
          ],
          problem: {
            title: "Contexto",
            body: "Clínica de estética a laser nos Estados Unidos, com modelo validado e potencial claro de consolidação — ainda sem a estrutura de governança e disciplina operacional para se tornar referência de mercado.",
          },
          solution: {
            title: "Tese & ação",
            body: "Ownership ativo em private equity: entrada na liderança, estruturação de board e controles, e disciplina operacional desde o primeiro trimestre — com presença real no mercado americano.",
          },
          outcome: {
            title: "Resultado",
            body: "Do lançamento à consolidação como marca de referência — operação profissionalizada, narrativa de marca reforçada e base preparada para a próxima fase de crescimento.",
          },
        },
      },
      {
        id: "drakkar",
        company: "Drakkar",
        headline: "Reposicionamento estratégico no mercado náutico premium.",
        description:
          "Embarcações e experiência náutica de alto padrão nos Estados Unidos. Trabalhamos posicionamento, operação e presença de marca para fortalecer a tese premium no mercado americano.",
        category: "Private Equity",
        location: "Estados Unidos",
        result: "Reposicionamento premium e narrativa de marca reforçada",
        resultLabel: "Resultado",
        logo: "/images/logos-empresas/drakkar-light.png",
        logoBg: "light",
        visitUrl: "https://drakkarboats.com/",
        instagramUrl: "https://www.instagram.com/drakkar.boats/",
        image: "/images/empresas/drakkar1.jpg",
        video: "/videos/drakkar.mp4",
        gallery: [
          "/images/empresas/drakkar1.jpg",
          "/images/empresas/drakkar3.jpg",
          "/images/empresas/drakkar2.jpg",
        ],
        detail: {
          sector: "Private Equity · Náutica",
          summary:
            "Trabalhamos posicionamento, operação e presença de marca para fortalecer a tese premium da Drakkar no mercado náutico americano.",
          highlights: [
            { value: "Tese premium", label: "Narrativa e posicionamento reforçados nos EUA" },
            { value: "Presença de marca", label: "Operação e storytelling alinhados ao mercado" },
          ],
          problem: {
            title: "Contexto",
            body: "Marca náutica com potencial premium nos Estados Unidos, ainda sem a disciplina de posicionamento e presença necessária para consolidar a tese no mercado americano.",
          },
          solution: {
            title: "Tese & ação",
            body: "Reposicionamento estratégico, reforço de narrativa e apoio operacional para elevar a percepção de marca e a consistência comercial no segmento premium.",
          },
          outcome: {
            title: "Resultado",
            body: "Reposicionamento premium e narrativa de marca reforçada — base mais clara para competir e crescer no mercado náutico dos EUA.",
          },
        },
      },
      {
        id: "roadpro",
        company: "RoadPro",
        headline: "Governança e modelo operacional para crescimento sustentável.",
        description:
          "Operação nos Estados Unidos com foco em disciplina, reporting e estrutura para escalar com previsibilidade. Ownership ativo com presença real no mercado americano.",
        category: "Private Equity",
        location: "Estados Unidos",
        result: "Modelo operacional e governança para escala",
        resultLabel: "Resultado",
        logo: "/images/logos-empresas/roadpro.png",
        logoBg: "light",
        visitUrl: "https://www.roadpro.us/",
        instagramUrl: "https://www.instagram.com/roadpro.us/",
        image: "/images/empresas/roadpro.avif",
        video: "/videos/roadpro.mp4",
        gallery: [
          "/images/empresas/roadpro.avif",
          "/images/empresas/roadpro2.avif",
        ],
        detail: {
          sector: "Private Equity · Operações",
          summary:
            "Ownership ativo com foco em governança, reporting e modelo operacional para a RoadPro escalar com previsibilidade nos Estados Unidos.",
          highlights: [
            { value: "Governança", label: "Reporting e estrutura para escala previsível" },
            { value: "Operação", label: "Disciplina e presença real no mercado americano" },
          ],
          problem: {
            title: "Contexto",
            body: "Operação com potencial de crescimento, mas ainda sem o nível de disciplina, reporting e estrutura necessários para escalar com previsibilidade.",
          },
          solution: {
            title: "Tese & ação",
            body: "Entramos na governança e no modelo operacional — controles, ritmo de decisão e presença hands-on para sustentar crescimento sustentável.",
          },
          outcome: {
            title: "Resultado",
            body: "Modelo operacional e governança preparados para escala — com disciplina de execução no mercado americano.",
          },
        },
      },
      {
        id: "geromel",
        company: "Geromel Construction",
        headline: "Estruturação e disciplina operacional no setor de construção.",
        description:
          "Construção e real assets com olhar de longo prazo. Estruturamos processos, governança e disciplina financeira para sustentar valuation e execução consistente.",
        category: "Real Estate",
        location: "Estados Unidos",
        result: "Operação mais estruturada e preparada para crescimento",
        resultLabel: "Resultado",
        logo: "/images/logos-empresas/geromel-light.png",
        logoBg: "light",
        visitUrl: "https://geromelconstruction.com/",
        instagramUrl: "https://www.instagram.com/geromelconstruction/",
        image: "/images/philadelphia-skyline-us-real-estate.jpg",
        video: "/videos/realestate.mp4",
        gallery: [
          "/images/philadelphia-skyline-us-real-estate.jpg",
        ],
        detail: {
          sector: "Real Estate · Construção",
          summary:
            "Estruturamos processos, governança e disciplina financeira na Geromel Construction para sustentar valuation e execução consistente em real assets.",
          highlights: [
            { value: "Disciplina operacional", label: "Processos e governança para execução consistente" },
            { value: "Horizonte longo", label: "Ativos reais com olhar de valuation sustentável" },
          ],
          problem: {
            title: "Contexto",
            body: "Empresa de construção com potencial em real assets, ainda precisando de estrutura de processos, governança e disciplina financeira para sustentar o próximo ciclo.",
          },
          solution: {
            title: "Tese & ação",
            body: "Organização operacional, governança e critérios financeiros alinhados a um horizonte longo — para a execução acompanhar a tese de ativos reais.",
          },
          outcome: {
            title: "Resultado",
            body: "Operação mais estruturada e preparada para crescimento — com base para valuation e escala disciplinada.",
          },
        },
      },
      {
        id: "once",
        company: "Once Upon A Child",
        headline: "Marca estruturada para uma nova fase de crescimento.",
        description:
          "Franquia de varejo infantil com tese clara de expansão. Apoio em estrutura, posicionamento e preparação para a próxima fase de crescimento da marca.",
        category: "Private Equity",
        location: "Estados Unidos",
        result: "Base estruturada para expansão da franquia",
        resultLabel: "Resultado",
        logo: "/images/logos-empresas/onceatualizada.webp",
        logoBg: "light",
        visitUrl: "https://onceuponachild.com/",
        instagramUrl: "https://www.instagram.com/onceuponachild/",
        image: "/images/empresas/once.jpg",
        video: "/videos/once.mp4",
        gallery: ["/images/empresas/once.jpg"],
        detail: {
          sector: "Private Equity · Franquia",
          summary:
            "Apoio em estrutura, posicionamento e preparação da Once Upon A Child para a próxima fase de crescimento nos Estados Unidos.",
          highlights: [
            { value: "Estrutura", label: "Base preparada para expansão da franquia" },
            { value: "Posicionamento", label: "Narrativa e prontidão para a próxima fase" },
          ],
          problem: {
            title: "Contexto",
            body: "Franquia de varejo infantil com tese clara de expansão, ainda sem a estrutura completa para acelerar a próxima fase com disciplina.",
          },
          solution: {
            title: "Tese & ação",
            body: "Apoio em estrutura, posicionamento e preparação operacional para que a marca avance com clareza na expansão.",
          },
          outcome: {
            title: "Resultado",
            body: "Base estruturada para expansão da franquia — com posicionamento e prontidão para o próximo capítulo de crescimento.",
          },
        },
      },
      {
        id: "superbloom",
        company: "Superbloom Real Estate",
        headline: "Plataforma imobiliária estruturada para investidores institucionais.",
        description:
          "Real estate com disciplina de capital e horizonte longo. Estruturação da plataforma e narrativa institucional para atrair e operar capital com clareza.",
        category: "Real Estate",
        location: "Estados Unidos",
        result: "Plataforma preparada para capital institucional",
        resultLabel: "Resultado",
        logo: "/images/logos-empresas/Superbloom-1.png",
        logoBg: "light",
        visitUrl: "https://superbloomdev.com/",
        instagramUrl: "https://www.instagram.com/superbloomdev/",
        image: "/images/nyc-chrysler-building-midtown.jpg",
        video: "/videos/realestate.mp4",
        gallery: [
          "/images/nyc-chrysler-building-midtown.jpg",
        ],
        detail: {
          sector: "Real Estate · Plataforma",
          summary:
            "Estruturação da Superbloom Real Estate e narrativa institucional para atrair e operar capital com clareza e horizonte longo.",
          highlights: [
            { value: "Plataforma", label: "Estrutura para capital institucional" },
            { value: "Narrativa", label: "Clareza institucional para investidores" },
          ],
          problem: {
            title: "Contexto",
            body: "Plataforma imobiliária com tese de longo prazo, ainda em fase de estruturação para dialogar com capital institucional com clareza.",
          },
          solution: {
            title: "Tese & ação",
            body: "Estruturação da plataforma, disciplina de capital e narrativa institucional alinhadas a um horizonte longo de real estate.",
          },
          outcome: {
            title: "Resultado",
            body: "Plataforma preparada para capital institucional — com narrativa e estrutura mais claras para operar e crescer.",
          },
        },
      },
    ],
  },
  model: {
    eyebrow: "Modelo",
    title: "Parceiro estratégico, não apenas consultor",
    items: [
      {
        title: "Equity Builder",
        description:
          "Entramos na liderança para transformar empresas por meio de serviços estratégicos — não de capital.",
      },
      {
        title: "Presença internacional ativa",
        description:
          "Raízes no Brasil e base nos EUA. Estrutura, inteligência e conexão real para internacionalização.",
      },
      {
        title: "Metodologia comprovada",
        description:
          "Mergulhamos na operação com abordagem prática, orientada a performance e resultados mensuráveis.",
      },
    ],
  },
  valueCreation: {
    eyebrow: "Como criamos valor",
    title: "Assumimos a empresa por três frentes.",
    intro:
      "Não vendemos serviços avulsos. Entramos como sócios e trabalhamos três alavancas em paralelo, do primeiro trimestre ao evento de liquidez.",
    items: [
      {
        id: "operacional",
        title: "Operacional",
        description:
          "Entramos na operação lado a lado com a liderança para destravar eficiência, margem e disciplina de execução. Toda empresa em portfólio opera com metas e reporting mensal desde o primeiro trimestre.",
      },
      {
        id: "governanca",
        title: "Governança",
        description:
          "Instalamos board formal, controles e estrutura societária que tornam a empresa investível. Governança não é burocracia — é o que sustenta valuation em uma venda ou captação.",
      },
      {
        id: "capital",
        title: "Capital & Expansão",
        description:
          "Estruturamos capital e conduzimos a expansão internacional, com base nos Estados Unidos, até o evento de liquidez. Presença real nos dois mercados, não representação de papel.",
      },
    ],
  },
  faq: {
    eyebrow: "Processo",
    title: "Perguntas frequentes",
    items: [
      {
        question: "Como funciona o processo de avaliação de uma empresa?",
        answer:
          "Começa por uma conversa de qualificação, sem compromisso. Se houver aderência à nossa tese, avançamos para um diagnóstico de operação, governança e potencial internacional antes de qualquer proposta de parceria.",
      },
      {
        question: "Vocês investem capital financeiro, participação operacional, ou ambos?",
        answer:
          "Ambos, quando faz sentido. Assumimos posição na empresa (ownership ativo) e trabalhamos dentro dela — operação, governança e capital — em vez de apenas aconselhar de fora.",
      },
      {
        question: "Qual é o horizonte típico de uma parceria?",
        answer:
          "Trabalhamos em ciclos de médio e longo prazo, orientados a um evento de liquidez (venda, captação ou expansão). O horizonte é definido caso a caso, sempre alinhado ao momento da empresa.",
      },
      {
        question: "O que acontece com a liderança atual após a entrada da Head Oversea?",
        answer:
          "A liderança permanece e ganha um sócio operacional. Nosso papel é fortalecer o time e a estrutura — não substituir a visão de quem construiu o negócio.",
      },
      {
        question: "Como funciona a saída (liquidez) ao final do ciclo?",
        answer:
          "Preparamos a empresa desde o início para ser investível e vendável: governança, números auditáveis e posicionamento internacional. A saída pode ser venda estratégica, captação ou entrada de novo investidor.",
      },
    ],
  },
  segments: {
    founders: {
      eyebrow: "Para fundadores",
      title: "Um sócio que entra na operação — não apenas na planilha.",
      subtitle:
        "Para empreendedores com um negócio validado que chegaram ao teto do crescimento doméstico e querem escalar, captar ou vender sem perder o controle da visão.",
      painsTitle: "O que trava você hoje",
      pains: [
        "Falta de estrutura de governança para crescer com segurança.",
        "Dificuldade de acessar capital sem abrir mão do controle.",
        "Necessidade de profissionalizar a gestão antes de uma venda ou rodada.",
      ],
      needsTitle: "O que você precisa",
      needs:
        "Um sócio que entenda operação de verdade, não apenas o lado financeiro — e que fique na sala até o resultado.",
      capabilities: ["Governança", "Criação de valor", "Capital & Expansão"],
      cta: "Fale com nosso time de originação",
    },
    investors: {
      eyebrow: "Para investidores",
      title: "Deal flow qualificado de médio porte, com sócio operacional local.",
      subtitle:
        "Para family offices e investidores institucionais que buscam exposição a empresas de médio porte no Brasil e nos Estados Unidos, com um parceiro operacional de confiança no terreno.",
      painsTitle: "O que dificulta hoje",
      pains: [
        "Acesso limitado a deal flow qualificado de médio porte no Brasil/EUA.",
        "Falta de um parceiro operacional local de confiança.",
        "Necessidade de transparência de tese e disciplina de reporting.",
      ],
      needsTitle: "O que você precisa",
      needs:
        "Tese clara, histórico verificável e governança ativa sobre cada ativo do portfólio.",
      capabilities: ["Nossa Tese", "Governança", "Track record de portfólio"],
      cta: "Fale com nosso time de relações institucionais",
    },
  },
  process: {
    eyebrow: "Como funciona",
    title: "Do Brasil para o mundo. Esse é o nosso processo.",
    cta: "Conheça nossa abordagem",
    steps: [
      {
        title: "Diagnóstico",
        description: "Analisamos o potencial do seu negócio e as oportunidades de escala.",
      },
      {
        title: "Estratégia",
        description: "Desenhamos um plano personalizado com foco em crescimento global.",
      },
      {
        title: "Estruturação",
        description: "Estruturamos capital, governança e processos para acelerar resultados.",
      },
      {
        title: "Execução",
        description: "Implementamos o plano com disciplina, gestão ativa e inteligência de mercado.",
      },
      {
        title: "Expansão global",
        description: "Levamos sua empresa a novos mercados e patamares de liderança.",
      },
    ],
  },
  insights: {
    eyebrow: "Notícias",
    title: "Notícias e perspectivas do nosso mercado",
    items: [
      {
        slug: "presenca-operacional-eua",
        title: "Head Oversea amplia presença operacional nos Estados Unidos",
        description:
          "A empresa reforça a tese Brasil–EUA com presença em Orlando e operação ativa junto às empresas do portfólio.",
        date: "Jun 2026",
        category: "Empresa",
        categoryColor: "#3a3f4a",
        author: "Head Oversea",
        href: "/insights/presenca-operacional-eua",
        image: "/images/ft.jpg",
        body: [
          "A Head Oversea reforça sua presença operacional nos Estados Unidos com base em Orlando — ponto de apoio para governança, relacionamentos e execução junto às empresas do portfólio.",
          "A tese Brasil–EUA da empresa não é uma narrativa de internacionalização superficial. É presença nos dois lados: originação e confiança no Brasil; estrutura, disciplina e escala nos Estados Unidos.",
          "Esse movimento consolida a capacidade da Head Oversea de atuar como sócio ativo — no board, na operação e nas decisões de capital — com horizonte longo e accountability local.",
        ],
      },
      {
        slug: "riolaser-mercado-americano",
        title: "Riolaser: de operação brasileira a referência no mercado americano",
        description:
          "Ownership ativo em governança e operação — do posicionamento à consolidação da marca nos EUA.",
        date: "Mai 2026",
        category: "Portfólio",
        categoryColor: "#c85e18",
        author: "Head Oversea",
        href: "/insights/riolaser-mercado-americano",
        image: "/images/empresas/riolaser.jpg",
        body: [
          "A Riolaser ilustra o modelo de ownership ativo da Head Oversea: entrada na liderança, estruturação de governança e disciplina operacional desde o início do ciclo.",
          "Do posicionamento à consolidação da marca no mercado americano, a trajetória combina presença local, execução hands-on e alinhamento de longo prazo entre sócios e liderança.",
          "O resultado é um negócio preparado para competir nos Estados Unidos — com marca, operação e governança à altura do mercado.",
        ],
      },
      {
        slug: "real-estate-dois-mercados",
        title: "Real estate: disciplina e horizonte longo entre dois mercados",
        description:
          "Como a tese de ativos reais da Head Oversea equilibra capital paciente no Brasil e nos Estados Unidos.",
        date: "Abr 2026",
        category: "Real Estate",
        categoryColor: "#26476f",
        author: "Head Oversea",
        href: "/insights/real-estate-dois-mercados",
        image: "/images/philadelphia-skyline-us-real-estate.jpg",
        body: [
          "Em real estate, a Head Oversea investe com disciplina estratégica e capital paciente — sem pressa por liquidez de curto prazo.",
          "A tese atravessa Brasil e Estados Unidos: ativos reais, perspectiva de longo prazo e critério rigoroso de alocação.",
          "O objetivo é construir valor duradouro em patrimônios físicos, com a mesma lógica de ownership que define o private equity da firma.",
        ],
      },
      {
        slug: "governanca-ativa-ownership",
        title: "Governança ativa: o que separa ownership de aporte passivo",
        description:
          "Por que estar na sala de decisão multiplica valor — e como a Head Oversea opera lado a lado com a liderança.",
        date: "Mar 2026",
        category: "Tese",
        categoryColor: "#2f3a34",
        author: "Head Oversea",
        href: "/insights/governanca-ativa-ownership",
        image: "/images/private-equity-team-collaboration.jpg",
        body: [
          "Aportar capital sem presença na decisão é uma tese diferente de ownership ativo. A Head Oversea escolhe a segunda.",
          "Estar na sala de decisão — board, operação e capital — é o que permite corrigir rumo, acelerar execução e proteger valor ao longo do ciclo.",
          "Essa postura define a relação com fundadores e lideranças: parceria de longo prazo, não cheque e distância.",
        ],
      },
    ],
  },
  about: {
    eyebrow: "Sobre nós",
    title: "Investimos e construímos ativos de alto valor.",
    intro:
      "Uma investment firm de private equity e real estate, com atuação no Brasil e nos Estados Unidos e visão de longo prazo.",
    history: [
      "A Head Oversea investe em negócios consolidados e ativos imobiliários, assumindo posições de propriedade ativa e trabalhando lado a lado com a liderança.",
      "Operamos sob o conceito de ownership ativo — governança, disciplina operacional e capital — construindo valor duradouro em private equity e real estate.",
    ],
    team: [
      {
        name: "Douglas Bubna",
        role: "CEO & Founder",
        bio: "Lidera a tese de ownership ativo da Head Oversea e a expansão entre Brasil e Estados Unidos.",
        photo: "/images/team/Douglas.jpg",
        linkedin: "https://www.linkedin.com/in/douglas-bubna-89a40523",
      },
      {
        name: "Lucas Policarpo",
        role: "CFO & Founder",
        bio: "Responsável pela estrutura de capital e disciplina financeira de cada empresa do portfólio.",
        photo: "/images/team/Lucas.jpg",
        linkedin: "https://www.linkedin.com/in/lucas-policarpo-7b19b9171",
      },
      {
        name: "Beatriz Nicola",
        role: "Líder de Marketing",
        bio: "Conduz posicionamento e marca das empresas do portfólio.",
        photo: "/images/team/beatriz.png",
        linkedin: "https://www.linkedin.com/in/beatriz-nicola-559aa0169/",
      },
      {
        name: "Jakson Martins",
        role: "Project Manager",
        bio: "Governança ativa e operação — a ponte entre a tese e a execução diária.",
        photo: "/images/team/Jakson.png",
        linkedin: "https://www.linkedin.com/in/jakson-martins-770b08150/",
      },
      {
        name: "Mariana Lewandowski",
        role: "Coordenadora de RH",
        bio: "Estrutura liderança e cultura para empresas prontas para escalar globalmente.",
        photo: "/images/team/mariana.jpg",
      },
      {
        name: "Thales De Lorenzi",
        role: "Business Development",
        bio: "Originação e relacionamento com fundadores e investidores nos dois mercados.",
        photo: "/images/team/thales.jpg",
      },
      {
        name: "Rafael Zardo",
        role: "Corporate Controller",
        bio: "Controladoria, contabilidade, orçamento financeiro e relatórios gerenciais.",
        photo: "/images/team/rafael.jpg",
        linkedin: "https://www.linkedin.com/in/rafazardo/",
      },
      {
        name: "Pedro Castro",
        role: "Analista Financeiro",
        bio: "Atua no departamento financeiro da Head Oversea, com disciplina de números e reporting.",
        photo: "/images/team/Pedro-Castro.jpg",
        linkedin: "https://www.linkedin.com/in/pedrohpcastro/",
      },
      {
        name: "Joyce",
        role: "Assistente de Marketing",
        bio: "Apoia posicionamento, conteúdo e execução de marketing das empresas do portfólio.",
        photo: "/images/team/joyce.jpg",
        linkedin: "https://www.linkedin.com/in/joyce-branco-43a21527b/",
      },
      {
        name: "Marcela Portela",
        role: "Analista Financeiro",
        bio: "Atua no financeiro com foco operacional em empresas do portfólio, incluindo RoadPro.",
        photo: "/images/team/marcela-portela.png",
        linkedin:
          "https://www.linkedin.com/in/marcela-paretti-portela-carvalho-christianini-9714381bb/",
      },
      {
        name: "Mateus Lucas",
        role: "Technology Junior",
        bio: "Constrói a presença digital da Head Oversea — a plataforma que conecta a firma a fundadores e investidores.",
        photo: "/images/team/mateus.jpg",
        linkedin: "https://www.linkedin.com/in/mateus-lucas-0b2455422",
      },
    ],
  },
  contact: {
    eyebrow: "Contato",
    title: "Vamos falar sobre o futuro do seu negócio",
    subtitle:
      "Se sua empresa está pronta para crescer, reestruturar ou entrar no mercado internacional, estamos aqui para entender sua situação e apresentar soluções sob medida.",
    form: {
      name: "Nome completo",
      email: "E-mail corporativo",
      phone: "Telefone (com WhatsApp)",
      company: "Nome da empresa",
      revenue: "Faturamento anual",
      revenueOptions: [
        "Menos de R$ 1 milhão",
        "R$ 1M a R$ 10M",
        "R$ 10M a R$ 50M",
        "R$ 50M a R$ 500M",
        "Acima de R$ 500M",
      ],
      objective: "Objetivo principal",
      objectiveOptions: [
        "Internacionalizar minha empresa",
        "Atrair investidores / vender",
        "Reestruturar minha empresa",
      ],
      message: "Mensagem adicional",
      submit: "Enviar mensagem",
    },
    info: {
      hours: "Seg–Sex: 8h – 17h (EST) · Sáb: 10h – 16h (EST)",
      email: "contact@headoversea.com",
      phone: "+1 (689) 777-1149",
      address:
        "189 South Orange Ave, Ste 1250, South Tower, Orlando, FL 32801, EUA",
    },
  },
  footer: {
    tagline:
      "Ownership ativo e investimento entre Brasil e Estados Unidos.",
    newsletter: {
      title: "Notícias",
      placeholder: "Seu e-mail corporativo",
      disclaimer: "Cancele a inscrição a qualquer momento.",
    },
    legal: "© 2026 Head Oversea. Todos os direitos reservados.",
    columns: [
      {
        title: "A firma",
        links: [
          { label: "Por que Head Oversea", href: "/por-que-head-oversea" },
          { label: "Nossa Tese", href: "/tese" },
          { label: "Como Atuamos", href: "/como-atuamos" },
          { label: "Sobre nós", href: "/sobre" },
        ],
      },
      {
        title: "Portfólio & Notícias",
        links: [
          { label: "Portfólio", href: "/cases" },
          { label: "Notícias", href: "/insights" },
          { label: "Materiais", href: "/materiais" },
        ],
      },
      {
        title: "Escritórios",
        links: [
          { label: "Brasil", href: "/contato" },
          { label: "Estados Unidos", href: "/contato" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Contato", href: "/contato" },
          { label: "Para Investidores", href: "/investidores" },
          { label: "Para Fundadores", href: "/fundadores" },
        ],
      },
    ],
  },
};
