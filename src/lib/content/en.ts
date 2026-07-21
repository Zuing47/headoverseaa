import type { SiteContent } from "@/types/content";

export const en: SiteContent = {
  meta: {
    title: "Head Oversea | Private Equity & Real Estate",
    description:
      "Private equity and real estate investment firm — active ownership and long-term value across Brazil and the United States.",
  },
  nav: [
    { label: "About us", href: "/en/about" },
    { label: "Private Equity", href: "/en/private-equity" },
    { label: "Real Estate", href: "/en/real-estate" },
    { label: "Portfolio", href: "/en/cases" },
    { label: "News", href: "/en/insights" },
  ],
  cta: {
    primary: "Get in touch",
    secondary: "Explore our thesis",
  },
  hero: {
    eyebrow: "Private Equity · Real Estate",
    title: "Building lasting",
    titleAccent: "value.",
    subtitle:
      "A private equity and real estate investment firm. Active ownership in businesses and real assets — Brazil and the United States.",
    statement:
      "Over $42 million in equity generated across portfolio assets.",
    cta: "Explore our investments",
    ctaHref: "/en/cases",
    trustLine:
      "Active U.S. portfolio — Brazil–U.S. operating presence since 2022.",
    founderCta: "I'm a founder",
    investorCta: "I'm an investor",
    image: "/images/us-skyline-presence.jpg",
  },
  home: {
    trust: [
      { value: "42", suffix: "M+", label: "Equity generated" },
      { value: "15", suffix: "+", label: "Companies" },
      { value: "2", suffix: "", label: "Markets" },
      { value: "10", suffix: "+", label: "Years" },
    ],
    thesis: {
      eyebrow: "Our thesis",
      title: "We invest in businesses\nbuilt to endure.",
      body: "We take active ownership positions in established companies and real assets. Governance, operational discipline, and patient capital — with a long-term horizon.",
      cta: "Learn more",
      href: "/en/about",
      image: "/images/investment-strategy-workspace.jpg",
    },
    valueCreation: {
      eyebrow: "How we create value",
      title: "Three levers.\nOne ownership thesis.",
      intro:
        "We do not sell standalone services. We enter as owners and work three fronts in parallel.",
      items: [
        {
          id: "operational",
          number: "01",
          title: "Operational",
          description:
            "Efficiency, margin, and execution discipline alongside leadership.",
        },
        {
          id: "governance",
          number: "02",
          title: "Governance",
          description:
            "Board, controls, and corporate structure that sustain valuation.",
        },
        {
          id: "capital",
          number: "03",
          title: "Capital & Expansion",
          description:
            "Structured capital and international expansion through liquidity events.",
        },
      ],
    },
    realEstate: {
      eyebrow: "02 / Real Estate",
      title: "Real assets.\nLong‑term perspective.",
      body: "We invest in real estate assets with strategic discipline, patient capital, and a long‑term horizon.",
      cta: "Explore Real Estate",
      href: "/en/real-estate",
      image: "/images/luxury-residential-real-estate.jpg",
    },
    portfolio: {
      eyebrow: "Portfolio",
      title: "Companies we believe in.",
      viewAll: "View all",
      viewAllHref: "/en/cases",
      viewProject: "View project",
    },
    featuredCase: {
      eyebrow: "Featured investment",
      company: "Riolaser",
      context:
        "A laser aesthetics clinic in the United States, with a validated model and brand consolidation potential.",
      thesis:
        "Active ownership in private equity — governance and operations to turn potential into a reference in the American market.",
      action:
        "Leadership entry, governance structuring, and operational discipline from the first quarter.",
      result: "From launch to consolidation as a reference brand.",
      cta: "Read the case",
      href: "/en/cases/riolaser",
      image: "/images/empresas/riolaser.jpg",
    },
    insights: {
      eyebrow: "News",
      title: "Market news and perspectives.",
      viewAll: "Learn more",
      viewAllHref: "/en/insights",
    },
    finalCta: {
      title: "Enduring value starts with the right partnership.",
      foundersLabel: "For founders",
      foundersHref: "/en/contact",
      investorsLabel: "For investors",
      investorsHref: "/en/contact",
    },
  },
  metrics: [
    { value: "42", suffix: "M+", label: "Equity generated", icon: "capital" },
    { value: "15", suffix: "+", label: "Companies structured", icon: "companies" },
    { value: "2", suffix: "", label: "Integrated markets", icon: "markets" },
    { value: "10", suffix: "+", label: "Years of combined experience", icon: "experience" },
    { value: "98", suffix: "%", label: "Client retention rate", icon: "retention" },
  ],
  pillars: {
    eyebrow: "Pillars",
    title: "Four fronts. One thesis.",
    items: [
      {
        id: "equity",
        title: "Equity by Service",
        description:
          "We act as strategic partners to restructure, revalue, and prepare businesses for the international market — without capital injection, with hands-on execution.",
        highlights: [
          "Active governance alongside leadership",
          "Comprehensive business model restructuring",
          "Preparation to scale or sell",
        ],
        image: "/images/products/equity.jpg",
      },
      {
        id: "internationalization",
        title: "Internationalization",
        description:
          "We internationalize companies with structural intelligence, assertive strategy, and legal certainty at every step.",
        highlights: [
          "Full U.S. setup",
          "Specialized local support",
          "Growth on solid foundations",
        ],
        image: "/images/products/internationalization.jpg",
      },
      {
        id: "brokerage",
        title: "M&A Advisory",
        description:
          "We connect entrepreneurs with international investors through structured sale processes that maximize value and ensure liquidity.",
        highlights: [
          "Company prepared for sale",
          "Qualified investor matching",
          "End-to-end negotiation",
        ],
        image: "/images/products/brokerage.jpg",
      },
      {
        id: "realestate",
        title: "Real Estate",
        description:
          "We identify and develop strategic real estate opportunities in the U.S., focusing on liquidity, appreciation, and asset security.",
        highlights: [
          "Liquidity-driven investments",
          "Solid international assets",
          "Professional portfolio management",
        ],
        image: "/images/luxury-residential-real-estate.jpg",
      },
    ],
  },
  philosophy: {
    eyebrow: "Our thesis",
    title: "Active ownership",
    body: "We identify companies with validated models and real assets, and build long-term value through active ownership — governance, operations, and capital.",
    thesis:
      "We are not an agency. We are not a consultancy. We are an investment firm — with active ownership and a long-term horizon.",
    mission: {
      label: "Mission",
      text: "Guide companies expanding internationally with practical, personalized, and secure solutions, creating lasting value through strategic partnerships and active governance.",
    },
    vision: {
      label: "Vision",
      text: "To be a global reference in internationalization and business growth, with active governance and soft landing in the United States.",
    },
  },
  cases: {
    eyebrow: "Portfolio",
    title: "Companies we build and grow with",
    items: [
      {
        id: "riolaser",
        company: "Riolaser",
        headline: "From launch to a consolidated reference brand.",
        description:
          "A laser aesthetics clinic in the United States. We entered operations to structure governance, brand, and growth discipline — turning potential into a market reference.",
        category: "Private Equity",
        location: "United States",
        result: "Consolidated brand and professionalized operations",
        resultLabel: "Outcome",
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
          sector: "Private Equity · Aesthetics",
          summary:
            "Head Oversea entered Riolaser’s operations to structure governance, brand, and growth discipline — turning potential into a reference in the American market.",
          highlights: [
            {
              value: "Brand consolidated",
              label: "Professionalized operations in the United States",
            },
            {
              value: "Active ownership",
              label: "Governance and execution alongside leadership",
            },
          ],
          problem: {
            title: "Context",
            body: "A laser aesthetics clinic in the United States, with a validated model and clear consolidation potential — still lacking the governance structure and operational discipline to become a market reference.",
          },
          solution: {
            title: "Thesis & action",
            body: "Active ownership in private equity: leadership entry, board and controls structuring, and operational discipline from the first quarter — with real presence in the American market.",
          },
          outcome: {
            title: "Result",
            body: "From launch to consolidation as a reference brand — professionalized operations, stronger brand narrative, and a base ready for the next growth chapter.",
          },
        },
      },
      {
        id: "drakkar",
        company: "Drakkar",
        headline: "Strategic repositioning in the premium boating market.",
        description:
          "High-end vessels and nautical experience in the United States. We strengthened positioning, operations, and brand presence to reinforce the premium thesis in the American market.",
        category: "Private Equity",
        location: "United States",
        result: "Premium positioning and stronger brand narrative",
        resultLabel: "Outcome",
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
          sector: "Private Equity · Nautical",
          summary:
            "We worked positioning, operations, and brand presence to strengthen Drakkar’s premium thesis in the American nautical market.",
          highlights: [
            { value: "Premium thesis", label: "Narrative and positioning reinforced in the U.S." },
            { value: "Brand presence", label: "Operations and storytelling aligned to the market" },
          ],
          problem: {
            title: "Context",
            body: "A nautical brand with premium potential in the United States, still lacking the positioning discipline and presence needed to consolidate the thesis in the American market.",
          },
          solution: {
            title: "Thesis & action",
            body: "Strategic repositioning, stronger narrative, and operational support to elevate brand perception and commercial consistency in the premium segment.",
          },
          outcome: {
            title: "Result",
            body: "Premium positioning and a reinforced brand narrative — a clearer base to compete and grow in the U.S. nautical market.",
          },
        },
      },
      {
        id: "roadpro",
        company: "RoadPro",
        headline: "Governance and operational model for sustainable growth.",
        description:
          "U.S. operations focused on discipline, reporting, and structure to scale with predictability. Active ownership with real presence in the American market.",
        category: "Private Equity",
        location: "United States",
        result: "Operating model and governance built for scale",
        resultLabel: "Outcome",
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
          sector: "Private Equity · Operations",
          summary:
            "Active ownership focused on governance, reporting, and an operating model so RoadPro can scale with predictability in the United States.",
          highlights: [
            { value: "Governance", label: "Reporting and structure for predictable scale" },
            { value: "Operations", label: "Discipline and real presence in the American market" },
          ],
          problem: {
            title: "Context",
            body: "An operation with growth potential, still without the level of discipline, reporting, and structure needed to scale with predictability.",
          },
          solution: {
            title: "Thesis & action",
            body: "We entered governance and the operating model — controls, decision rhythm, and hands-on presence to sustain durable growth.",
          },
          outcome: {
            title: "Result",
            body: "An operating model and governance prepared for scale — with execution discipline in the American market.",
          },
        },
      },
      {
        id: "geromel",
        company: "Geromel Construction",
        headline: "Structuring and operational discipline in the construction sector.",
        description:
          "Construction and real assets with a long-term lens. We structure processes, governance, and financial discipline to sustain valuation and consistent execution.",
        category: "Real Estate",
        location: "United States",
        result: "More structured operations ready for growth",
        resultLabel: "Outcome",
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
          sector: "Real Estate · Construction",
          summary:
            "We structured processes, governance, and financial discipline at Geromel Construction to sustain valuation and consistent execution in real assets.",
          highlights: [
            { value: "Operating discipline", label: "Processes and governance for consistent execution" },
            { value: "Long horizon", label: "Real assets with a sustainable valuation view" },
          ],
          problem: {
            title: "Context",
            body: "A construction company with real-asset potential, still needing process structure, governance, and financial discipline for the next cycle.",
          },
          solution: {
            title: "Thesis & action",
            body: "Operating organization, governance, and financial criteria aligned to a long horizon — so execution matches the real-assets thesis.",
          },
          outcome: {
            title: "Result",
            body: "A more structured operation prepared for growth — with a base for valuation and disciplined scale.",
          },
        },
      },
      {
        id: "once",
        company: "Once Upon A Child",
        headline: "Franchise brand structured for a new growth phase.",
        description:
          "Children's retail with a clear expansion thesis. Support on structure, positioning, and readiness for the brand's next growth chapter.",
        category: "Private Equity",
        location: "United States",
        result: "Structured base for expansion",
        resultLabel: "Outcome",
        logo: "/images/logos-empresas/onceatualizada.webp",
        logoBg: "light",
        visitUrl: "https://onceuponachild.com/",
        instagramUrl: "https://www.instagram.com/onceuponachild/",
        image: "/images/empresas/once.jpg",
        video: "/videos/once.mp4",
        gallery: ["/images/empresas/once.jpg"],
        detail: {
          sector: "Private Equity · Franchise",
          summary:
            "Support on structure, positioning, and readiness for Once Upon A Child’s next growth chapter in the United States.",
          highlights: [
            { value: "Structure", label: "A base prepared for expansion" },
            { value: "Positioning", label: "Narrative and readiness for the next phase" },
          ],
          problem: {
            title: "Context",
            body: "A children’s retail franchise with a clear expansion thesis, still without the full structure to accelerate the next phase with discipline.",
          },
          solution: {
            title: "Thesis & action",
            body: "Support on structure, positioning, and operating readiness so the brand can advance expansion with clarity.",
          },
          outcome: {
            title: "Result",
            body: "A Structured base for expansion — with positioning and readiness for the next growth chapter.",
          },
        },
      },
      {
        id: "superbloom",
        company: "Superbloom Real Estate",
        headline: "Real estate platform structured for institutional investors.",
        description:
          "Real estate with capital discipline and a long horizon. Platform structuring and institutional narrative to attract and operate capital with clarity.",
        category: "Real Estate",
        location: "United States",
        result: "Platform prepared for institutional capital",
        resultLabel: "Outcome",
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
          sector: "Real Estate · Platform",
          summary:
            "Structuring Superbloom Real Estate and an institutional narrative to attract and operate capital with clarity and a long horizon.",
          highlights: [
            { value: "Platform", label: "Structure for institutional capital" },
            { value: "Narrative", label: "Institutional clarity for investors" },
          ],
          problem: {
            title: "Context",
            body: "A real estate platform with a long-term thesis, still structuring to speak to institutional capital with clarity.",
          },
          solution: {
            title: "Thesis & action",
            body: "Platform structuring, capital discipline, and institutional narrative aligned to a long real-estate horizon.",
          },
          outcome: {
            title: "Result",
            body: "A platform prepared for institutional capital — with clearer narrative and structure to operate and grow.",
          },
        },
      },
    ],
  },
  model: {
    eyebrow: "Model",
    title: "Strategic partner, not just advisor",
    items: [
      {
        title: "Equity Builder",
        description:
          "We join leadership in transforming companies through strategic services — not capital.",
      },
      {
        title: "Active international presence",
        description:
          "Roots in Brazil and a base in the U.S. Structure, intelligence, and real connection for internationalization.",
      },
      {
        title: "Proven methodology",
        description:
          "We dive into operations with a practical, performance-oriented approach and measurable results.",
      },
    ],
  },
  valueCreation: {
    eyebrow: "How we create value",
    title: "We take on the company across three fronts.",
    intro:
      "We don't sell standalone services. We come in as partners and work three levers in parallel, from the first quarter to the liquidity event.",
    items: [
      {
        id: "operacional",
        title: "Operations",
        description:
          "We work inside the operation alongside leadership to unlock efficiency, margin, and execution discipline. Every portfolio company runs on targets and monthly reporting from the first quarter.",
      },
      {
        id: "governanca",
        title: "Governance",
        description:
          "We install a formal board, controls, and a corporate structure that make the company investable. Governance isn't bureaucracy — it's what sustains valuation in a sale or raise.",
      },
      {
        id: "capital",
        title: "Capital & Expansion",
        description:
          "We structure capital and lead international expansion, based in the United States, through the liquidity event. Real presence in both markets, not a paper representation.",
      },
    ],
  },
  faq: {
    eyebrow: "Process",
    title: "Frequently asked questions",
    items: [
      {
        question: "How does the company evaluation process work?",
        answer:
          "It starts with a qualification conversation, no strings attached. If there's fit with our thesis, we move to a diagnosis of operations, governance, and international potential before any partnership proposal.",
      },
      {
        question: "Do you invest financial capital, operational involvement, or both?",
        answer:
          "Both, when it makes sense. We take a position in the company (active ownership) and work inside it — operations, governance, and capital — rather than advising from the outside.",
      },
      {
        question: "What is the typical horizon of a partnership?",
        answer:
          "We work in medium- and long-term cycles oriented toward a liquidity event (sale, raise, or expansion). The horizon is defined case by case, always aligned with the company's moment.",
      },
      {
        question: "What happens to current leadership after Head Oversea comes in?",
        answer:
          "Leadership stays and gains an operating partner. Our role is to strengthen the team and structure — not to replace the vision of those who built the business.",
      },
      {
        question: "How does the exit (liquidity) work at the end of the cycle?",
        answer:
          "We prepare the company from day one to be investable and sellable: governance, auditable numbers, and international positioning. The exit can be a strategic sale, a raise, or a new investor.",
      },
    ],
  },
  segments: {
    founders: {
      eyebrow: "For founders",
      title: "A partner who joins the operation — not just the spreadsheet.",
      subtitle:
        "For entrepreneurs with a validated business who have hit the ceiling of domestic growth and want to scale, raise, or sell without losing control of the vision.",
      painsTitle: "What holds you back today",
      pains: [
        "Lack of governance structure to grow safely.",
        "Difficulty accessing capital without giving up control.",
        "Need to professionalize management before a sale or round.",
      ],
      needsTitle: "What you need",
      needs:
        "A partner who truly understands operations, not just the financial side — and who stays in the room until the result.",
      capabilities: ["Governance", "Value creation", "Capital & Expansion"],
      cta: "Talk to our origination team",
    },
    investors: {
      eyebrow: "For investors",
      title: "Qualified mid-market deal flow, with a local operating partner.",
      subtitle:
        "For family offices and institutional investors seeking exposure to mid-market companies in Brazil and the United States, with a trusted operating partner on the ground.",
      painsTitle: "What makes it hard today",
      pains: [
        "Limited access to qualified mid-market deal flow in Brazil/U.S.",
        "Lack of a trusted local operating partner.",
        "Need for thesis transparency and reporting discipline.",
      ],
      needsTitle: "What you need",
      needs:
        "A clear thesis, verifiable track record, and active governance over every portfolio asset.",
      capabilities: ["Our Thesis", "Governance", "Portfolio track record"],
      cta: "Talk to our institutional relations team",
    },
  },
  process: {
    eyebrow: "How it works",
    title: "From Brazil to the world. This is our process.",
    cta: "Explore our approach",
    steps: [
      {
        title: "Diagnosis",
        description: "We assess your business potential and the opportunities to scale.",
      },
      {
        title: "Strategy",
        description: "We design a tailored plan focused on global growth.",
      },
      {
        title: "Structuring",
        description: "We structure capital, governance, and processes to accelerate results.",
      },
      {
        title: "Execution",
        description: "We implement the plan with discipline, active management, and market intelligence.",
      },
      {
        title: "Global expansion",
        description: "We take your company to new markets and new levels of leadership.",
      },
    ],
  },
  insights: {
    eyebrow: "News",
    title: "News and perspectives from our market",
    items: [
      {
        slug: "us-operational-presence",
        title: "Head Oversea expands operational presence in the United States",
        description:
          "The firm strengthens its Brazil–U.S. thesis with Orlando presence and active work alongside portfolio companies.",
        date: "Jun 2026",
        category: "Company",
        categoryColor: "#3a3f4a",
        author: "Head Oversea",
        href: "/en/insights/us-operational-presence",
        image: "/images/ft.jpg",
        body: [
          "Head Oversea is deepening its operational presence in the United States from Orlando — a base for governance, relationships, and execution alongside portfolio companies.",
          "The firm’s Brazil–U.S. thesis is not a thin internationalization story. It is presence on both sides: origination and trust in Brazil; structure, discipline, and scale in the United States.",
          "This move strengthens Head Oversea’s ability to act as an active partner — at the board, in operations, and in capital decisions — with a long horizon and local accountability.",
        ],
      },
      {
        slug: "riolaser-us-market",
        title: "Riolaser: from Brazilian operations to a U.S. market reference",
        description:
          "Active ownership in governance and operations — from positioning to brand consolidation in the United States.",
        date: "May 2026",
        category: "Portfolio",
        categoryColor: "#c85e18",
        author: "Head Oversea",
        href: "/en/insights/riolaser-us-market",
        image: "/images/empresas/riolaser.jpg",
        body: [
          "Riolaser illustrates Head Oversea’s active ownership model: leadership entry, governance structure, and operational discipline from the start of the cycle.",
          "From positioning to brand consolidation in the U.S. market, the path combines local presence, hands-on execution, and long-term alignment between partners and leadership.",
          "The outcome is a business built to compete in the United States — with brand, operations, and governance that match the market.",
        ],
      },
      {
        slug: "real-estate-two-markets",
        title: "Real estate: discipline and a long horizon across two markets",
        description:
          "How Head Oversea’s real-asset thesis balances patient capital in Brazil and the United States.",
        date: "Apr 2026",
        category: "Real Estate",
        categoryColor: "#26476f",
        author: "Head Oversea",
        href: "/en/insights/real-estate-two-markets",
        image: "/images/philadelphia-skyline-us-real-estate.jpg",
        body: [
          "In real estate, Head Oversea invests with strategic discipline and patient capital — without rushing short-term liquidity.",
          "The thesis spans Brazil and the United States: real assets, a long-term view, and rigorous allocation criteria.",
          "The goal is enduring value in physical assets, with the same ownership logic that defines the firm’s private equity approach.",
        ],
      },
      {
        slug: "active-governance-ownership",
        title: "Active governance: what separates ownership from passive capital",
        description:
          "Why being in the decision room multiplies value — and how Head Oversea works alongside leadership.",
        date: "Mar 2026",
        category: "Thesis",
        categoryColor: "#2f3a34",
        author: "Head Oversea",
        href: "/en/insights/active-governance-ownership",
        image: "/images/private-equity-team-collaboration.jpg",
        body: [
          "Injecting capital without a seat in the decision room is a different thesis from active ownership. Head Oversea chooses the latter.",
          "Being in the room — board, operations, and capital — is what allows course correction, faster execution, and value protection across the cycle.",
          "That posture defines the relationship with founders and leadership: a long-term partnership, not a check and distance.",
        ],
      },
    ],
  },
  about: {
    eyebrow: "About us",
    title: "We invest in and build high-value assets.",
    intro:
      "A private equity and real estate investment firm operating in Brazil and the United States, with a long-term view.",
    history: [
      "Head Oversea invests in consolidated businesses and real estate assets, taking active ownership positions and working alongside leadership.",
      "We operate under an active ownership approach — governance, operational discipline, and capital — building enduring value in private equity and real estate.",
    ],
    team: [
      {
        name: "Douglas Bubna",
        role: "CEO & Founder",
        bio: "Leads Head Oversea's active ownership thesis and its expansion between Brazil and the United States.",
        photo: "/images/team/Douglas.jpg",
        linkedin: "https://www.linkedin.com/in/douglas-bubna-89a40523",
      },
      {
        name: "Lucas Policarpo",
        role: "CFO & Founder",
        bio: "Responsible for capital structure and financial discipline across every portfolio company.",
        photo: "/images/team/Lucas.jpg",
        linkedin: "https://www.linkedin.com/in/lucas-policarpo-7b19b9171",
      },
      {
        name: "Beatriz Nicola",
        role: "Marketing Lead",
        bio: "Drives positioning and brand for portfolio companies.",
        photo: "/images/team/beatriz.png",
        linkedin: "https://www.linkedin.com/in/beatriz-nicola-559aa0169/",
      },
      {
        name: "Jakson Martins",
        role: "Project Manager",
        bio: "Active governance and operations — the bridge between thesis and daily execution.",
        photo: "/images/team/Jakson.png",
        linkedin: "https://www.linkedin.com/in/jakson-martins-770b08150/",
      },
      {
        name: "Mariana Lewandowski",
        role: "HR Coordinator",
        bio: "Builds leadership and culture for companies ready to scale globally.",
        photo: "/images/team/mariana.jpg",
      },
      {
        name: "Thales De Lorenzi",
        role: "Business Development",
        bio: "Origination and relationships with founders and investors in both markets.",
        photo: "/images/team/thales.jpg",
      },
      {
        name: "Rafael Zardo",
        role: "Corporate Controller",
        bio: "Controllership, accounting, financial budgeting, and management reporting.",
        photo: "/images/team/rafael.jpg",
        linkedin: "https://www.linkedin.com/in/rafazardo/",
      },
      {
        name: "Pedro Castro",
        role: "Financial Analyst",
        bio: "Works in Head Oversea's finance team with discipline in numbers and reporting.",
        photo: "/images/team/Pedro-Castro.jpg",
        linkedin: "https://www.linkedin.com/in/pedrohpcastro/",
      },
      {
        name: "Joyce",
        role: "Marketing Assistant",
        bio: "Supports positioning, content, and marketing execution for portfolio companies.",
        photo: "/images/team/joyce.jpg",
        linkedin: "https://www.linkedin.com/in/joyce-branco-43a21527b/",
      },
      {
        name: "Marcela Portela",
        role: "Financial Analyst",
        bio: "Finance operations with focus on portfolio companies, including RoadPro.",
        photo: "/images/team/marcela-portela.png",
        linkedin:
          "https://www.linkedin.com/in/marcela-paretti-portela-carvalho-christianini-9714381bb/",
      },
      {
        name: "Mateus Lucas",
        role: "Technology Junior",
        bio: "Builds Head Oversea's digital presence — the platform connecting the firm to founders and investors.",
        photo: "/images/team/mateus.jpg",
        linkedin: "https://www.linkedin.com/in/mateus-lucas-0b2455422",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's talk about the future of your business",
    subtitle:
      "If your company is ready to grow, restructure, or enter the international market, we are here to understand your situation and present tailored solutions.",
    form: {
      name: "Full name",
      email: "Corporate email",
      phone: "Phone (with WhatsApp)",
      company: "Company name",
      revenue: "Annual revenue",
      revenueOptions: [
        "Less than $200K",
        "$200K to $2M",
        "$2M to $10M",
        "$10M to $100M",
        "Above $100M",
      ],
      objective: "Primary objective",
      objectiveOptions: [
        "Internationalize my company",
        "Attract investors / sell",
        "Restructure my company",
      ],
      message: "Additional message",
      submit: "Send message",
    },
    info: {
      hours: "Mon–Fri: 8am – 5pm (EST) · Sat: 10am – 4pm (EST)",
      email: "contact@headoversea.com",
      phone: "+1 (689) 777-1149",
      address:
        "189 South Orange Ave, Ste 1250, South Tower, Orlando, FL 32801, United States",
    },
  },
  footer: {
    tagline:
      "Active ownership and investment across Brazil and the United States.",
    newsletter: {
      title: "News",
      placeholder: "Your corporate email",
      disclaimer: "Unsubscribe anytime.",
    },
    legal: "© 2026 Head Oversea. All rights reserved.",
    columns: [
      {
        title: "The Firm",
        links: [
          { label: "Why Head Oversea", href: "/en/why-head-oversea" },
          { label: "Our Thesis", href: "/en/thesis" },
          { label: "How We Operate", href: "/en/how-we-work" },
          { label: "About us", href: "/en/about" },
        ],
      },
      {
        title: "Portfolio & News",
        links: [
          { label: "Portfolio", href: "/en/cases" },
          { label: "News", href: "/en/insights" },
          { label: "Materials", href: "/en/materials" },
        ],
      },
      {
        title: "Offices",
        links: [
          { label: "Brazil", href: "/en/contact" },
          { label: "United States", href: "/en/contact" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Contact", href: "/en/contact" },
          { label: "For Investors", href: "/en/contact" },
          { label: "For Founders", href: "/en/contact" },
        ],
      },
    ],
  },
};
