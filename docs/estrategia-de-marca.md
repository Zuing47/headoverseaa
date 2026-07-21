# Head Oversea — Estratégia de Marca e Experiência Digital

> **Nota (jul/2026):** a direção visual e a arquitetura da Home foram atualizadas para percepção de **Private Equity & Real Estate / active ownership**. A planta atual da Home está em [`wireframe-home.md`](./wireframe-home.md). Seções abaixo sobre “Equity Builder”, pilares de serviço e cards de produto não ditam mais o layout da homepage — permanecem como contexto histórico de posicionamento verbal onde ainda forem úteis.

*Documento de direção criativa. Base para desenvolvimento visual, de conteúdo e de produto do site.*

---

## 1. Posicionamento da marca

Head Oversea é percebida como uma **firma de investimento** — Private Equity & Real Estate — com **active ownership**. Não é agência, SaaS, consultoria de internacionalização nem prestadora de serviços genérica.

A percepção desejada: capital, disciplina, seletividade, propriedade, visão de longo prazo, ativos, governança, estabilidade.

**Declaração interna (não é copy de site):**
> Para fundadores e investidores que buscam valor duradouro, a Head Oversea assume posições de ownership ativo em empresas e ativos reais no Brasil e nos Estados Unidos — construindo governança, operação e capital com horizonte de longo prazo.

Três pilares de crença:
1. **Active ownership > consultoria passiva.**
2. **Presença real > presença de papel.**
3. **Histórico > promessa.** Números auditáveis substituem adjetivos.

---

## 2. Personalidade visual

Se a marca fosse uma pessoa: um operador financeiro de 45 anos que já vendeu duas empresas, fala baixo, nunca precisa levantar a voz numa sala de negociação, veste-se bem sem ostentar logotipos, e confia em números, não em promessas. A antítese do "growth hacker" ou do "guru de internacionalização" de curso online.

**Atributos de personalidade (âncoras para qualquer decisão de tom, design ou copy):**
- **Contido, não espalhafatoso.** Nunca all-caps gritado, nunca gradiente neon, nunca contador de urgência ("só 3 vagas!").
- **Preciso, não genérico.** Números reais em vez de "resultados excepcionais"; nomes de empresas reais em vez de "clientes satisfeitos".
- **Silencioso com peso.** Muito espaço em branco (ou "em preto", já que o fundo é escuro) — a confiança se mostra no que a marca *não* precisa dizer.
- **Bicultural sem folclore.** Presença Brasil↔EUA não deve virar bandeira ou clichê visual (nada de verde-amarelo, nada de Estátua da Liberdade). A dualidade aparece na estrutura (dois idiomas, dois endereços, dois times) e não em ícones literais.

**O que a marca nunca é:** startup de SaaS (sem ilustração fofa, sem emoji, sem gradiente roxo-rosa), agência de marketing (sem "resultados garantidos", sem depoimento em carrossel giratório), site de curso/infoproduto (sem contagem regressiva, sem pop-up de saída).

---

## 3. Identidade

**Identidade verbal:**
- Wordmark: HEAD OVERSEA, sempre em caixa alta com tracking largo, subtítulo "EQUITY BUILDERS" em corpo menor — já implementado corretamente em `Header.tsx`. Manter essa hierarquia em qualquer aplicação (e-mail assinatura, deck, PDF).
- Tom de voz: frases curtas, declarativas, sem ponto de exclamação. "Construímos equity. Conectamos mercados." é o padrão-ouro de cadência — duas orações de verbo + objeto, sem adjetivo antes do substantivo.
- Vocabulário permitido: governança, estruturação, tese, liquidez, ativo, execução, presença. Vocabulário banido: "solução", "revolucionário", "disruptivo", "parceiro ideal", qualquer superlativo não comprovado por número.

**Identidade visual central:**
- Sem símbolo/monograma hoje — apenas wordmark tipográfico. **Recomendação:** desenvolver um monograma mínimo (ex.: "HO" sobreposto ou um glifo geométrico de uma única linha) para uso em favicon, redes sociais e assinatura de e-mail, onde o wordmark completo não cabe. Deve ser desenhado com a mesma lógica de "uma linha, sem enfeite" das divisórias douradas já usadas no site (`.line-accent`).
- Paleta obsidian + champagne já é a assinatura cromática mais forte da marca — deve se tornar reconhecível mesmo sem o nome (ex.: em um card de LinkedIn, alguém deveria reconhecer "isso é Head Oversea" pela cor antes de ler o texto).

**Identidade de movimento:** ver seções 14 e 15.

---

## 4. Público

**Primário — O Fundador em Ponto de Inflexão.**
Dono ou sócio-fundador de empresa brasileira de médio porte (faturamento de R$1M a R$500M+, conforme as próprias faixas do formulário de contato), com modelo de negócio validado, que chegou a um teto de crescimento doméstico ou recebeu uma oferta/interesse de fora e não sabe estruturar. Idade típica 35–55 anos. Já ouviu falar de "abrir empresa nos EUA" mas desconfia de consultorias que só vendem visto/CNPJ americano sem entender o negócio. Decide por prova concreta (cases, números), não por promessa.

**Secundário — O Investidor/Family Office americano com apetite para LatAm.**
Público do lado "buy-side" do business brokerage — precisa perceber, ao visitar o site (mesmo que indiretamente, via um parceiro que compartilhou o link), que a Head Oversea faz curadoria séria de deal flow, não é um marketplace aberto de qualquer negócio brasileiro. A versão `/en` do site é primariamente para este público — hoje ela existe, mas deve ser tratada como uma experiência de igual peso, não uma tradução de cortesia.

**Terciário — Rede de referência (advogados, contadores, bancos de investimento boutique).**
Não converte diretamente, mas indica. Para esse público, o site funciona como validação de credibilidade antes de fazer uma introdução — precisa parecer "seguro indicar", ou seja, sóbrio, sem erro de português/inglês, sem promessa exagerada que manche a reputação de quem indicou.

**Persona negativa (a quem o site deve, propositalmente, não atrair):** pequenas empresas pré-receita buscando "abrir empresa nos EUA" por US$ 500, e criadores de conteúdo/infoprodutores de "internacionalização". O tom sóbrio e a ausência de preço público já filtram isso — deve continuar assim.

---

## 5. Sensações que o visitante deve sentir

Nos primeiros 3 segundos: **"essa empresa já move dinheiro de verdade."** Não pela quantidade de texto, mas pela ausência de necessidade de convencer.

Ao longo da navegação, na ordem em que devem aparecer:
1. **Segurança** (hero + endereço físico + CNPJ/estrutura implícita) — "isso não é golpe, isso é operação real."
2. **Exclusividade discreta** — não há preço público, não há "compre agora"; a sensação é de estar entrando em conversa, não em checkout.
3. **Competência técnica** — a página de Serviços deve soar como foi escrita por quem já fez, não por copywriter que pesquisou o tema.
4. **Prova sem exibicionismo** — cases nomeados, números específicos (não redondos demais), sem "estrelinhas" de review.
5. **Convite calmo** — o CTA final não deve parecer urgente; deve parecer uma porta aberta para quem já decidiu que é sério.

O oposto do que se deve sentir: pressa, dúvida sobre legitimidade, sensação de "poderia ser qualquer empresa", cansaço visual.

---

## 6. Jornada completa do visitante

**Fase 1 — Chegada (Home, 0–15s).**
Origem típica: indicação direta (link em WhatsApp/e-mail) ou busca de marca ("Head Oversea"). O Hero precisa responder, sem scroll, três perguntas: o que fazem, para quem, e por que acreditar (a métrica de US$ 42M já cumpre a terceira). Saída esperada: scroll para Métricas → Pilares.

**Fase 2 — Qualificação temática (Serviços ou Sobre).**
O visitante já decidiu "isso pode ser relevante" e busca a frente específica: internacionalização, venda (brokerage), reestruturação ou real estate. A página de Serviços deve permitir pular direto para o pilar relevante (âncoras já existem: `/servicos#equity`, etc. — devem ser promovidas com mais destaque, hoje só existem no footer).

**Fase 3 — Validação de credibilidade (Cases + Sobre).**
Antes de preencher qualquer formulário, o comprador B2B de ticket alto verifica: "quem mais confiou nisso, e quem são as pessoas por trás". Cases nomeados e página de equipe com nomes e cargos reais já cumprem isso — falta profundidade (ver Seção 18, fotografia; e Arquitetura, case studies individuais).

**Fase 4 — Conversão qualificada (Contato).**
O formulário atual já faz **pré-qualificação inteligente** (faixa de faturamento + objetivo) — isso deve ser tratado como ativo estratégico, não como fricção a remover. É o funil filtrando antes da primeira ligação humana, economizando tempo do time.

**Fase 5 — Nurture (Insights/Newsletter).**
Para quem não está pronto para agendar, mas quer ficar por perto. Hoje é o elo mais fraco (links quebrados, ver auditoria). Deve virar canal real de autoridade, não decoração.

**Mapa de conversão por intenção:**
| Intenção do visitante | Página de entrada provável | CTA correto |
|---|---|---|
| "Quero vender minha empresa" | Serviços#brokerage ou Cases | Agendar conversa |
| "Quero abrir presença nos EUA" | Serviços#internationalization | Agendar conversa |
| "Quem são vocês" (due diligence) | Sobre | Ver cases → Contato |
| "Sou investidor americano" | /en | Contato (en) |

---

## 7. Arquitetura das páginas

**Estrutura atual (válida, manter como espinha dorsal):**
```
/                    Home — tese completa em uma rolagem
/sobre               História, missão/visão, equipe
/servicos            4 pilares em profundidade
/cases               Grade de cases
/contato             Formulário qualificador + informações
/en/*                Espelho completo em inglês
```

**Lacunas a preencher (adições recomendadas, sem inflar o menu principal):**
- `/cases/[slug]` — página individual de case study (problema → tese aplicada → execução → resultado numérico). Hoje cada case é só um card; o comprador de ticket alto quer profundidade antes de agendar.
- `/insights/[slug]` — conteúdo real substituindo os `href: "#"` atuais. Não precisa ser blog corporativo genérico; 1 artigo de profundidade por trimestre já supera o "conteúdo genérico" da concorrência.
- Página ou seção `/en/investors` (ou similar) — hoje o `/en` espelha a estrutura pt, mas o público investidor americano tem uma pergunta diferente ("o que é deal flow qualificado aqui") que talvez mereça uma landing própria, não apenas a versão em inglês do site institucional.
- Rodapé: páginas legais (Política de Privacidade, Termos) — inexistentes hoje; obrigatórias para captar dados de faturamento/contato de empresas com compliance interno.

**Não recomendado:** aumentar o menu principal além de 4 itens. A sobriedade da navegação atual (Sobre / Serviços / Cases / Contato) é parte do posicionamento — cada item novo deve entrar como subpágina, não como novo item de nav.

---

## 8. Hierarquia visual

Padrão já estabelecido e correto — deve ser tratado como regra fixa, não como coincidência estilística:

1. **Eyebrow** — caixa alta, tracking `0.25em`, `champagne-dim`, 12px. Função: contexto/categoria.
2. **Headline serifado** (Cormorant, peso 300, `clamp()`) — a afirmação central da seção.
3. **Corpo em sans (Geist), `stone`** — explicação, sempre curta (3–4 linhas no máximo).
4. **Dado numérico em mono (Geist Mono), `champagne`** — quando há prova quantitativa, ela vem em fonte monoespaçada para parecer "extraída de um sistema", não redigida.

Regra de ouro: **nunca dois headlines serifados grandes na mesma dobra de tela.** O serifado é para pontos de virada da narrativa (um por seção), não para todo subtítulo.

---

## 9. Moodboard

*(Descrito em palavras — como direção para curadoria de referências visuais, não substitui um board real de imagens.)*

- **Textura de fundo:** já correto — obsidian quase preto, nunca preto puro (`#070708`, não `#000`), com grão de ruído sutil (`0.035` de opacidade) simulando filme, não digital limpo demais.
- **Referência de luz:** iluminação de estúdio fotográfico baixo-contraste, como capa de relatório anual de fundo soberano — nunca luz de tela de LED azulada.
- **Referência tipográfica:** convite de galeria de arte contemporânea + terminal Bloomberg — serifado editorial ao lado de dado monoespaçado.
- **Referência de material:** metal escovado dourado-champanhe (não dourado brilhante/joia), couro escuro, papel de algodão grosso — nada de vidro/plástico translúcido (glassmorphism), nada de neumorphism.
- **Referência de movimento:** cortina de teatro abrindo devagar (reveal de texto), não confete ou bounce.
- **O que evitar ativamente:** fotos de stock com aperto de mão, ícones de "foguete" e "alvo", qualquer gradiente roxo/azul de SaaS, qualquer emoji.

**Ação recomendada:** montar um board real (Are.na, Milanote ou Figma) com 20–30 referências curadas seguindo esses critérios antes da próxima rodada de design visual, para alinhar antes de produzir.

---

## 10. Tipografia

Sistema já implementado, correto, e deve ser preservado como fundação:

| Papel | Fonte | Peso | Uso |
|---|---|---|---|
| Display/headline | Cormorant Garamond | 300–500 | H1, headlines de seção, citações de tese |
| Corpo/UI | Geist Sans | 400–500 | Parágrafos, navegação, botões, formulários |
| Dado/técnico | Geist Mono | 400 | Métricas, valores monetários, numeração de pilares |

**Regras de disciplina tipográfica (para não degradar o sistema com o tempo):**
- Cormorant nunca abaixo de ~28px — é uma fonte de exibição, fica frágil em corpo de texto pequeno.
- Nunca usar peso 600+ do Cormorant — a elegância do sistema depende da leveza (300–400).
- Geist Sans carrega toda a responsabilidade de legibilidade em telas pequenas — não introduzir uma quarta família por "variedade".
- Tracking largo (`0.25em`) é reservado para caixa-alta em textos curtos (eyebrows, nav) — nunca aplicar tracking largo a parágrafos.

---

## 11. Grid

- Base: grid de 12 colunas (Tailwind `grid-cols-12`), já usado em `Serviços` (`lg:col-span-4` / `lg:col-span-7 lg:col-start-6`) — esse padrão assimétrico (4/7 com gap, não 6/6 simétrico) é a favor da marca: simetria perfeita parece template, a leve assimetria parece editorial/curada. **Manter como padrão em todas as seções de conteúdo duplo (texto + detalhe).**
- Container: `max-w-7xl` com padding responsivo (`px-6 md:px-10 lg:px-16`) — consistente em todas as páginas, não alterar por seção.
- Breakpoints: seguir o padrão Tailwind (`md`: 768px, `lg`: 1024px, `xl`: 1280px) já em uso — não introduzir breakpoints customizados sem necessidade real de layout.

---

## 12. Espaçamentos

- Unidade base: múltiplos de 4px (padrão Tailwind), com ritmo vertical de seção via `.section-padding` (`clamp(5rem, 12vw, 9rem)`) — esse clamp já resolve bem o espaçamento entre telas pequenas e grandes e deve ser a única fonte de padding vertical de seção (nunca hard-code `py-24` isolado numa seção nova).
- Espaço em branco (negativo) é o recurso de luxo mais barato e mais eficaz que a marca tem — qualquer nova seção deve ser revisada com a pergunta "dá para respirar mais?" antes de "cabe mais conteúdo aqui?".
- Divisores (`.line-accent`, `border-border`) devem ser a exceção visual, não a regra — usar no máximo 1 por transição de seção; se toda seção tiver linha, a linha perde o efeito de pontuação.

---

## 13. Sistema de cores

| Token | Hex | Papel | Observação de auditoria |
|---|---|---|---|
| `obsidian` | `#070708` | Fundo base | OK |
| `charcoal` / `graphite` / `slate` | `#0f0f11` / `#161618` / `#1e1e22` | Camadas de superfície (cards, inputs) | OK |
| `ivory` | `#f4f1ea` | Texto primário | Contraste ~17.9:1 — excelente |
| `champagne` | `#b8a88a` | Acento primário, CTA, números | Contraste ~8.6:1 — excelente |
| `champagne-dim` | `#8a7d66` | Eyebrows, acentos secundários | Contraste ~5.0:1 — no limite, usar só em texto curto |
| `stone` | `#8a8680` | Corpo de texto secundário | Contraste ~5.6:1 — aprovado para texto normal |
| `mist` | `#5c5954` | Legal, placeholder, disclaimers | **Falha AA (~2.9:1) — corrigir antes de qualquer nova página.** Ver Seção 24. |

**Regra de uso:** nunca introduzir uma cor fora desta tabela sem justificativa documentada aqui. A disciplina da paleta (8 tokens, todos derivados de dois eixos: neutro frio escuro + quente metálico) é o que segura a percepção de marca única — cada cor nova dilui isso.

---

## 14. Motion Design

Princípio único: **movimento revela hierarquia, nunca decora.** Se uma animação for removida e a compreensão da página não mudar, ela não deveria existir.

- **Easing padrão:** curva customizada `[0.22, 1, 0.36, 1]` (expo-out) já em uso em todo o site — deve ser a única curva de easing do projeto. Nunca usar `ease-in-out` genérico ou springs "saltitantes" (bounce), que remetem a produto de consumo, não a instituição financeira.
- **Duração:** 0.7–1s para revelações de texto, 0.8–1s para fade de elementos — deliberadamente mais lento que o padrão de UI de produto SaaS (que usa 150–300ms). A lentidão comunicada é sinal de peso, não de lentidão técnica.
- **Direção:** vertical (y), nunca horizontal ou escala — reforça a ideia de "camadas subindo", coerente com a metáfora de construção ("Equity Builders").
- **`prefers-reduced-motion`:** já respeitado globalmente (`globals.css`) — manter como não-negociável em qualquer componente novo.

---

## 15. Sistema de animações

Catálogo atual (já implementado em `motion/FadeIn.tsx`) e como deve evoluir:

| Componente | Comportamento atual | Uso correto |
|---|---|---|
| `TextReveal` | Máscara + subida de linha (`y: 110% → 0`) | Headlines H1/H2 únicos, um por seção |
| `FadeIn` | Fade + subida sutil (`y: 32 → 0`), disparado por `useInView` | Blocos de texto/lista secundários |
| `Counter` | Fade de número ao entrar em viewport | Métricas, sempre com valor real (nunca contagem de 0 até o valor — evitar "count-up" numérico, que é clichê de dashboard SaaS; o valor deve simplesmente aparecer) |

**Lacunas a desenvolver (não implementar ainda, mas planejar):**
- **Transição de página:** hoje cada rota carrega suas animações do zero, sem uma transição de saída/entrada coesa — recomenda-se um véu (`fade` de 200–300ms no obsidian) entre rotas para eliminar o "flash" de conteúdo recompilando/remontando.
- **Parallax de profundidade sutil** no hero (as linhas SVG já existem, mas são estáticas após o desenho inicial — poderiam reagir a scroll com deslocamento mínimo, 5–10px, para dar sensação de profundidade sem virar "efeito").
- **Orquestração entre Header e conteúdo:** o header hoje não reage ao scroll (sem mudança de estado ao rolar) — uma transição sutil de fundo (de transparente para `obsidian/80` com blur) ao passar da hero reforça hierarquia sem ser chamativa.

---

## 16. Sistema de componentes

Inventário atual e papel de cada um — base para qualquer expansão futura de design system:

- **`Button`** (primário sólido ivory-sobre-obsidian / ghost com borda) — dois únicos estilos permitidos. Não introduzir um terceiro estilo de botão sem remover um dos dois existentes.
- **`Container` / `Section`** — wrapper de largura e padding; `Section` já suporta variante `dark` para alternância de fundo entre `obsidian` e `charcoal` (usado em Serviços) — esse alternar de tom entre seções é o único recurso de "quebra visual" permitido além do line-accent.
- **`Header`** — wordmark + nav + CTA + toggle de idioma + menu mobile full-screen.
- **`Footer`** — tagline, newsletter, colunas de links, legal.
- **Cards de prova** (`CasesPreview`, cards de Cases) — company + headline + categoria, sem imagem hoje (ver Seção 18).
- **`ContactForm`** — campos com `Field`/`SelectField`, já com pré-qualificação embutida (faturamento/objetivo).
- **Badge/eyebrow** — não é um componente isolado hoje, é um padrão de classe Tailwind repetido; **recomenda-se extrair em um componente `Eyebrow`** para garantir consistência (tracking, cor, tamanho) sem depender de copiar/colar classes.

---

## 17. Sistema de ícones

Hoje o site **não usa ícones convencionais** — usa divisórias de linha fina (`h-px w-6 bg-champagne/50`) e numeração mono (`01`, `02`) como substitutos de ícone. **Essa é a decisão certa e deve continuar.** Bibliotecas de ícone genéricas (Heroicons, Font Awesome, Lucide) imediatamente colocam qualquer site no patamar visual de "produto SaaS" — o oposto do objetivo.

Se, no futuro, for estritamente necessário um ícone (ex.: WhatsApp no rodapé, seta de link externo), a regra é:
- Traço único, 1px, sem preenchimento;
- Desenhado sob medida (SVG customizado), nunca importado de uma biblioteca de terceiros;
- Cor sempre `stone` ou `champagne`, nunca colorido/multi-cor.

---

## 18. Fotografia

**Estado atual (achado crítico da auditoria):** zero fotografia real no site. Equipe representada por iniciais em caixas cinzas; nenhuma imagem de escritório, case ou retrato.

Para o padrão de marca definido nas Seções 1–5, isso é a lacuna mais visível entre "parece elegante" e "parece real". Um visitante sofisticado nota a ausência de rosto humano em 2 segundos.

**Direção estratégica de fotografia (para produção futura, sem código envolvido):**
- **Retratos da equipe:** sessão profissional única, luz de estúdio baixo-contraste, fundo neutro escuro (compatível com `obsidian`/`charcoal`), tratamento pós-produção consistente com a Seção 19. Vestuário: business casual internacional, sem elementos country-specific.
- **Fotografia de operação/escritório:** Orlando (sede EUA) e São Paulo/onde for a base BR — arquitetura, não pessoas posando; transmite "lugar real", reforça a Seção 1 (presença real > presença de papel).
- **Fotografia de case:** quando existir a página `/cases/[slug]` (Seção 7), cada case pode ter 1–2 imagens do produto/operação do cliente (com autorização), nunca genéricas.
- **Não fazer:** banco de imagens (Unsplash/Shutterstock) de "empresários apertando as mãos", "gráfico subindo com moeda", ou qualquer imagem que pareça licenciada em massa — o público-alvo já viu essas imagens em cem outros sites e elas sinalizam exatamente o oposto de exclusividade.

---

## 19. Estilo das imagens

Quando a fotografia entrar em produção, o tratamento deve seguir uma receita única, documentada, para evitar inconsistência entre sessões/fotógrafos:

- **Correção de cor:** leve dessaturação geral, puxando sombras para o tom `obsidian` (não preto puro) e realces quentes na direção do `champagne` — um duotone sutil, não um filtro óbvio.
- **Grão:** aplicar grão fotográfico fino compatível com o `.grain` já existente na interface, para que foto e UI pareçam do mesmo material.
- **Enquadramento:** proporções consistentes (recomenda-se 4:5 para retratos, 16:9 para arquitetura/ambiente) — variação de crop entre imagens quebra a sensação de sistema.
- **Nunca:** sombra projetada de card (`box-shadow` decorativo), moldura, ou sobreposição de gradiente colorido sobre a foto — a imagem entra "crua" na composição, o grão e a cor de fundo já fazem o trabalho de integração.

---

## 20. SEO Strategy

**Fundação técnica (já correta, confirmado em auditoria):** sitemap completo e correto, robots.txt correto, metadata único por página em pt e en.

**Lacunas a corrigir (prioridade alta, sem exigir redesenho):**
- Ausência de `canonical` e `hreflang` (`alternates.languages`) entre as árvores `/` (pt) e `/en` — risco real de as duas versões competirem entre si no Google em vez de se reforçarem.
- Schema JSON-LD usa tipo `FinancialService`, mais apropriado seria `ProfessionalService` ou `Organization` — o tipo atual pode sinalizar ao Google uma categoria regulatória (serviços financeiros licenciados) que não corresponde ao negócio real, com risco de escrutínio de E-E-A-T desnecessário.

**Estratégia de conteúdo (médio prazo):**
- Substituir os 3 "Insights" com link morto por artigos reais, escritos para intenção de busca específica e não genérica: *"como vender minha empresa para um investidor americano"*, *"como abrir uma empresa nos EUA sendo brasileiro (visto vs. estrutura societária)"*, *"quanto vale minha empresa para internacionalização — múltiplos de mercado"*.
- Cada case study individual (Seção 7) é, por si, uma página de SEO de cauda longa (nome da empresa + setor + "internacionalização"/"venda").
- Meta descriptions já são específicas por página — manter esse padrão para toda página nova, nunca herdar a descrição genérica do layout raiz.

---

## 21. Conversão

O formulário de contato já é o ativo de conversão mais inteligente do site — a pré-qualificação por faixa de faturamento e objetivo funciona como um filtro automático de leads antes mesmo do primeiro contato humano. **Isso deve ser preservado e reforçado, não simplificado "para reduzir fricção"** — fricção correta em B2B de ticket alto é uma feature, não um bug: afasta quem não é o público-alvo e sinaliza seriedade para quem é.

**Oportunidades de evolução:**
- **Agendamento direto** (Calendly ou equivalente, com curadoria de disponibilidade) como alternativa ao "enviar mensagem e esperar retorno" — reduz o tempo entre intenção e compromisso para o lead mais qualificado (quem já decidiu, quer marcar, não quer escrever uma mensagem).
- **Microconversão intermediária** para quem não está pronto para uma conversa: hoje só existe newsletter — poderia incluir algo como "receber um teaser de 1 página sobre a tese Equity Builders" (download qualificado, capturando e-mail com menor compromisso).
- **Prova social posicionada antes do formulário**, não apenas na Home — um visitante que chega direto em `/contato` (via link direto) hoje não vê nenhum case antes de preencher; vale reforçar com 1–2 logos/nomes de case acima do formulário.

---

## 22. Performance

**Estado atual:** dependências enxutas (`framer-motion`, `clsx`, `tailwind-merge`, sem excesso), fontes carregadas via `next/font` (sem bloqueio de render), sem imagens hoje (logo sem custo de peso de imagem ainda).

**Riscos identificados para monitorar à medida que o site cresce:**
- Praticamente toda seção acima da dobra em toda página é Client Component (por depender de `framer-motion`) — arquiteturalmente aceitável dado o nível de motion buscado, mas deve ser monitorado: se o TBT (Total Blocking Time) subir com a adição de mais seções animadas, vale considerar `dynamic import` com `next/dynamic` para seções abaixo da dobra.
- Quando a fotografia (Seção 18) for adicionada, é obrigatório usar `next/image` com formatos modernos (AVIF/WebP) — hoje o `next.config` não tem configuração de imagem porque não há imagem nenhuma; isso precisa ser resolvido no mesmo momento em que a primeira foto entrar, não depois.

**Meta de performance:** Lighthouse ≥ 95 em Performance/SEO/Best Practices/Acessibilidade nas quatro categorias, em todas as páginas — não apenas na Home.

---

## 23. Core Web Vitals

| Métrica | Meta | Situação hoje | Risco |
|---|---|---|---|
| **LCP** (Largest Contentful Paint) | < 2.5s | Provável de já cumprir — hero é texto (fonte via `next/font`), sem imagem hero | Baixo, mas vira alto risco no dia em que a Hero ganhar uma imagem/vídeo de fundo — se isso acontecer, exige otimização dedicada |
| **INP** (Interaction to Next Paint) | < 200ms | Não medido ainda | Médio — muitas animações `framer-motion` simultâneas em dispositivos de entrada podem atrasar resposta a interação; medir em device real, não só desktop |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Provavelmente baixo — `TextReveal` usa `overflow-hidden` sem alterar o espaço ocupado (o texto já ocupa a altura final, só a máscara se move) | Baixo, mas validar com fontes customizadas (Cormorant/Geist) — se não houver `font-display` adequado ou fallback bem dimensionado, troca de fonte pode causar reflow |

**Ação recomendada antes do próximo ciclo de desenvolvimento:** rodar Lighthouse/PageSpeed Insights real (não apenas leitura de código) em todas as 10 rotas, em mobile 4G simulado, para estabelecer uma baseline documentada antes de qualquer nova feature visual pesada.

---

## 24. Acessibilidade

Meta: **WCAG 2.1 AA em 100% do site**, não apenas nas páginas mais visitadas — um site que se posiciona para investidores institucionais e fundos pode ser auditado por due diligence de ESG/compliance, e falhas de acessibilidade básicas prejudicam essa percepção tanto quanto um erro de português.

**Correções obrigatórias identificadas na auditoria (antes de qualquer nova feature visual):**
1. **Contraste do token `mist` (#5c5954) falha AA** — usado em texto legal do rodapé, disclaimers e placeholders de formulário. É texto recorrente, não um detalhe isolado; precisa de um novo token (ou ajuste do existente) que mantenha a discrição visual pretendida mas cumpra ao menos 4.5:1.
2. **Menu mobile sem gerenciamento de foco** — hoje é possível tabular para o conteúdo atrás do menu aberto; precisa de foco preso (focus trap) enquanto o menu estiver aberto, e `aria-controls` ligando o botão ao painel.
3. **Padrão de acordeão de Pilares** sem `aria-controls` — mesma classe de correção.

**Padrões já corretos e que devem ser mantidos como referência:**
- Todos os campos de formulário com `label`/`htmlFor` corretamente associados.
- `:focus-visible` com contorno visível globalmente, sem supressão em componentes customizados.
- `prefers-reduced-motion` respeitado globalmente.

---

## 25. Diferenciais em relação aos concorrentes

| Tipo de concorrente | Limitação típica | Diferencial Head Oversea |
|---|---|---|
| **Fundos de PE tradicionais** | Ticket mínimo alto, diluição imediata de capital, pouco envolvimento operacional direto | Entra via serviço/governança, não apenas capital — acessível para empresas que não querem (ou não precisam) diluir na entrada |
| **Butiques de M&A / bancos de investimento** | Atuação transacional (só na hora da venda), sites institucionais genéricos e intercambiáveis entre si | Relação contínua desde a estruturação até a venda ou expansão — a Head Oversea já conhece a empresa antes do evento de liquidez |
| **Consultorias de internacionalização / abertura de empresa nos EUA** | Foco em burocracia (visto, CNPJ americano), sem tese de crescimento de valor real | Foco em equity e valorização, não em papelada — a internacionalização é meio, não fim |
| **Infoprodutores/"gurus" de internacionalização** | Sem histórico auditável, promessas genéricas, presença apenas digital | Presença física real nos EUA (endereço, escritório), números específicos e nomeados, sem promessa de fórmula mágica |

**Diferencial estrutural mais defensável a longo prazo:** a combinação de (a) presença jurídica e física real nos dois países, (b) histórico numérico auditável desde 2022, e (c) um modelo de entrada por serviço/governança em vez de capital — é uma combinação difícil de replicar rapidamente por um concorrente novo, e deve ser o eixo central de toda comunicação futura (site, deck, imprensa), não apenas um dado enterrado na página Sobre.

---

## Como usar este documento

Toda decisão futura de design, copy ou desenvolvimento deve ser confrontada com uma pergunta simples: **isso reforça ou dilui o posicionamento da Seção 1 e a personalidade da Seção 2?** Se a resposta for neutra ou negativa, a decisão deve ser revista — independentemente de quão "bonita" ou "moderna" pareça isoladamente.

Próximo passo recomendado: validar este documento com o time interno da Head Oversea (especialmente Seções 1, 4 e 25, que dependem de conhecimento de negócio que só eles têm) antes de qualquer produção visual (moodboard real, fotografia, novos componentes).
