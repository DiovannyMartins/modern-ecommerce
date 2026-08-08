# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Recrutadores e clientes potenciais avaliando competência técnica em frontend. O visitante chega para inspecionar qualidade de código, design, acessibilidade e performance — não para comprar o headset. A jornada de sucesso é o avaliador reconhecer domínio técnico e atenção a detalhes.

## Product Purpose

Portfólio profissional de frontend. Demonstra que uma página de ecommerce completa — galeria, carrinho, checkout, wishlist, avaliações, busca — pode ser construída com HTML, CSS e JavaScript puro, sem frameworks ou dependências externas. Sucesso é definido por impressionar avaliadores técnicos com a qualidade da implementação.

## Positioning

Ecommerce de aparência e comportamento profissionais construído inteiramente com tecnologias vanilla da web. A aposta é que o domínio da plataforma nativa (acessibilidade real, performance sem runtime de framework, modularidade com ES Modules) entrega resultado superior ao de sites equivalentes feitos com stacks pesadas. Nenhum concorrente de portfólio no nicho gamer entrega esse nível de polimento sem React/Next.

## Operating Context

- **Avaliação de código**: repositório público no GitHub, código-fonte aberto (MIT), visitantes inspecionam estrutura, padrões e qualidade
- **Demo ao vivo**: deploy contínuo via GitHub Pages em `diovannymartins.github.io/modern-ecommerce`
- **Sem backend**: todos os dados são simulados ou armazenados em LocalStorage; checkout e pagamentos são fictícios
- **Dispositivo do avaliador**: tipicamente desktop para revisão de código, mas a experiência mobile também é julgada

## Capabilities and Constraints

### Capacidades

- Página única de produto com galeria de 6 imagens (zoom, swipe, teclado)
- Carrinho lateral com persistência, badge animado, cálculo de frete simulado e toast de desfazer
- Checkout simulado com 3 métodos de pagamento (Pix, Cartão, Boleto), cupons de desconto e validação Luhn
- Wishlist com comunicação entre módulos via CustomEvent
- Avaliações com ordenação, skeleton loading, star picker acessível e formulário
- Busca expansível no mobile
- SEO técnico completo: Schema.org JSON-LD, Open Graph, Twitter Cards
- Google Analytics condicional (eventos `add_to_cart` e `purchase`)

### Restrições

- Stack vanilla obrigatória: HTML5, CSS3, JavaScript ES6+ (ES Modules nativos). Zero dependências externas de runtime.
- Acessibilidade WCAG AA preservada em qualquer alteração futura
- Identidade visual NEON X mantida: tema escuro, roxo como cor primária, estética gamer premium
- Sem backend real: checkout permanece simulado, dados persistem apenas em LocalStorage
- Deploy estático via GitHub Pages

### Decisões em aberto

- Expansão para múltiplos produtos ou páginas de categoria
- Internacionalização (i18n)
- Testes automatizados

## Brand Commitments

- **Nome**: NEON X
- **Nicho**: Periféricos gamer de alta performance
- **Slogan**: "Equipamentos de alta performance para quem leva o jogo a sério."
- **Cor primária**: Roxo (`#8b5cf6`)
- **Tema**: Dark mode — fundo slate escuro (`#0f172a`), cards slate médio (`#1e293b`)
- **Tom**: Profissional, técnico, direto. Sem exageros de marketing.
- **Autor**: Diovanny Martins (@diovannymartins)

## Evidence on Hand

- **Produto real**: HyperX Cloud II Core Wireless — headset gamer sem fio da HyperX, marca estabelecida no mercado
- **6 imagens reais do produto** em WebP: frontal, almofadas, traseira/controles, lateral/microfone, acessórios, dongle USB (`src/img/`)
- **3 avaliações demo** com nomes e notas variadas (dados estáticos no módulo `reviews.js`)
- **Cupons simulados**: NEON10 (10%), GAMER20 (20%), PRIMEIRO (15%)
- **Preço real de mercado**: R$ 899,00 com desconto sobre R$ 1.299,00 (~31% off)
- **README.md** detalhado documentando setup, stack e decisões técnicas
- **Nenhum testemunhal real, métrica de uso ou validação externa** — trabalho futuro não deve fabricá-los

## Product Principles

1. **A plataforma é o framework.** Dominar HTML, CSS e JS nativos produz resultado superior a abstrações de terceiros. Cada recurso da web platform é usado em sua forma mais pura.
2. **Acessibilidade não é opcional.** Toda funcionalidade opera por teclado, todo overlay tem focus trap, todo estado dinâmico é anunciado. WCAG AA é o piso, não o teto.
3. **Performance é UX.** Sem bundles, sem runtime, sem hydration. O carregamento é instantâneo por definição. Cada milissegundo importa.
4. **Módulos com responsabilidade única.** Cada arquivo JS resolve um problema e se comunica por eventos. A arquitetura deve permanecer plana e previsível.
5. **O código é a vitrine.** Padrões limpos, nomes descritivos, tratamento defensivo, zero comentários desnecessários. O código-fonte é a primeira coisa que o avaliador vê.

## Accessibility & Inclusion

- WCAG 2.1 nível AA como padrão mínimo
- Skip link para conteúdo principal
- Navegação completa por teclado em todos os componentes
- Focus trap em modais e drawers (carrinho, wishlist, checkout)
- `prefers-reduced-motion` respeitado em animações
- `prefers-contrast: high` com ajustes visuais no reset CSS
- ARIA labels, roles e live regions em todo conteúdo dinâmico
- `inputmode` apropriado em campos numéricos (teclado mobile correto)
- Autocomplete semântico em campos de formulário
- Safe area para dispositivos com notch (`env(safe-area-inset-bottom)`)
