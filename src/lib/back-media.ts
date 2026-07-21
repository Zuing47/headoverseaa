/**
 * BACK media map — curated assets with page ownership to avoid repetition.
 *
 * Exclusive heroes / videos (do not reuse as hero or primary band elsewhere):
 * - private-equity.jpg   → Private Equity
 * - canyon / nyc skyline → Real Estate
 * - lawrence buildings   → Thesis
 * - workspace            → Como atuamos
 * - about.jpg            → Sobre
 * - team-trade           → Time
 * - riolaser storefront  → Cases listing
 * - chrysler             → News listing
 * - patrick nyc glass    → Fundadores
 * - mpewny ice           → Investidores
 * - us-skyline-hq        → Por que Head Oversea
 * - handshake            → Serviços (hero)
 * - us flag (presence)   → Private Equity (global expansion)
 * - nyc sunset skyline    → Como atuamos (hero)
 * - eua.mp4               → Como atuamos (essentials band)
 * - lower manhattan       → Como atuamos (impact grid)
 * - flag + chicago poster → Como atuamos (impact grid)
 *
 * Videos — one page each:
 * - sunset               → Home hero (NYC golden-hour, 1080p)
 * - ocean                → Home StoryBand only
 * - back-markets         → Private Equity only
 * - portrait-a           → Por que Head Oversea only
 * - portrait-b           → Fundadores only
 * - niagara              → Tese + Private Equity hero (shared by request)
 * - investidores.mp4     → Investidores (slim 1080p from same master)
 * - eua                  → Como atuamos only
 * - videoplayback        → Private Equity featured (with audio)
 * - realestate.mp4       → Real Estate only
 */
export const BACK_MEDIA = {
  peDesk: "/images/private-equity.jpg",
  canyon: "/images/nginnhong-canyon-9215914.jpg",
  house: "/images/real-estate-nyc-skyline.png",
  nycFlag: "/images/ft.jpg",
  nycAerial: "/images/lawrencec1979-buildings-8271782.jpg",
  nycGlass: "/images/patricklfc93-new-york-7781184.jpg",
  usFlag: "/images/alexas_fotos-banner-3368374.jpg",
  manhattanIce: "/images/mpewny-buildings-668616.jpg",
  teamCollab: "/images/private-equity-team-collaboration.jpg",
  workspace: "/images/investment-strategy-workspace.jpg",
  handshake: "/images/real-estate-transaction-handshake.jpg",
  luxuryHome: "/images/luxury-residential-real-estate.jpg",
  chrysler: "/images/nyc-chrysler-building-midtown.jpg",
  oceanPoster: "/images/homevideo-poster.jpg",
  riolaser: "/images/empresas/riolaser.jpg",
  teamTrade: "/images/head/team-trade.jpg",
  expansion: "/images/head/us-expansion-role.jpg",
  office: "/images/head/expansion-office.jpg",
  boats: "/images/head/team-boats.jpg",
  about: "/images/about.jpg",
  skylineHq: "/images/us-skyline-hq.jpg",
  philadelphia: "/images/philadelphia-skyline-us-real-estate.jpg",
  usUrban: "/images/us-urban-skyline.jpg",
  usPresence: "/images/us-skyline-presence.jpg",
  euaMarkets: "/images/eua2.jpg",
  pexelsField: "/images/pexels-fabianoshow4-564869275-29560675.jpg",
  marketsUs: "/images/markets-us-hq.jpg",
  marketsBr: "/images/markets-br-hq.jpg",
  marketsFlag: "/images/markets-us-flag-hq.jpg",
  usFlagPresence: "/images/united-states-flag-presence.jpg",
  peSkylineDusk: "/images/private-equity.jpg",
  valueHero: "/images/howwecreatevalues.jpg",
  valueImpactSkyline: "/images/nyc-lower-manhattan-skyline.jpg",
  valueImpactFlag: "/images/eua-poster.jpg",
  laserStore: "/images/head/laser-store.jpg",
  apexTrade: "/images/head/team-apexbrasil-trade.jpg",
  drakkarShow: "/images/empresas/drakkar1.jpg",
  riolaserUs: "/images/head/riolaser-us-storefront.jpg",
  sunsetPoster: "/images/us-city-skyline-sunset-poster.jpg",
  thesisHero: "/images/ny.jpg",
  thesisMarkets: "/images/alexas_fotos-banner-3368374.jpg",
  douglas: "/images/douglas.jpg",
  lucas: "/images/lucas2.jpg",
  videoMarkets: "/videos/back-markets.mp4",
  videoPortraitA: "/videos/back-portrait-a.mp4",
  videoPortraitB: "/videos/back-portrait-b.mp4",
  videoOcean: "/videos/homevideo.mp4",
  videoSunset: "/videos/us-city-skyline-sunset.mp4",
  videoNiagara: "/videos/niagara-falls-sunrise.mp4",
  videoFounder: "/videos/founder-us-presence.mp4",
  videoEua: "/videos/eua.mp4",
  videoPeFeatured: "/videos/videoplayback.mp4",
  videoAboutFeatured: "/videos/videoplayback-about.mp4",
  videoBrazilFlag: "/videos/brazil-flag.mp4",
  videoUsaFlag: "/videos/usa-flag.mp4",
  videoRealEstate: "/videos/realestate.mp4",
  videoWhyHead: "/videos/whyhead.mp4",
  videoInvestors: "/videos/investidores.mp4?v=buildings",
  investorsPoster: "/images/investidores-poster.jpg?v=buildings",
} as const;

export type BackMediaKey = keyof typeof BACK_MEDIA;
