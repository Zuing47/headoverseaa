# Head Oversea

Institutional website for Head Oversea — Equity Builders connecting Brazilian companies with U.S. markets.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion**

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

| Route | Language | Page |
|-------|----------|------|
| `/` | PT | Home |
| `/sobre` | PT | About |
| `/servicos` | PT | Services |
| `/cases` | PT | Cases |
| `/contato` | PT | Contact |
| `/en` | EN | Home |
| `/en/about` | EN | About |
| `/en/services` | EN | Services |
| `/en/cases` | EN | Cases |
| `/en/contact` | EN | Contact |

## Design Philosophy

- Obsidian palette with champagne accents — authority without flash
- Cormorant Garamond (display) + Geist (body) — editorial institutional typography
- Motion restrained and purposeful — never decorative
- Bilingual SEO with sitemap and Open Graph metadata

## Deploy

Optimized for [Vercel](https://vercel.com). Set `metadataBase` in `layout.tsx` to your production domain.
