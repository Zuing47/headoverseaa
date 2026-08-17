import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Instrument_Sans, Source_Serif_4, Geist_Mono } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import {
  DEFAULT_OG_ALT,
  DEFAULT_OG_IMAGE,
  getPublicSiteUrl,
  htmlLangFromPathname,
  isIndexableEnv,
} from "@/lib/site";
import "./globals.css";

/** Institutional sans — quieter than Inter, still highly legible. */
const sans = Instrument_Sans({
  variable: "--font-sans-var",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

/** Display serif — medium contrast, readable on photography. */
const serif = Source_Serif_4({
  variable: "--font-serif-var",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-mono-var",
  subsets: ["latin"],
  display: "swap",
});

const origin = getPublicSiteUrl();
const indexable = isIndexableEnv();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: {
    default: "Head Oversea | Private Equity & Real Estate",
    template: "%s | Head Oversea",
  },
  description:
    "Active ownership and long-term investment across private equity and real estate in Brazil and the United States.",
  keywords: [
    "Head Oversea",
    "private equity",
    "real estate",
    "active ownership",
    "investment",
    "Brasil",
    "Estados Unidos",
  ],
  applicationName: "Head Oversea",
  authors: [{ name: "Head Oversea", url: origin }],
  creator: "Head Oversea",
  publisher: "Head Oversea",
  category: "finance",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "pt_BR",
    siteName: "Head Oversea",
    url: origin,
    title: "Head Oversea | Private Equity & Real Estate",
    description:
      "Active ownership and long-term investment across private equity and real estate.",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: DEFAULT_OG_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Head Oversea | Private Equity & Real Estate",
    description:
      "Active ownership and long-term investment across Brazil and the United States.",
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: indexable,
    follow: indexable,
    googleBot: {
      index: indexable,
      follow: indexable,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png?v=ho-navy", type: "image/png", sizes: "64x64" },
      { url: "/favicon-32.png?v=ho-navy", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-touch-icon.png?v=ho-navy", type: "image/png", sizes: "180x180" },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = (await headers()).get("x-pathname") || "/";
  const lang = htmlLangFromPathname(pathname);

  return (
    <html
      lang={lang}
      className={`${sans.variable} ${serif.variable} ${mono.variable} h-full antialiased`}
      style={{ colorScheme: "only light" }}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        <JsonLd />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
