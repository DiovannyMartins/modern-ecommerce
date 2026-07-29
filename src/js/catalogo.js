import { formatarPreco, salvarStorage, carregarStorage } from "./modules/utils.js";
import { mostrarToast } from "./modules/toast.js";
import { initMenu } from "./modules/menu.js";

const PRODUTOS = [
  {
    id: "headset-neonx-pro",
    nome: "Headset Wireless NeonX Pro",
    categoria: "headsets",
    preco: 899.00,
    precoAntigo: 1299.00,
    imagem: "src/img/frontal.webp",
    descricao: "Áudio 7.1 surround, cancelamento de ruído ativo, 50h de bateria.",
    rating: 5,
    reviews: 128
  },
  {
    id: "teclado-mechanical-x",
    nome: "Teclado Mecânico Mechanical X",
    categoria: "teclados",
    preco: 599.00,
    precoAntigo: 799.00,
    imagem: "src/img/almofadas.webp",
    descricao: "Switches mecânicos, RGB per-key, anti-ghosting completo.",
    rating: 4,
    reviews: 89
  },
  {
    id: "mouse-precision-pro",
    nome: "Mouse Precision Pro",
    categoria: "mouses",
    preco: 349.00,
    precoAntigo: 449.00,
    imagem: "src/img/traseira-controles.webp",
    descricao: "Sensor 25K DPI, switches ópticos, 70g ultra leve.",
    rating: 5,
    reviews: 203
  },
  {
    id: "headset-stealth-lite",
    nome: "Headset Stealth Lite",
    categoria: "headsets",
    preco: 499.00,
    precoAntigo: 649.00,
    imagem: "src/img/lateral-microfone.webp",
    descricao: "Design compacto, áudio 7.1, microfone removível.",
    rating: 4,
    reviews: 67
  }
];

const catalogoGrid = document.getElementById("catalogoGrid");
const filtrosCategorias = document.querySelectorAll(".filtro-btn");
const ordenarProdutos = document.getElementById("ordenarProdutos");
const btnAbrirCarrinho = document.getElementById("btnAbrirCarrinho");
const btnFecharCarrinho = document.getElementById("btnFecharCarrinho");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const cartItensContainer = document.getElementById("cartItens");
const cartTotalValor = document.getElementById("cartTotalValor");
const cartBadge = document.getElementById("cartBadge");

let carrinho = carregarStorage("carrinho", []);
let categoriaAtual = "todos";

function salvarCarrinho() {
  salvarStorage("carrinho", carrinho);
}

function renderizarCarrinho() {
  cartItensContainer.innerHTML = "";

  if (carrinho.length === 0) {
    cartItensContainer.innerHTML = '<p class="cart-vazio">Seu carrinho está vazio.</p>';
    cartBadge.textContent = "0";
    cartTotalValor.textContent = formatarPreco(0);
    return;
  }

  let total = 0;
  let totalItens = 0;

  carrinho.forEach((item, index) => {
    total += item.preco * item.quantidade;
    totalItens += item.quantidade;

    const itemHTML = document.createElement("div");
    itemHTML.classList.add("cart-item");

    const img = document.createElement("img");
    img.src = item.imagem;
    img.alt = item.nome;
    img.width = 70;
    img.height = 70;

    const info = document.createElement("div");
    info.classList.add("cart-item-info");

    const h4 = document.createElement("h4");
    h4.textContent = item.nome;

    const p = document.createElement("p");
    p.textContent = `${item.quantidade}x ${formatarPreco(item.preco)}`;

    const btnRemover = document.createElement("button");
    btnRemover.type = "button";
    btnRemover.classList.add("cart-item-remover");
    btnRemover.dataset.index = index;
    btnRemover.textContent = "Remover";
    btnRemover.setAttribute("aria-label", `Remover ${item.nome} do carrinho`);

    info.appendChild(h4);
    info.appendChild(p);
    info.appendChild(btnRemover);
    itemHTML.appendChild(img);
    itemHTML.appendChild(info);
    cartItensContainer.appendChild(itemHTML);
  });

  cartTotalValor.textContent = formatarPreco(total);
  cartBadge.textContent = totalItens;

  document.querySelectorAll(".cart-item-remover").forEach((botao) => {
    botao.addEventListener("click", () => {
      const index = parseInt(botao.dataset.index);
      carrinho.splice(index, 1);
      salvarCarrinho();
      renderizarCarrinho();
      mostrarToast("Item removido do carrinho");
    });
  });
}

function renderizarEstrelas(nota) {
  return "★".repeat(nota) + "☆".repeat(5 - nota);
}

function renderizarProdutos(produtos) {
  catalogoGrid.innerHTML = "";

  if (produtos.length === 0) {
    catalogoGrid.innerHTML = '<p class="catalogo-vazio">Nenhum produto encontrado.</p>';
    return;
  }

  produtos.forEach((produto) => {
    const card = document.createElement("div");
    card.classList.add("produto-card");

    const imagem = document.createElement("div");
    imagem.classList.add("produto-imagem");
    const img = document.createElement("img");
    img.src = produto.imagem;
    img.alt = produto.nome;
    img.width = 300;
    img.height = 300;
    img.loading = "lazy";
    imagem.appendChild(img);

    if (produto.precoAntigo) {
      const badge = document.createElement("span");
      badge.classList.add("produto-desconto");
      const desconto = Math.round(((produto.precoAntigo - produto.preco) / produto.precoAntigo) * 100);
      badge.textContent = `-${desconto}%`;
      imagem.appendChild(badge);
    }

    const info = document.createElement("div");
    info.classList.add("produto-info");

    const categoria = document.createElement("span");
    categoria.classList.add("produto-categoria");
    categoria.textContent = produto.categoria.toUpperCase();

    const nome = document.createElement("h3");
    nome.textContent = produto.nome;

    const rating = document.createElement("div");
    rating.classList.add("produto-rating");
    rating.innerHTML = `<span class="stars">${renderizarEstrelas(produto.rating)}</span><span class="reviews-count">(${produto.reviews})</span>`;

    const precoContainer = document.createElement("div");
    precoContainer.classList.add("produto-preco");

    if (produto.precoAntigo) {
      const precoAntigo = document.createElement("span");
      precoAntigo.classList.add("preco-antigo");
      precoAntigo.textContent = formatarPreco(produto.precoAntigo);
      precoContainer.appendChild(precoAntigo);
    }

    const precoAtual = document.createElement("span");
    precoAtual.classList.add("preco-atual");
    precoAtual.textContent = formatarPreco(produto.preco);
    precoContainer.appendChild(precoAtual);

    const btnComprar = document.createElement("button");
    btnComprar.type = "button";
    btnComprar.classList.add("btn-buy");
    btnComprar.textContent = "Adicionar ao Carrinho";
    btnComprar.addEventListener("click", () => {
      const itemExistente = carrinho.find((item) => item.id === produto.id);

      if (itemExistente) {
        itemExistente.quantidade++;
      } else {
        carrinho.push({
          id: produto.id,
          nome: produto.nome,
          preco: produto.preco,
          quantidade: 1,
          imagem: produto.imagem
        });
      }

      salvarCarrinho();
      renderizarCarrinho();
      mostrarToast("Adicionado ao carrinho!");
    });

    info.appendChild(categoria);
    info.appendChild(nome);
    info.appendChild(rating);
    info.appendChild(precoContainer);
    info.appendChild(btnComprar);
    card.appendChild(imagem);
    card.appendChild(info);
    catalogoGrid.appendChild(card);
  });
}

function filtrarProdutos() {
  let produtosFiltrados = [...PRODUTOS];

  if (categoriaAtual !== "todos") {
    produtosFiltrados = produtosFiltrados.filter((p) => p.categoria === categoriaAtual);
  }

  const ordenacao = ordenarProdutos.value;

  if (ordenacao === "nome") {
    produtosFiltrados.sort((a, b) => a.nome.localeCompare(b.nome));
  } else if (ordenacao === "preco-menor") {
    produtosFiltrados.sort((a, b) => a.preco - b.preco);
  } else if (ordenacao === "preco-maior") {
    produtosFiltrados.sort((a, b) => b.preco - a.preco);
  }

  renderizarProdutos(produtosFiltrados);
}

function abrirCarrinho() {
  cartDrawer.classList.add("active");
  cartOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function fecharCarrinho() {
  cartDrawer.classList.remove("active");
  cartOverlay.classList.remove("active");
  document.body.style.overflow = "";
  btnAbrirCarrinho.focus();
}

document.addEventListener("DOMContentLoaded", () => {
  renderizarProdutos(PRODUTOS);
  renderizarCarrinho();

  filtrosCategorias.forEach((btn) => {
    btn.addEventListener("click", () => {
      filtrosCategorias.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      categoriaAtual = btn.dataset.categoria;
      filtrarProdutos();
    });
  });

  ordenarProdutos.addEventListener("change", filtrarProdutos);

  btnAbrirCarrinho.addEventListener("click", abrirCarrinho);
  btnFecharCarrinho.addEventListener("click", fecharCarrinho);
  cartOverlay.addEventListener("click", fecharCarrinho);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && cartDrawer.classList.contains("active")) {
      fecharCarrinho();
    }
  });

  // Menu hamburger
  initMenu();

  const anoAtual = document.getElementById("anoAtual");
  if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
  }
});
