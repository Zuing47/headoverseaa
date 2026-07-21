# Head Oversea — Wireframe da Home (v2)

> **Supersede:** este documento substitui a arquitetura anterior (Equity Builder / 4 pilares / cards).  
> Direção visual: Private Equity & Real Estate investment firm. Referência de arte: landing institucional (grid, serif editorial, fotografia em escala).  
> Os documentos [`estrategia-de-marca.md`](./estrategia-de-marca.md) e [`sitemap-arquitetura.md`](./sitemap-arquitetura.md) permanecem úteis para jornada e tom, mas a **estrutura e percepção visual da Home** seguem este arquivo.

---

## Ordem fixa da Home

1. Header (overlay)
2. Hero (~100svh, ~45% texto / ~55% imagem)
3. Trust indicators (métricas validadas)
4. Nossa tese (off-white, editorial)
5. Como criamos valor (preto, 3 colunas tipográficas)
6. Real Estate (split texto / imagem bleed)
7. Portfólio (grid editorial)
8. Case em destaque (50/50)
9. Insights (grade institucional)
10. CTA final (Founders / Investors)
11. Footer institucional

PT e EN compartilham a mesma estrutura.

---

## 1. Header

- Altura ~80px, transparente sobre o hero; fundo sólido ao scroll.
- Logo à esquerda; nav central (Sobre, Private Equity, Real Estate, Portfólio, Insights); CTA outline à direita + toggle PT/EN.
- Sem dropdowns densos; sem aparência de dashboard.

## 2. Hero

- Headline serif: *Building lasting value.*
- Eyebrow: *Private Equity. Real Estate. Long-term vision.*
- Um CTA textual: *Explore our investments →*
- Fotografia arquitetônica dominante à direita.

## 3. Trust indicators

- 3–4 métricas horizontais, divisórias 1px, sem cards.
- Usar apenas números validados no content (`home.trust`). Nunca inventar métricas.

## 4. Nossa tese

- Fundo off-white; label + título grande + texto curto + CTA editorial; imagem grande à direita.

## 5. Como criamos valor

- Fundo preto; 01 Operational / 02 Governance / 03 Capital & Expansion.
- Numeração + tipografia; sem ícones, sem cards, sem border-radius.

## 6. Real Estate

- ~40% texto / ~60% imagem bleed; CTA *Explore Real Estate →*.

## 7. Portfólio

- Título editorial; itens com número, categoria, nome, mídia de proporção fixa, *View project →*.
- Divisórias 1px; logos sem deformação.

## 8. Case em destaque

- 50% imagem / 50% conteúdo editorial: Context, Thesis, Action, Result + *Read the case →*.

## 9. Insights

- Grade alinhada: imagem, categoria, título, data. Sem cards/sombras.

## 10. CTA final

- Fundo preto; headline grande; dois caminhos: *For founders →* / *For investors →*.

## 11. Footer

- Multi-coluna: The Firm, Portfolio & Insights, Offices, Legal.
- Tagline de active ownership; sem watermark decorativo dominante.

---

## Implementação

- Componentes: `src/components/home/*`
- Tokens: `src/app/globals.css` (`.page-shell`, section spaces, gold/off-white/black)
- Conteúdo tipado: `content.home` em `src/lib/content/pt.ts` e `en.ts`
