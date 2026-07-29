# Modern E-commerce

Projeto de e-commerce profissional desenvolvido com HTML, CSS e JavaScript puro, focado em design moderno, acessibilidade e experiência do usuário.

## 🚀 Tecnologias

- HTML5 semântico
- CSS3 (variáveis, grid, flexbox, animações)
- JavaScript ES6+ (módulos nativos, arrow functions, template literals)
- LocalStorage para persistência de dados

## 📁 Estrutura do Projeto

```
── index.html                 # Página principal (produto)
├── catalogo.html              # Página de catálogo
── src/
│   ├── css/
│   │   ├── variables.css       # Variáveis CSS globais
│   │   ├── reset.css           # Reset e estilos base
│   │   ├── style.css           # Arquivo principal
│   │   └── components/         # Componentes CSS modulares
│   ├── js/
│   │   ├── main.js             # Ponto de entrada
│   │   ├── catalogo.js         # Dados do catálogo
│   │   ── modules/            # Módulos JavaScript
│   │       ├── utils.js        # Funções utilitárias
│   │       ├── toast.js        # Sistema de notificações
│   │       ├── menu.js         # Menu mobile
│   │       ├── gallery.js      # Galeria (swipe, zoom, setas, skeleton)
│   │       ├── quantity.js     # Controle de quantidade
│   │       ├── cart.js         # Carrinho de compras
│   │       ├── reviews.js      # Avaliações
│   │       ├── search.js       # Busca
│   │       ├── checkout.js     # Checkout simulado
│   │       ├── wishlist.js     # Lista de desejos
│   │       └── scroll-reveal.js
│   ── img/                    # Imagens do produto (webp)
└── README.md
```

## ✨ Funcionalidades

### E-commerce
- Página de produto com galeria de imagens
- Controle de quantidade e cálculo de subtotal
- Carrinho lateral com persistência em localStorage
- Checkout simulado com múltiplos métodos de pagamento
- Sistema de avaliações com ordenação
- Wishlist (lista de desejos)
- Cupons de desconto (NEON10, GAMER20, PRIMEIRO)
- Cálculo de frete por CEP

### Performance
- Lazy loading em imagens
- Preconnect para Google Fonts
- CSS crítico inline no `<head>`
- Skeleton loading nas imagens
- Preload de imagem principal (LCP)
- Imagens em formato WebP

### Acessibilidade (A11y)
- Navegação completa por teclado
- ARIA labels e roles semânticos
- Focus trap em modais e drawers
- Tecla ESC para fechar overlays
- Skip link (pular para conteúdo)
- Suporte a prefers-reduced-motion
- Suporte a prefers-contrast (alto contraste)
- Contraste WCAG AA compliant

### UX/UI
- Design responsivo (mobile-first)
- Animações suaves
- Toast notifications
- Confirmação antes de remover itens
- Zoom de imagem (desktop e touch)
- Galeria com setas de navegação e scroll horizontal
- Swipe na galeria (mobile)
- Scroll reveal animations
- Badge com animação bounce
- Sticky buy button (mobile)
- Busca expansível (mobile)

### Segurança
- Proteção contra XSS (sanitização de inputs)
- Validação de formulários
- autocomplete attributes para campos sensíveis
- inputmode para teclados mobile

##  Como Usar

Basta abrir o `index.html` no navegador. Não requer instalação de dependências, build ou servidor de desenvolvimento.

```bash
# Opcional: servidor local para evitar restrições de CORS
python -m http.server 8000
# Acesse http://localhost:8000
```

## 🔗 Deploy

https://diovannymartins.github.io/modern-ecommerce/

## 🎯 Aprendizados

Com este projeto pratiquei:
- Arquitetura modular de CSS e JavaScript
- Padrões de projeto (ES Modules)
- Acessibilidade web (WCAG 2.1)
- SEO técnico (Schema.org/JSON-LD, Open Graph, Twitter Cards)
- Segurança frontend (XSS prevention)
- UX/UI design
- Performance web (WebP, lazy loading, skeleton loading)
- Git flow profissional

##  Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 👨💻 Autor

**Diovanny Martins**

- GitHub: [@diovannymartins](https://github.com/diovannymartins)
- LinkedIn: [Diovanny Martins](https://www.linkedin.com/in/diovannymartins/)

---

Se este projeto te ajudou, considere dar uma estrela!
