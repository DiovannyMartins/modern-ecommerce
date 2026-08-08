---
name: NEON X
description: "Autômato de papel artesanal — um headset revelado por camadas de kraft, tinta e uma única dobra carmesim"
colors:
  kraft-de-mesa: "#2a221e"
  papel: "#f4efe6"
  papel-esmaecido: "#e8e0d5"
  papel-sobreposto: "#faf7f2"
  tinta: "#2d2420"
  tinta-desbotada: "#7a6e64"
  tinta-apagada: "#91847c"
  carmesim: "#b91c1c"
  carmesim-profundo: "#991b1b"
  carimbo-verde: "#2d5a3d"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, Times New Roman, serif"
    fontSize: "48px"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Playfair Display, Georgia, Times New Roman, serif"
    fontSize: "38px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Playfair Display, Georgia, Times New Roman, serif"
    fontSize: "18px"
    fontWeight: 700
    lineHeight: 1.4
  body:
    fontFamily: "Segoe UI, system-ui, -apple-system, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0.01em"
  label:
    fontFamily: "Segoe UI, system-ui, -apple-system, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: "2px"
  md: "3px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  2xl: "64px"
  3xl: "88px"
components:
  button-primary:
    backgroundColor: "{colors.carmesim}"
    textColor: "{colors.papel}"
    rounded: "{rounded.md}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.carmesim-profundo}"
  card-default:
    backgroundColor: "{colors.papel}"
    rounded: "{rounded.md}"
    padding: "32px"
  input-default:
    backgroundColor: "{colors.papel-esmaecido}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.md}"
    padding: "10px 12px"
  tag-badge:
    backgroundColor: "{colors.carmesim}"
    textColor: "{colors.papel}"
    size: "16px"
---

# Design System: NEON X

## Overview

**Creative North Star: "O Mecanismo de Precisão"**

O sistema visual da NEON X é um autômato de papel sobre uma mesa de artesão. Cada elemento é recortado, dobrado e sobreposto — não há pixel que não carregue a memória do material. O fundo é kraft escuro, a bancada onde o trabalho acontece. As superfícies são folhas de papel branco quente com offset de camadas que cria profundidade sem uma sombra digital sequer. A única cor que rompe o monocromático é o carmesim: a dobra ativa do mecanismo, o selo da ação principal, a tinta que marca o que importa agora.

O tom é artesanal e preciso. A interface não esconde sua construção — abas de encaixe, marcas de dobra, clipes de papel e cantos dobrados são parte da linguagem. O visitante não está consumindo uma página web — está manipulando um objeto físico, girando uma manivela que revela camadas. A densidade é arejada, com papéis espaçados como sobre uma prancheta, cada seção uma figura do autômato que se abre ao entrar no campo de visão.

Tipografia em dois registros: Playfair Display para os cabeçalhos — letras com peso de letterpress, serifas que lembram tipos móveis — e system-ui para o corpo, ancorando a leitura na familiaridade da interface nativa. A transição entre esses registros é a mesma que existe entre o título impresso e a anotação a lápis: hierarquia por material, não por decoração.

**Key Characteristics:**
- Fundo kraft escuro com textura de fibra, superfícies de papel branco quente com camadas offset
- Uma única cor de destaque: carmesim como dobra ativa do mecanismo
- Profundidade exclusivamente por offset de camadas de papel, sem sombras CSS genéricas
- Tipografia dupla: Playfair Display (letterpress) para títulos, system-ui para corpo
- Cantos vivos (2-3px) que ecoam papel recortado, não botões arredondados
- Transições com inércia de papel (cubic-bezier inspirado em física de materiais)
- Anti-referência: sem glassmorphism, sem glow neon, sem gradientes, sem sombras drop-shadow

## Colors

A paleta opera em dois materiais e uma tinta. Kraft e papel constroem o espaço físico. A tinta carmesim é a única cor — todo o resto é monocromático.

### Primary
- **Carmesim** (`#b91c1c`): A dobra ativa do autômato. Usado exclusivamente no botão de compra, preço em destaque, badges de notificação, links ativos e a letra "X" do logotipo. Um único elemento por viewport recebe esta cor. Sua contenção é sua força.
- **Carmesim Profundo** (`#991b1b`): Estado hover/pressed do botão principal. Um degrau abaixo na luminosidade, mantendo a mesma temperatura.

### Neutral
- **Kraft de Mesa** (`#2a221e`): O fundo da bancada. Cor do body, do header sticky, do fundo dos overlays. Um marrom escuro quente com a temperatura da madeira e do papelão craft.
- **Papel** (`#f4efe6`): A folha branca sobre a mesa. Superfície de cards, drawers, modais, toasts, formulários. Branco quente com um traço de amarelo que evita a frieza do branco puro.
- **Papel Esmaecido** (`#e8e0d5`): A camada inferior de papel — fundo de inputs, thumbnails inativas, footer. A mesma folha vista através de outra camada.
- **Papel Sobreposto** (`#faf7f2`): A camada superior, o papel mais novo da pilha. Usado em estados de foco e nas camadas pseudo-elemento atrás de imagens.
- **Tinta** (`#2d2420`): Texto principal. Preto acastanhado como nanquim sobre papel — jamais #000 puro.
- **Tinta Desbotada** (`#7a6e64`): Texto secundário, descrições, placeholders. A tinta que já passou por algumas impressões.
- **Tinta Apagada** (`#91847c`): Texto terciário, bordas, linhas. A tinta quase sumida, a marca d'água.

### Signal
- **Carimbo Verde** (`#2d5a3d`): Confirmação de pedido, cupom aplicado, frete calculado. Verde escuro de carimbo de borracha — jamais verde neon.

### Named Rules
**A Regra do Carmesim Único.** O carmesim aparece em até três papéis simultâneos por viewport, nunca mais de um por papel: (1) identidade — o "X" do logotipo, (2) ação primária — o botão de compra, (3) ênfase — preço ou número do pedido. Badges, totais e elementos de notificação usam Tinta. Se dois elementos do mesmo papel disputam o carmesim, um está errado.

**A Regra das Três Camadas.** Toda superfície de papel tem exatamente três níveis: Papel Sobreposto → Papel → Papel Esmaecido. Adicionar uma quarta camada é perder a metáfora. Se um elemento novo parece "fundo demais", reatribua as camadas existentes, não crie uma nova.

**A Regra da Tinta Nanquim.** Nenhum texto usa preto puro (#000). Todo texto é Tinta, Tinta Desbotada ou Tinta Apagada — três concentrações do mesmo pigmento marrom-escuro. A hierarquia de texto é exclusivamente por saturação da tinta.

## Typography

**Display Font:** Playfair Display, Georgia, Times New Roman, serif
**Body Font:** Segoe UI, system-ui, -apple-system, sans-serif

**Character:** Dois mundos tipográficos, uma mesa de trabalho. Playfair Display carrega o peso da prensa tipográfica — serifas marcadas, contraste de traço, a solenidade do tipo móvel. Segoe UI é a anotação a lápis na margem — familiar, nítida, sem personalidade própria para não competir com o display. A transição entre eles é a hierarquia natural entre o impresso e o manuscrito.

### Hierarchy
- **Display** (700, 48px, line-height 1.1, letter-spacing -0.01em): Título do produto no hero. Playfair Display em sua expressão máxima. Em ≤1024px reduz para 38px; em ≤768px reduz para 30px; em ≤600px reduz para 26px.
- **Headline** (700, 38px, line-height 1.2): Títulos de seção — Especificações, Avaliações. Playfair Display. Em ≤600px reduz para 24px.
- **Title** (700, 18px, line-height 1.4): Títulos de cards, cabeçalhos de drawer e modal. Playfair Display.
- **Body** (400, 16px, line-height 1.65, letter-spacing 0.01em): Texto corrido, descrições. Segoe UI. Limite natural de 65-75 caracteres por linha.
- **Label** (400, 14px, line-height 1.5): Texto secundário, metadados, placeholders, labels. Segoe UI. Em contextos mobile pode reduzir a 12px.

### Named Rules
**A Regra dos Dois Pesos.** O sistema usa exclusivamente 400 (regular) e 700 (bold). Playfair Display não tem semibold; Segoe UI finge que também não tem. A hierarquia se faz por tamanho e família, não por gradação de peso.

**A Regra do Display Solitário.** Playfair Display aparece apenas em títulos e cabeçalhos. Jamais em body text, labels, botões pequenos ou navegação. O display é um evento tipográfico — se toda linha é display, nenhuma é.

## Layout

Layout de coluna única centrada com container de 1200px. O hero ocupa 80vh mínimo em duas colunas (imagem | informação) que colapsam para coluna única em 768px. Seções de features e reviews usam grid auto-fit com mínimo de 240-280px.

O ritmo vertical é generoso: 88px entre seções maiores, 64px entre seções relacionadas, 40px entre elementos internos. Cards internos recebem 32px de padding (20px em mobile). Inputs e botões têm 10-14px de padding vertical.

**Breakpoints:**
- 1200px: container máximo
- 1024px: redução de fonte no hero, header compacta
- 900px: footer reconfigura para 2 colunas
- 768px: hero colapsa para coluna única
- 600px: mobile — header 56px, menu hamburguer, sticky buy, drawer vira bottom sheet

## Elevation & Depth

Profundidade é material, não digital. O sistema não usa sombras CSS como metáfora de elevação — usa offset de camadas de papel. Cada card projeta uma segunda folha atrás de si, visivelmente deslocada por 3-6px e levemente rotacionada (0.3°-0.8°). O visitante vê papel sobre papel, como sobre uma mesa real.

### Shadow Vocabulary
Sombras existem apenas como propriedade física do papel:

- **Papel Empilhado** (`box-shadow: 0 1px 0 rgba(0,0,0,0.05), 0 4px 8px rgba(0,0,0,0.08)`): Cards em repouso. A sombra que uma folha de papel projeta sobre a mesa — difusa, curta, quase imperceptível.
- **Papel Suspenso** (`box-shadow: 0 2px 0 rgba(0,0,0,0.04), 0 8px 16px rgba(0,0,0,0.12)`): Cards no hover. A folha se descola da mesa ao ser levantada.
- **Selo Pressionado** (`box-shadow: 0 2px 0 rgba(0,0,0,0.15), 0 4px 12px rgba(185,28,28,0.15)`): Exclusivo do botão carmesim. Um selo de cera pressionado contra o papel.
- **Dobra** (`box-shadow: 0 1px 0 rgba(0,0,0,0.08)`): Linha de vinco entre papel e superfície.
- **Anel de Foco** (`box-shadow: 0 0 0 2px rgba(185,28,28,0.15)`): Indicador de foco de teclado em elementos interativos.

### Named Rules
**A Regra da Camada Offset.** Profundidade vem de pseudo-elementos com `transform: rotate()` e `inset` deslocados, não de `box-shadow`. Se um card novo precisa de presença, dê a ele uma segunda folha atrás, não uma sombra mais escura.

**A Regra do Selo Único.** Apenas o botão de compra principal emite sombra carmesim. Nenhum outro elemento — toast, badge, link, drawer — projeta cor em sua sombra.

## Shapes

O sistema usa cantos minimamente arredondados (2-3px) que ecoam papel recortado à mão — não botões industriais. O raio padrão é 3px (`--radius`) para cards, inputs, botões. O raio de dobra é 2px (`--radius-fold`) para elementos menores como badges, thumbnails e chips.

Badges são círculos perfeitos (50%). O drawer em mobile adota cantos superiores de 3px. Cantos de 0px não existem — mesmo a menor curvatura mantém a linguagem do papel.

A linha de dobra (`.section-divider`) é o elemento de transição entre seções: uma linha horizontal fina (1px) com 40% de largura, animada como se desenhada da esquerda para a direita.

## Components

### Buttons

**Primary (Buy Button — Selo Carmesim)**
- **Shape:** 3px radius, padding 14px 28px, ocupa flex:1 no container de ações
- **Rest:** Carmesim (`#b91c1c`), texto Papel, Playfair Display 700, 16px, letter-spacing 0.06em, uppercase
- **Detail:** Gradiente linear sutil (branco 10% → transparente 50%) no topo para simular luz sobre cera
- **Hover:** Carmesim Profundo (`#991b1b`), translateY(-2px), Selo Pressionado shadow. Sem glow — é cera, não neon
- **Focus:** outline 2px Papel com offset 2px + Anel de Foco carmesim
- **Active:** translateY(0), sombra reduzida — o selo foi pressionado
- **Disabled:** opacity 0.5, transform cancelado, sombra removida

**Icon Button (Header)**
- **Shape:** 3px radius, 8px padding (12px touch)
- **Rest:** transparente, Tinta Apagada
- **Hover/Focus:** transita para Papel (clareia), Anel de Foco carmesim

**Favorite Button**
- **Shape:** 3px radius, padding 0 14px, borda 1px Tinta Apagada
- **Rest:** Papel Esmaecido, Tinta Desbotada
- **Hover:** borda e cor transitam para Carmesim, fundo Papel
- **Active:** borda Carmesim, cor Carmesim, fundo com respingo de tinta (2.5% opacidade carmesim), ícone preenchido

**Quantity Controls**
- **Shape:** 3px radius, 110px largura, padding 0 12px
- **Rest:** Papel Esmaecido, borda 1px Tinta Apagada, Tinta
- **Buttons:** ± transparentes, Tinta Desbotada, 18px, hover/focus Carmesim
- **Focus:** Anel de Foco carmesim

**Toast Action Button**
- **Shape:** 3px radius, padding 4px 12px, borda 1px Tinta
- **Rest:** Tinta sobre fundo Papel, 12px semibold
- **Hover:** fundo Tinta, texto Papel

### Cards

- **Corner Style:** 3px radius
- **Background:** Papel (`#f4efe6`)
- **Layer Effect:** Pseudo-elemento `::before` com Papel Esmaecido, deslocado 3-5px e rotacionado 0.3°-0.8°
- **Shadow:** Papel Empilhado em repouso, Papel Suspenso no hover
- **Hover:** translateY(-4px a -6px), rotação sutil (-0.5°)
- **Internal Padding:** 32px (20px mobile)
- **Feature Cards:** ícone circular de 56px em Papel Esmaecido, título Playfair Display 18px, body Segoe UI 14px
- **Review Cards:** fita adesiva (`::before`) no topo simulando papel fixado à mesa

### Inputs / Fields

- **Shape:** 3px radius, padding 10px 12px, borda 1px Tinta Apagada
- **Background:** Papel Esmaecido
- **Text:** Tinta, Segoe UI 14px (16px mobile)
- **Placeholder:** Tinta Apagada
- **Focus:** fundo Papel, borda Tinta Desbotada, Papel Empilhado shadow
- **Error:** borda Carmesim, fundo com respingo de tinta (6% opacidade carmesim)
- **Success:** borda Carimbo Verde
- **Select:** mesmo estilo de input

### Navigation

**Header:**
- Fundo Kraft de Mesa, borda inferior 1px Tinta Apagada, sticky no topo
- Altura: 72px (64px ≤1024px, 56px ≤600px)
- Logo: "Neon" em Playfair Display 700, 30px, Papel, uppercase, letter-spacing 0.06em. "X" em Carmesim com borda sutil rotacionada
- Menu: links uppercase 14px, Tinta Apagada, sublinhado Carmesim animado no hover
- Mobile: hamburguer visível, menu clip-path, altura 56px

**Search Bar:**
- Papel Esmaecido, borda 1px Tinta Apagada, 3px radius, padding 6px 10px, width 220px
- Input transparente, Tinta, placeholder Tinta Apagada
- Focus-within: fundo Papel, borda Tinta Desbotada
- Mobile: ícone expansível, full-width, animação slide-down

### Drawers & Modals

**Drawer (Cart, Wishlist):**
- 380px largura, 100vh altura, fundo Papel, sombra Papel Empilhado
- Aba de envelope (`::before`) no lado esquerdo simulando aba de papel
- Overlay: Kraft de Mesa a 70% opacidade
- Header: padding 20px, título Playfair Display 18px, borda inferior Papel Esmaecido
- Body: flex 1, overflow-y auto, padding 20px
- Footer: Papel Sobreposto, borda superior Papel Esmaecido
- Item: imagem 64px, título Segoe UI 600, preço wishlist em Carmesim
- Mobile: bottom sheet 85vh, cantos superiores 3px, sem aba

**Modal (Checkout):**
- 420px largura, fundo Papel, 3px radius, padding 32px (20px mobile)
- Linha de rasgo pontilhada no resumo do pedido
- Overlay: Kraft de Mesa a 75% opacidade
- Animação: scale(0.97) → scale(1) + fade
- Número do pedido: moldura Carmesim 2px com padding 4px 24px

### Toast

- **Shape:** 3px radius, padding 14px 24px, max-width 90vw, borda 1px Papel Esmaecido
- **Background:** Papel
- **Shadow:** Papel Empilhado
- **Detail:** Canto inferior direito dobrado (`::after` com border trick)
- **Animation:** translateY(20px) + fade → posição final
- **Action Button:** borda Tinta, texto Tinta, hover inverte (fundo Tinta, texto Papel)

### Payment Method Selector

- **Shape:** 3px radius, padding 12px 8px, grid 3 colunas, gap 10px
- **Rest:** Papel Esmaecido, borda transparente, Tinta Desbotada 12px
- **Hover:** borda Tinta Apagada
- **Active:** borda Tinta, fundo Papel, Papel Empilhado shadow
- **Focus:** Anel de Foco carmesim

### Section Divider

- Linha horizontal 1px, 40% largura, centralizada, Tinta Apagada a 30%
- Animação de desenho: clip-path revela da esquerda para direita em 0.8s

## Do's and Don'ts

### Do:
- **Do** usar as três camadas de papel (Sobreposto → Papel → Esmaecido) para hierarquia de superfície. Se parecer "fundo demais", redistribua, não adicione.
- **Do** manter o Carmesim restrito a um elemento por viewport. A cor é a dobra ativa — duas dobras simultâneas quebram o mecanismo.
- **Do** usar 3px como raio padrão. A curvatura sutil é a assinatura do papel recortado.
- **Do** usar offset de camadas (`::before` rotacionado e deslocado) para profundidade em cards, em vez de sombras.
- **Do** manter Playfair Display exclusivamente em títulos e cabeçalhos. Body text é sempre Segoe UI.
- **Do** garantir Anel de Foco carmesim visível em `:focus-visible` para todo elemento interativo.
- **Do** usar transições com cubic-bezier(0.33, 1, 0.68, 1) — a inércia do papel.

### Don't:
- **Don't** introduzir sombras digitais (drop-shadow, box-shadow com blur grande) em substituição ao offset de camadas.
- **Don't** adicionar cores além do Carmesim e Carimbo Verde. O sistema é deliberadamente monocromático.
- **Don't** usar gradientes como fundo. O único gradiente é o selo de cera no botão (luz sobre superfície).
- **Don't** usar Playfair Display em body text, labels, botões pequenos ou navegação.
- **Don't** usar preto puro (#000) em texto. A hierarquia de texto é Tinta → Tinta Desbotada → Tinta Apagada.
- **Don't** criar botões secundários coloridos. Se não é Carmesim (primário), é Tinta (fantasma/outline).
- **Don't** usar raio de 0px. Mesmo a menor curvatura (2px) mantém a linguagem do papel.
