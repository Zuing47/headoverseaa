import type { NextConfig } from "next";

/**
 * Legacy WordPress / pre-repositioning URLs still in Google's index.
 * Each maps to the nearest current page — never blanket-redirect to home.
 */
const legacyRedirects: { source: string; destination: string }[] = [
  // EN — structural pages
  { source: "/en/our-solutions", destination: "/en/private-equity" },
  { source: "/en/about-us", destination: "/en/about" },
  { source: "/en/contact-us", destination: "/en/contact" },
  { source: "/en/portfolio", destination: "/en/cases" },
  { source: "/en/blog", destination: "/en/news" },
  { source: "/en/insights", destination: "/en/news" },
  { source: "/en/insights/:slug", destination: "/en/news/:slug" },
  // EN — old pillar / article URLs
  {
    source: "/en/business-brokerage-the-bridge-between-brazilian-companies-and-us-investors",
    destination: "/en/private-equity",
  },
  {
    source: "/en/raising-capital-in-the-us-how-to-prepare-your-company-to-attract-investors",
    destination: "/en/founders",
  },
  { source: "/en/equity-by-service", destination: "/en/private-equity" },
  { source: "/en/internationalization", destination: "/en/private-equity" },
  { source: "/en/business-brokerage", destination: "/en/private-equity" },
  // PT — structural pages (common legacy slugs)
  { source: "/nossas-solucoes", destination: "/private-equity" },
  { source: "/sobre-nos", destination: "/sobre" },
  { source: "/contato-nos", destination: "/contato" },
  { source: "/portfolio", destination: "/cases" },
  { source: "/noticias", destination: "/news" },
  { source: "/blog", destination: "/news" },
  { source: "/insights", destination: "/news" },
  { source: "/insights/:slug", destination: "/news/:slug" },
  { source: "/equity-by-service", destination: "/private-equity" },
  { source: "/internacionalizacao", destination: "/private-equity" },
  { source: "/business-brokerage", destination: "/private-equity" },
  { source: "/time", destination: "/sobre" },
  { source: "/en/leadership", destination: "/en/about" },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  compress: true,
  poweredByHeader: false,
  async redirects() {
    return legacyRedirects.flatMap(({ source, destination }) => [
      { source, destination, permanent: true },
      { source: `${source}/`, destination, permanent: true },
    ]);
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      {
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/favicon.svg",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
