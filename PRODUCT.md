# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primários — gamers brasileiros:** Jogadores pesquisando equipamentos de áudio, comparando especificações e preço. Chegam por busca orgânica ou redes sociais, avaliam o produto pela galeria, especificações e avaliações, e simulam uma compra completa (carrinho → cupom → checkout). A página entrega uma experiência de compra realista mesmo sabendo que é simulada.

**Secundários — recrutadores e avaliadores técnicos:** Profissionais que analisam qualidade de código, arquitetura de front-end, acessibilidade, performance e design como portfólio. Inspecionam o source, testam navegação por teclado, validam contraste e semântica, e avaliam a organização modular.

## Product Purpose

Demonstração de excelência em front-end — uma página de produto e-commerce que serve como peça central de portfólio. Simula uma experiência de compra completa (galeria, carrinho, checkout, avaliações, wishlist) com padrões profissionais de acessibilidade, performance e arquitetura de código. O Headset HyperX Cloud II Core Wireless é o produto âncora, com dados reais do produto e simulação de transações.

## Positioning

Um e-commerce single-product que compete em polimento com lojas reais, mas existe como vitrine técnica. A página mostra que um desenvolvedor individual, com HTML/CSS/JS puro e sem frameworks, entrega uma experiência que iguala ou supera lojas construídas com stacks pesadas — com WCAG 2.1 AA, SEO com Schema.org/JSON-LD, Performance com LCP otimizado, e uma arquitetura modular que escala.

## Operating Context

- **Ambiente:** Navegador web, desktop e mobile. Acesso direto via GitHub Pages ou servidor local.
- **Fluxo principal:** Landing → exploração do produto (galeria, specs) → adicionar ao carrinho → checkout (Pix/Cartão/Boleto) → confirmação simulada.
- **Fluxos secundários:** Avaliações (ler, filtrar, escrever), wishlist, busca, cálculo de frete, cupons de desconto.
- **Idioma:** pt-BR (português brasileiro).
- **Sem backend:** Dados persistem em localStorage. Carrinho, wishlist e avaliações são locais. Checkout é simulado.

## Capabilities and Constraints

**Funcionalidades confirmadas:**
- Galeria de imagens com 6 fotos, navegação por setas e scroll horizontal, zoom (desktop e touch), swipe (mobile)
- Controle de quantidade com subtotal dinâmico
- Carrinho lateral (drawer) com persistência, cálculo de frete por CEP, cupons de desconto (NEON10, GAMER20, PRIMEIRO)
- Checkout simulado: Pix, Cartão de Crédito (com formulário) e Boleto
- Sistema de avaliações com ordenação e formulário de submissão
- Wishlist com drawer lateral
- Busca expansível (mobile)
- Toast notifications
- Sticky buy button (mobile)
- Scroll reveal animations

**Restrições técnicas:**
- Zero dependências externas de runtime (apenas Google Fonts e Material Symbols)
- Sem build step, sem bundler, sem npm
- ES Modules nativos no browser
- Deploy via GitHub Pages (arquivos estáticos)
- Imagens em WebP com lazy loading

**Decisões em aberto:**
- Não há plano atual de expansão para múltiplos produtos ou catálogo dinâmico
- Não há backend planejado; persistência permanece em localStorage

## Brand Commitments

- **Nome:** NEON X — marca da loja, flexível e pode evoluir
- **Tom de voz:** Profissional com energia gamer — direto, técnico quando necessário, sem exagero publicitário
- **Identidade atual:** Dark mode com accent roxo neon (#8b5cf6), estética gamer sofisticada. A marca e o visual podem ser redefinidos conforme o projeto evolui.

## Evidence on Hand

- **Fotos do produto:** 6 imagens WebP em `src/img/` (frontal, almofadas, traseira-controles, lateral-microfone, acessórios, dongle-usb)
- **Especificações:** Dados reais do HyperX Cloud II Core Wireless (80h bateria, drivers 53mm, DTS Spatial Audio, Wireless 2.4GHz)
- **Preço:** R$ 899,00 (preço real de mercado como referência)
- **Avaliações:** 128 avaliações (número simulado); formulário funcional coleta novas avaliações localmente
- **Deploy ativo:** https://diovannymartins.github.io/modern-ecommerce/
- **Ausências:** Sem depoimentos reais de clientes, sem métricas de tráfego ou conversão, sem dados de analytics

## Product Principles

1. **Acessibilidade é padrão, não funcionalidade extra** — Toda feature funciona por teclado, leitor de tela e em modo de alto contraste. WCAG 2.1 AA é o piso.
2. **Performance é feature de UX** — Lazy loading, skeleton states, preconnect e WebP não são otimizações tardias; são parte da experiência desde o primeiro carregamento.
3. **Modularidade sem framework** — CSS e JS organizados em módulos com responsabilidade única, provando que arquitetura limpa não depende de React ou build tools.
4. **Simulação realista** — Dados simulados (checkout, avaliações) devem se comportar como reais para não quebrar a imersão do usuário gamer nem a credibilidade com o recrutador.
5. **Código como portfólio** — O source é tão importante quanto o resultado visual. HTML semântico, CSS com variáveis e componentes isolados, JS modular com ES Modules.

## Accessibility & Inclusion

- WCAG 2.1 AA como referência
- Navegação completa por teclado (skip link, focus trap em modais/drawers, ESC para fechar)
- ARIA labels, roles e live regions em todos os componentes interativos
- Suporte a `prefers-reduced-motion` (desabilita animações de scroll e bounce)
- Suporte a `prefers-contrast: more` (reforça bordas e contraste)
- `inputmode` apropriado em campos numéricos para teclados mobile
- `autocomplete` attributes para campos de pagamento e nome
- Idioma declarado (`lang="pt-br"`) e meta tags OG/Twitter para compartilhamento
