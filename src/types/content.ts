export type Locale = "pt" | "en";

export interface NavItem {
  label: string;
  href: string;
}

export type IconName =
  | "capital"
  | "companies"
  | "markets"
  | "experience"
  | "retention";

export interface Metric {
  value: string;
  suffix?: string;
  label: string;
  icon?: IconName;
}

export interface Pillar {
  id: string;
  title: string;
  description: string;
  highlights: string[];
  image?: string;
}

export interface CaseStudyDetail {
  sector?: string;
  summary: string;
  highlights: { value: string; label: string }[];
  problem: { title: string; body: string };
  solution: { title: string; body: string };
  outcome: { title: string; body: string };
  quote?: { text: string; author: string; role: string };
}

export interface CaseStudy {
  id: string;
  company: string;
  headline: string;
  /** Longer editorial description for cases / immersion */
  description?: string;
  category: string;
  location?: string;
  result?: string;
  resultLabel?: string;
  /** Primary photo */
  image?: string;
  /** Extra photos for galleries */
  gallery?: string[];
  /** Optional looping case video */
  video?: string;
  logo?: string;
  /** Logo for dark surfaces (transparent / light ink). Falls back to logo. */
  logoOnDark?: string;
  logoBg?: "light" | "dark";
  visitUrl?: string;
  /** Official Instagram profile URL */
  instagramUrl?: string;
  /**
   * ownership = foto + site (PE/RE).
   * brand = só logo no listing; narrativa completa em /cases/[id].
   */
  format?: "ownership" | "brand";
  detail?: CaseStudyDetail;
}

export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  linkedin?: string;
  photo?: string;
}

export interface Insight {
  slug: string;
  title: string;
  date: string;
  category: string;
  href: string;
  image?: string;
  description?: string;
  body?: string[];
  author?: string;
  categoryColor?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SegmentContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  painsTitle: string;
  pains: string[];
  needsTitle: string;
  needs: string;
  capabilities: string[];
  cta: string;
}

export interface HomeContent {
  trust: Metric[];
  thesis: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
    href: string;
    image: string;
  };
  valueCreation: {
    eyebrow: string;
    title: string;
    intro?: string;
    items: { id: string; number: string; title: string; description: string }[];
  };
  realEstate: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
    href: string;
    image: string;
  };
  portfolio: {
    eyebrow: string;
    title: string;
    viewAll: string;
    viewAllHref: string;
    viewProject: string;
  };
  featuredCase: {
    eyebrow: string;
    company: string;
    context: string;
    thesis: string;
    action: string;
    result: string;
    cta: string;
    href: string;
    image: string;
  };
  insights: {
    eyebrow: string;
    title: string;
    viewAll: string;
    viewAllHref: string;
  };
  finalCta: {
    title: string;
    foundersLabel: string;
    foundersHref: string;
    investorsLabel: string;
    investorsHref: string;
  };
}

export interface SiteContent {
  meta: {
    title: string;
    description: string;
  };
  nav: NavItem[];
  cta: {
    primary: string;
    secondary: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    titleAccent?: string;
    subtitle: string;
    statement: string;
    videoLabel?: string;
    image?: string;
    cta?: string;
    ctaHref?: string;
    trustLine?: string;
    founderCta?: string;
    investorCta?: string;
  };
  home: HomeContent;
  metrics: Metric[];
  pillars: {
    eyebrow: string;
    title: string;
    items: Pillar[];
  };
  philosophy: {
    eyebrow: string;
    title: string;
    body: string;
    thesis: string;
    mission: { label: string; text: string };
    vision: { label: string; text: string };
  };
  cases: {
    eyebrow: string;
    title: string;
    items: CaseStudy[];
  };
  model: {
    eyebrow: string;
    title: string;
    items: { title: string; description: string }[];
  };
  valueCreation: {
    eyebrow: string;
    title: string;
    intro?: string;
    items: { id: string; title: string; description: string }[];
  };
  faq: {
    eyebrow: string;
    title: string;
    items: FaqItem[];
  };
  segments: {
    founders: SegmentContent;
    investors: SegmentContent;
  };
  process: {
    eyebrow: string;
    title: string;
    cta: string;
    steps: { title: string; description: string }[];
  };
  insights: {
    eyebrow: string;
    title: string;
    items: Insight[];
  };
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    history: string[];
    team: TeamMember[];
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      phone: string;
      company: string;
      revenue: string;
      revenueOptions: string[];
      objective: string;
      objectiveOptions: string[];
      message: string;
      submit: string;
    };
    info: {
      hours: string;
      email: string;
      phone: string;
      address: string;
    };
  };
  footer: {
    tagline: string;
    newsletter: {
      title: string;
      placeholder: string;
      disclaimer: string;
    };
    legal: string;
    columns: { title: string; links: NavItem[] }[];
  };
}
