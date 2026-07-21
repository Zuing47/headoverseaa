# Head Oversea — Sitemap Completo e Arquitetura de Seções

> **Nota (jul/2026):** a seção **Home** abaixo foi supersedida por [`wireframe-home.md`](./wireframe-home.md) (ordem PE/RE editorial). Demais páginas (Sobre, Cases, Contato, etc.) ainda podem usar este documento como roteiro de jornada até redesign dedicado.

*Continuação de [`estrategia-de-marca.md`](./estrategia-de-marca.md).*

---

## 0. Árvore completa do site

```
/                              Home institucional (PT) — ver wireframe-home.md
├── /tese                      Tese de investimento
├── /como-atuamos              Como criamos valor
├── /private-equity            Área PE
├── /real-estate               Área Real Estate
├── /cases                     Portfólio
├── /time                      Time / About
├── /insights                  Insights
├── /fundadores               Segmento fundadores
├── /investidores              Segmento investidores
├── /contato                   Contato
└── …

/en                            Espelho EN da Home
├── /en/private-equity
├── /en/real-estate
├── /en/cases
├── /en/about
├── /en/insights
├── /en/contact
└── …
```

---

## 2. Home (`/`)

**Ver [`wireframe-home.md`](./wireframe-home.md) — source of truth.**

Ordem: Hero → Trust → Tese → Como criamos valor → Real Estate → Portfólio → Case em destaque → Insights → CTA Founders/Investors → Footer.

---

## 3. Sobre (`/sobre`)

**Papel na jornada:** validar que existe uma empresa e pessoas reais por trás da tese — a página que o comprador cético visita antes de preencher qualquer formulário.

| # | Seção | Conteúdo | Objetivo psicológico | Peso |
|---|---|---|---|---|
| 1 | **PageHero** | Eyebrow "Sobre nós" + headline "Transformamos empresas brasileiras em ativos globais" + intro | Reafirma o posicionamento central antes de qualquer detalhe — ninguém deveria "descobrir" quem a empresa é lendo parágrafo por parágrafo, isso já vem dito na primeira dobra | Nível 1 |
| 2 | **História** | Narrativa de origem (franchising/aceleração → Equity Builders, desde 2022) | **Continuidade e legitimidade.** Uma empresa que "evoluiu" de um modelo para outro parece mais real do que uma que "nasceu perfeita" — a jornada de origem humaniza sem enfraquecer a autoridade | Nível 2 |
| 3 | **Missão & Visão** | Dois blocos curtos | **Estrutura corporativa reconhecível.** Para o público de due diligence (rede de referência, investidor), a presença formal de missão/visão é um sinal (ainda que pequeno) de organização institucional | Nível 3 |
| 4 | **Equipe** | Grid de liderança (nome, cargo, foto — ver Seção 18 da estratégia) | **Redução do medo de "empresa fantasma".** Rosto humano + cargo específico (CEO, CFO, CMO...) é o antídoto direto contra a desconfiança que cerca ofertas de internacionalização/captação | Nível 1 — a foto é o elemento de maior peso emocional da página inteira |
| 5 | **CTA final** | Convite para conhecer os serviços ou agendar conversa | Ponte de saída — quem chegou até aqui já validou credibilidade, o próximo passo natural é ação, não mais leitura | Nível 2 |

---

## 4. Serviços (`/servicos`)

**Papel na jornada:** permitir que cada perfil de visitante (quer vender, quer internacionalizar, quer reestruturar, quer investir em imóveis) se aprofunde exatamente no que importa para ele, sem ler o que não importa.

| # | Seção | Conteúdo | Objetivo psicológico | Peso |
|---|---|---|---|---|
| 1 | **PageHero** | "Quatro frentes. Uma tese." + subtítulo de governança/execução | Emoldura os 4 pilares como parte de uma única lógica, não como um cardápio de serviços avulsos — evita a sensação de "agência que faz de tudo" | Nível 1 |
| 2 | **Equity by Service** (`#equity`) | Descrição + 3 highlights | **Qualificação para quem busca reestruturação sem diluição de capital.** Precisa deixar claro, já no primeiro highlight, que não há injeção de capital — isso filtra quem procura investimento direto | Nível 1 dentro do próprio bloco |
| 3 | **Internacionalização** (`#internationalization`) | Descrição + 3 highlights | **Segurança jurídica como remoção de medo.** O público teme burocracia/golpe ao "abrir empresa nos EUA" — "segurança jurídica em cada etapa" ataca esse medo diretamente | Nível 1 |
| 4 | **Business Brokerage** (`#brokerage`) | Descrição + 3 highlights | **Antecipação da pergunta "vou conseguir vender e receber de verdade".** "Matching com investidores qualificados" e "negociação ponta a ponta" comunicam acompanhamento total, não apenas listagem passiva | Nível 1 |
| 5 | **Real Estate** (`#realestate`) | Descrição + 3 highlights | **Diversificação de portfólio pessoal do empreendedor**, não só da empresa — apela ao patrimônio pessoal de quem já decidiu internacionalizar o negócio | Nível 2 — pilar de cross-sell, não a porta de entrada principal |
| 6 | **CTA final** | Convite a agendar conversa | Depois de identificar seu pilar, o visitante já sabe *o que* quer discutir — o CTA aqui pode (no futuro) ser inteligente o suficiente para pré-preencher o campo "objetivo principal" do formulário de contato conforme a seção de onde veio | Nível 1 |

**Nota de hierarquia interna:** os 4 pilares devem ter peso visual idêntico entre si (mesma estrutura, mesmo tamanho de bloco) — a hierarquia aqui é de **sequência**, não de importância. O visitante decide qual pilar é "o dele"; o design não deve decidir por ele qual é mais importante.

---

## 5. Cases — índice (`/cases`)

**Papel na jornada:** prova social em volume, para quem quer validar por padrão ("quantos casos parecidos com o meu já fizeram") antes de se aprofundar em um único case.

| # | Seção | Conteúdo | Objetivo psicológico | Peso |
|---|---|---|---|---|
| 1 | **PageHero** | "Empresas que transformamos" | Estabelece que o que vem a seguir é fato, não argumento | Nível 1 |
| 2 | **Grade de cases** | Cards por empresa (nome, headline de resultado, categoria) | **Reconhecimento por analogia.** O visitante escaneia procurando um case do seu setor/situação — quanto mais rápido encontrar um "parecido comigo", mais rápido a objeção "isso não serve pro meu caso" desaparece | Nível 1 |
| 3 | **Filtro por categoria** (Internacionalização / Reestruturação / Equity Builder) — *recomendado, não existe hoje* | Filtro leve acima da grade | **Redução de esforço cognitivo** para o visitante que já sabe o que busca (veio de `/servicos#brokerage`, por exemplo) | Nível 2 |
| 4 | **CTA final** | Convite a agendar conversa | Fecha o ciclo de prova → ação | Nível 2 |

---

## 6. Case individual (`/cases/[slug]`) — página nova

**Papel na jornada:** para o visitante de ticket alto que não se convence com um card de 2 linhas — quer entender o raciocínio aplicado, não só o resultado.

| # | Seção | Conteúdo | Objetivo psicológico | Peso |
|---|---|---|---|---|
| 1 | **Case Hero** | Nome da empresa, categoria, headline de resultado, [foto/imagem do case] | Ancoragem imediata do resultado — antes de explicar o "como", o visitante já sabe o "o quê" | Nível 1 |
| 2 | **Contexto** | Qual era o problema/situação original do cliente | **Espelhamento.** Se o contexto descrito soa parecido com a situação do próprio visitante, o engajamento com o resto da página dispara | Nível 1 |
| 3 | **Tese aplicada** | Qual pilar (Equity by Service, Internacionalização etc.) foi usado e por quê | Mostra raciocínio estratégico, não só execução — reforça "parceiro pensante", não "fornecedor de serviço" | Nível 2 |
| 4 | **Execução** | Linha do tempo / etapas do que foi feito na prática | **Credibilidade operacional.** Detalhe concreto (não vago) é o que diferencia um case real de um depoimento genérico | Nível 2 |
| 5 | **Resultado** | Número(s) de resultado, com contexto (ex.: "aumento de X% em valuation" ou "captação de US$X") | Fecha o arco com prova quantificada — o mesmo princípio da seção de Métricas da Home, agora aplicado a um caso específico | Nível 1 |
| 6 | **Cases relacionados** | 2–3 cards de cases da mesma categoria | Mantém o visitante no site, aprofundando a mesma categoria de interesse | Nível 3 |
| 7 | **CTA final** | Agendar conversa, com copy contextual ("Quer um resultado parecido?") | Conversão no pico emocional da página (logo após ver um resultado concreto) | Nível 1 |

---

## 7. Contato (`/contato`)

**Papel na jornada:** o momento de conversão — tudo antes disso foi construção de confiança, esta página só precisa não introduzir fricção nova.

| # | Seção | Conteúdo | Objetivo psicológico | Peso |
|---|---|---|---|---|
| 1 | **PageHero** | "Vamos falar sobre o futuro do seu negócio" + subtítulo | Tom de convite, não de formulário burocrático — a linguagem aqui precisa soar como convite a uma conversa, não a um cadastro | Nível 1 |
| 2 | **Formulário qualificador** | Nome, e-mail corporativo, telefone, empresa, faturamento anual, objetivo principal, mensagem | **Pré-qualificação bilateral.** Não é só o time da Head Oversea que qualifica o lead — o próprio visitante, ao escolher sua faixa de faturamento, se autoconfirma como "sério o bastante para estar aqui". Isso é psicologicamente diferente de um formulário de 2 campos: aumenta o investimento percebido antes mesmo de enviar | Nível 1 |
| 3 | **Informações de contato** | Horário, e-mail, telefone, endereço físico (Orlando) | **Prova de existência física.** Um endereço real, não uma caixa postal ou "atendimento 100% digital", é a maior redução de risco percebido possível nesta página | Nível 1 — mesmo peso do formulário, propositalmente |
| 4 | **Reforço de prova (recomendado, não existe hoje)** | 1–2 nomes de case ou a métrica de US$42M reafirmada acima/ao lado do formulário | Para quem chegou direto nesta página (via link direto, sem passar pela Home), garante que ao menos um dado de prova esteja visível antes do envio | Nível 2 |

---

## 8. Insights — índice (`/insights`) — página nova

**Papel na jornada:** reter e nutrir quem ainda não está pronto para uma conversa comercial.

| # | Seção | Conteúdo | Objetivo psicológico | Peso |
|---|---|---|---|---|
| 1 | **PageHero** | "Conteúdo estratégico para decisores" | Define o padrão de qualidade esperado — "decisores", não "empreendedores iniciantes", mantém o filtro de público | Nível 1 |
| 2 | **Grade de artigos** | Card por artigo (categoria, data, título) | Permite navegação por tema de interesse (Internacionalização, Capital, Mercado) | Nível 1 |
| 3 | **Newsletter** | Captura de e-mail | **Microconversão de baixo compromisso** para quem não vai preencher o formulário de contato ainda | Nível 2 |

## 8.1 Insight individual (`/insights/[slug]`) — página nova

| # | Seção | Conteúdo | Objetivo psicológico | Peso |
|---|---|---|---|---|
| 1 | **Cabeçalho do artigo** | Categoria, data, título, [autor/cargo, se aplicável] | Autoridade de quem escreve — atribuir a um cargo real (ex.: "CEO & Founder") vale mais que "equipe Head Oversea" | Nível 1 |
| 2 | **Corpo do artigo** | Texto longo, tipografia de leitura (Cormorant/Geist já resolvem isso) | Aqui o motion deve ser mínimo — texto longo compete mal com reveals animados linha a linha; usar apenas fade simples de entrada | Nível 1 |
| 3 | **CTA contextual** | Convite específico ao tema do artigo (ex.: artigo sobre venda → CTA de Business Brokerage) | **Conversão guiada por intenção manifestada** — a pessoa já disse, ao ler o artigo, qual é o tema que a interessa | Nível 1 |
| 4 | **Artigos relacionados** | 2–3 cards | Retenção contínua | Nível 3 |

---

## 9. Páginas legais (`/privacidade`, `/termos`) — páginas novas

| # | Seção | Conteúdo | Objetivo psicológico | Peso |
|---|---|---|---|---|
| 1 | **Cabeçalho simples** | Título + data de última atualização | Sinaliza manutenção ativa (compliance real, não documento estático esquecido) | Nível 1 |
| 2 | **Corpo em texto corrido** | Conteúdo legal | Objetivo aqui é *não* comunicar personalidade de marca — é a única página do site onde neutralidade total é a decisão correta, porque o público que lê isso (jurídico/compliance de uma empresa) quer clareza, não experiência | Utilitário |

---

## 10. `/en/investors` — página nova, não é espelho

**Papel na jornada:** única página pensada especificamente para o público secundário (investidor/family office americano) em vez de ser tradução do conteúdo voltado ao vendedor brasileiro.

| # | Seção | Conteúdo | Objetivo psicológico | Peso |
|---|---|---|---|---|
| 1 | **Hero** | Tese de investimento, do ponto de vista de quem compra (não de quem vende) | Reposiciona a mesma empresa sob a lente certa — "acesso a deal flow curado da América Latina", não "ajudamos você a vender" | Nível 1 |
| 2 | **Track record** | Mesmas métricas da Home, reformuladas para linguagem de investidor (ex.: "US$42M+ in equity value created across 15+ transactions") | Prova quantificada, adaptada ao vocabulário do público (fundos falam em "transactions", não em "empresas estruturadas") | Nível 1 |
| 3 | **Processo de curadoria** | Como a Head Oversea qualifica as empresas antes de apresentá-las (o inverso do funil de `/servicos`) | **Sinal de exclusividade/curadoria** — o comprador institucional precisa acreditar que nem toda empresa brasileira passa pelo funil, só as preparadas | Nível 1 |
| 4 | **Cases em destaque** | 2–3 cases (mesmos dados, reenquadrados como "deal" em vez de "transformação") | Prova concreta no vocabulário certo | Nível 2 |
| 5 | **Contato institucional** | Formulário/e-mail dedicado, sem os campos de "faturamento anual" (que fazem sentido para vendedor, não para comprador) | Evita fricção incorreta — um investidor não deveria preencher um formulário desenhado para vendedor | Nível 1 |

---

## 11. Resumo de hierarquia visual (para referência rápida)

**Nível 1 (dominante — merece o tratamento visual mais forte: serifado grande, motion completo, maior espaço em branco ao redor):**
Hero de cada página, Métricas, Philosophy/tese, Equipe com foto, Formulário + endereço em Contato, Resultado numérico em cada case.

**Nível 2 (apoio — reforça o Nível 1, mas não compete com ele):**
Pillars, CasesPreview, História, Missão/Visão, Contexto e Tese aplicada em cada case, filtro de categoria.

**Nível 3 (utilitário/retenção — existe para manter o visitante engajado, não para converter diretamente):**
Insights, Model (na Home), cases/artigos relacionados, newsletter.

**Regra final:** cada página deve ter **no máximo duas seções de Nível 1** competindo por atenção máxima. Se uma página nova tiver três ou mais seções "gritando" ao mesmo tempo, ela perdeu hierarquia — e hierarquia é, junto com o espaço em branco, o recurso mais barato e mais eficaz que esta marca tem para parecer cara.
