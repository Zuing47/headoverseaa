import type { Metadata } from "next";
import { Instrument_Sans, Source_Serif_4, Geist_Mono } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import "./globals.css";

/** Institutional sans — quieter than Inter, still highly legible. */
const sans = Instrument_Sans({
  variable: "--font-sans-var",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

/** Display serif — medium contrast, readable on photography. */
const serif = Source_Serif_4({
  variable: "--font-serif-var",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const mono = Geist_Mono({
  variable: "--font-mono-var",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://headoversea.com"),
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
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "pt_BR",
    siteName: "Head Oversea",
    url: "https://headoversea.com",
    title: "Head Oversea | Private Equity & Real Estate",
    description:
      "Active ownership and long-term investment across private equity and real estate.",
    images: [
      {
        url: "/og-nyc.jpg",
        width: 1200,
        height: 630,
        alt: "New York skyline — Head Oversea Private Equity & Real Estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Head Oversea | Private Equity & Real Estate",
    description:
      "Active ownership and long-term investment across Brazil and the United States.",
    images: ["/og-nyc.jpg"],
  },
  robots: {
    index: true,
    follow: true,
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
  other: {
    "theme-color": "#050505",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
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
