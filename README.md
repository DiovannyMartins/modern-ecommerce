# Modern E-commerce

Projeto de e-commerce profissional desenvolvido com HTML, CSS e JavaScript modular, focado em design moderno, acessibilidade e experiência do usuário.

## 🚀 Tecnologias

- HTML5 semântico
- CSS3 (variáveis, grid, flexbox, animações)
- JavaScript ES6+ (módulos, arrow functions, template literals)
- LocalStorage para persistência de dados
- Vite (build tool)
- Vitest (testes unitários)
- GitHub Actions (CI/CD)

## 📁 Estrutura do Projeto

```
├── index.html
├── manifest.json              # PWA manifest
├── sw.js                      # Service Worker
├── sitemap.xml                # SEO sitemap
├── robots.txt                 # SEO robots
├── package.json               # Dependências e scripts
├── vite.config.js             # Configuração Vite
├── vitest.config.js           # Configuração Vitest
├── .github/workflows/
│   └── ci.yml                 # CI/CD pipeline
├── tests/
│   └── utils.test.js          # Testes unitários
├── src/
│   ├── css/
│   │   ├── variables.css       # Variáveis CSS globais
│   │   ├── reset.css           # Reset e estilos base
│   │   ├── style.css           # Arquivo principal
│   │   └── components/         # Componentes CSS modulares
│   ├── js/
│   │   ├── main.js             # Ponto de entrada
│   │   └── modules/            # Módulos JavaScript
│   │       ├── utils.js        # Funções utilitárias
│   │       ├── toast.js        # Sistema de notificações
│   │       ├── menu.js         # Menu mobile
│   │       ├── gallery.js      # Galeria (swipe, zoom, skeleton)
│   │       ├── quantity.js     # Controle de quantidade
│   │       ├── cart.js         # Carrinho de compras
│   │       ├── reviews.js      # Avaliações
│   │       ├── search.js       # Busca
│   │       ├── checkout.js     # Checkout simulado
│   │       ├── extras.js       # Wishlist, cupons, frete
│   │       └── scroll-reveal.js
│   └── img/                    # Imagens do projeto
└── README.md
```

## ✨ Funcionalidades

### E-commerce
- ✅ Página de produto com galeria de imagens
- ✅ Controle de quantidade e cálculo de subtotal
- ✅ Carrinho lateral com persistência em localStorage
- ✅ Checkout simulado com múltiplos métodos de pagamento
- ✅ Sistema de avaliações com ordenação
- ✅ Wishlist (lista de desejos)
- ✅ Cupons de desconto (NEON10, GAMER20, PRIMEIRO)
- ✅ Cálculo de frete por CEP

### Performance
- ✅ Lazy loading em imagens
- ✅ Preconnect para Google Fonts
- ✅ CSS crítico inline no `<head>`
- ✅ Skeleton loading nas imagens
- ✅ Preload de imagem principal (LCP)
- ✅ Service Worker (cache offline)

### SEO Técnico
- ✅ Schema.org/JSON-LD (dados estruturados)
- ✅ sitemap.xml
- ✅ robots.txt
- ✅ Meta tags Open Graph e Twitter Cards
- ✅ HTML semântico

### Acessibilidade (A11y)
- ✅ Navegação completa por teclado
- ✅ ARIA labels e roles semânticos
- ✅ Focus trap em modais e drawers
- ✅ Tecla ESC para fechar overlays
- ✅ Skip link (pular para conteúdo)
- ✅ Suporte a prefers-reduced-motion
- ✅ Suporte a prefers-contrast (alto contraste)
- ✅ Contraste WCAG AA compliant

### UX/UI
- ✅ Design responsivo (mobile-first)
- ✅ Animações suaves com will-change
- ✅ Toast notifications
- ✅ Confirmação antes de remover itens
- ✅ Zoom de imagem (desktop e touch)
- ✅ Swipe na galeria (mobile)
- ✅ Scroll reveal animations
- ✅ Badge com animação bounce
- ✅ Sticky buy button (mobile)
- ✅ Busca expansível (mobile)

### PWA (Progressive Web App)
- ✅ Manifest.json
- ✅ Service Worker (cache offline)
- ✅ Instalável como app

### Testes
- ✅ Vitest configurado
- ✅ Testes unitários
- ✅ Cobertura de código

### Build/DevOps
- ✅ Vite (build, dev server)
- ✅ CI/CD pipeline (GitHub Actions)
- ✅ Cache busting com hash

### Analytics
- ✅ Google Analytics 4
- ✅ Eventos de conversão (add_to_cart, purchase)

## ️ Melhorias de Segurança

- ✅ Proteção contra XSS (sanitização de inputs)
- ✅ Validação de formulários
- ✅ autocomplete attributes para campos sensíveis
- ✅ inputmode para teclados mobile

## 📦 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento (Vite)
npm run build        # Build de produção
npm run preview      # Preview do build
npm test             # Executar testes
npm run test:coverage # Testes com cobertura
```

## 📸 Preview

<img width="500px" height="auto" alt="Preview do projeto" src="https://github.com/user-attachments/assets/54312f35-caef-49f1-9a32-b56440f01706" />

## 🔗 Deploy

https://diovannymartins.github.io/modern-ecommerce/

## 🎯 Aprendizados

Com este projeto pratiquei:
- Arquitetura modular de CSS e JavaScript
- Padrões de projeto (modules pattern)
- Acessibilidade web (WCAG 2.1)
- SEO técnico
- Segurança frontend (XSS prevention)
- UX/UI design
- Performance web
- PWA (Progressive Web Apps)
- Testes unitários
- CI/CD pipeline
- Git flow profissional

## 📝 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 👨‍💻 Autor

**Diovanny Martins**

- GitHub: [@diovannymartins](https://github.com/diovannymartins)
- LinkedIn: [Diovanny Martins](https://www.linkedin.com/in/diovannymartins/)

---

⭐ Se este projeto te ajudou, considere dar uma estrela!
