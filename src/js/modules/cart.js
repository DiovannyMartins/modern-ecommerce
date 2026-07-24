import { formatarPreco, sanitize, salvarStorage, carregarStorage } from "./utils.js";
import { mostrarToast } from "./toast.js";
import { getQuantidade, getPreco } from "./quantity.js";

const btnAbrirCarrinho = document.getElementById("btnAbrirCarrinho");
const btnFecharCarrinho = document.getElementById("btnFecharCarrinho");
const btnComprar = document.getElementById("btnComprar");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const cartItensContainer = document.getElementById("cartItens");
const cartTotalValor = document.getElementById("cartTotalValor");
const cartBadge = document.getElementById("cartBadge");

const nomeProdutoAtual = "Headset Wireless NeonX Pro";
const imagemProdutoAtual = "src/img/Headset-preto.avif";

let carrinho = carregarStorage("carrinho", []);

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
      const item = carrinho[index];

      if (confirm(`Remover "${item.nome}" do carrinho?`)) {
        carrinho.splice(index, 1);
        salvarCarrinho();
        renderizarCarrinho();
        mostrarToast("Item removido do carrinho");
      }
    });
  });
}

function animarBadge() {
  cartBadge.classList.remove("bounce");
  void cartBadge.offsetWidth;
  cartBadge.classList.add("bounce");
}

export function abrirCarrinho() {
  cartDrawer.classList.add("active");
  cartOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
  trapFocus(cartDrawer);
}

export function fecharCarrinho() {
  cartDrawer.classList.remove("active");
  cartOverlay.classList.remove("active");
  document.body.style.overflow = "";
  btnAbrirCarrinho.focus();
}

export function getCarrinho() {
  return carrinho;
}

export function limparCarrinho() {
  carrinho = [];
  salvarCarrinho();
  renderizarCarrinho();
}

export function getTotalCarrinho() {
  return cartTotalValor.textContent;
}

/**
 * Inicializa o carrinho
 */
export function initCart() {
  btnComprar.addEventListener("click", () => {
    const quantidade = getQuantidade();
    const preco = getPreco();
    const itemExistente = carrinho.find((item) => item.nome === nomeProdutoAtual);

    if (itemExistente) {
      itemExistente.quantidade += quantidade;
    } else {
      carrinho.push({
        nome: nomeProdutoAtual,
        preco: preco,
        quantidade: quantidade,
        imagem: imagemProdutoAtual,
      });
    }

    salvarCarrinho();
    renderizarCarrinho();
    animarBadge();

    const textoOriginal = btnComprar.textContent;
    btnComprar.textContent = "Adicionado! ✓";
    btnComprar.disabled = true;

    setTimeout(() => {
      btnComprar.textContent = textoOriginal;
      btnComprar.disabled = false;
    }, 1500);

    abrirCarrinho();
  });

  btnAbrirCarrinho.addEventListener("click", abrirCarrinho);
  btnFecharCarrinho.addEventListener("click", fecharCarrinho);
  cartOverlay.addEventListener("click", fecharCarrinho);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && cartDrawer.classList.contains("active")) {
      fecharCarrinho();
    }
  });

  renderizarCarrinho();
}

/**
 * Mantém o foco do teclado dentro de um elemento (focus trap)
 * @param {HTMLElement} container
 */
function trapFocus(container) {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  if (firstFocusable) firstFocusable.focus();

  container.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  });
}
