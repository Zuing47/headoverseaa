import { getPublicSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

/**
 * /llms.txt — machine-readable site map for LLMs.
 * @see https://llmstxt.org
 */
export function GET() {
  const origin = getPublicSiteUrl();

  const body = `# Head Oversea

> Private equity and real estate investment firm. Active ownership in businesses and real assets across Brazil and the United States.

Head Oversea takes ownership positions and works alongside leadership — governance, operations, and capital — with a long-term horizon. The firm operates a Brazil–United States corridor: origination and trust in Brazil; structure, discipline, and scale in the United States. Operating presence since 2022. Office in Orlando, Florida.

Contact: contact@headoversea.com · +1 (689) 777-1149
Address: 189 South Orange Ave, Ste 1250, South Tower, Orlando, FL 32801, United States
Profiles: https://www.linkedin.com/company/headoversea · https://www.instagram.com/headoversea

English is the default site language at ${origin}/. Portuguese lives at ${origin}/pt and unprefixed Portuguese routes.

## English

- [Home](${origin}/): Firm overview — private equity and real estate, active ownership.
- [Why Head Oversea](${origin}/en/why-head-oversea): Difference, presence, and who the conversation is for.
- [Our Thesis](${origin}/en/thesis): What the firm invests in and why.
- [How We Work](${origin}/en/how-we-work): Operations, governance, and capital in parallel; process FAQ.
- [Private Equity](${origin}/en/private-equity): Active ownership, Brazil–U.S. private equity, ownership cycle.
- [Real Estate](${origin}/en/real-estate): Patient capital in real assets, including Geromel and Superbloom.
- [Four fronts](${origin}/en/services): Active ownership, Brazil–U.S. corridor, value creation & liquidity, real estate.
- [Portfolio](${origin}/en/cases): Portfolio companies with active ownership.
- [News](${origin}/en/insights): Firm, portfolio, and market news.
- [Materials](${origin}/en/materials): Study guides for download.
- [About](${origin}/en/about): Firm and leadership.
- [For Founders](${origin}/en/founders): Operating partner for validated businesses.
- [For Investors](${origin}/en/investors): Mid-market deal flow with a local operating partner.
- [Contact](${origin}/en/contact): Talk to the team.

## Português

- [Home](${origin}/pt): Visão da firma — private equity e real estate, ownership ativo.
- [Por que Head Oversea](${origin}/por-que-head-oversea): Diferencial, presença e para quem é a conversa.
- [Nossa Tese](${origin}/tese): No que a firma investe e por quê.
- [Como atuamos](${origin}/como-atuamos): Operação, governança e capital em paralelo; FAQ do processo.
- [Private Equity](${origin}/private-equity): Ownership ativo, private equity Brasil–EUA, ciclo de ownership.
- [Real Estate](${origin}/real-estate): Capital paciente em ativos reais, incluindo Geromel e Superbloom.
- [Quatro frentes](${origin}/servicos): Ownership ativo, corredor Brasil–EUA, criação de valor e liquidez, real estate.
- [Portfólio](${origin}/cases): Empresas do portfólio com ownership ativo.
- [Notícias](${origin}/insights): Notícias da firma, portfólio e mercados.
- [Materiais](${origin}/materiais): Guias de estudo para download.
- [Sobre](${origin}/sobre): Firma e liderança.
- [Para Fundadores](${origin}/fundadores): Sócio operacional para negócios validados.
- [Para Investidores](${origin}/investidores): Deal flow de middle market com parceiro operacional local.
- [Contato](${origin}/contato): Fale com a equipe.

## Optional

- [Sitemap](${origin}/sitemap.xml)
- [Robots](${origin}/robots.txt)
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
