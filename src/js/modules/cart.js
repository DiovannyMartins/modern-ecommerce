import { formatarPreco, salvarStorage, carregarStorage, trapFocus } from "./utils.js";
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
const inputCEP = document.getElementById("inputCEP");
const btnCalcularFrete = document.getElementById("btnCalcularFrete");
const freteResultado = document.getElementById("freteResultado");

const produtoAtual = {
  id: "headset-neonx-pro",
  nome: "Headset HyperX Cloud II Core Wireless",
  imagem: "src/img/frontal.webp",
};

let carrinho = normalizarCarrinho(carregarStorage("carrinho", []));
let liberarFocusCarrinho = null;

function normalizarCarrinho(itens) {
  if (!Array.isArray(itens)) return [];

  return itens.map((item) => item.id === produtoAtual.id
    ? { ...item, nome: produtoAtual.nome, imagem: produtoAtual.imagem }
    : item
  );
}

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
      carrinho.splice(index, 1);
      salvarCarrinho();
      renderizarCarrinho();
      mostrarToast(`"${item.nome}" removido do carrinho`);
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
  liberarFocusCarrinho?.();
  liberarFocusCarrinho = trapFocus(cartDrawer);
}

export function fecharCarrinho() {
  cartDrawer.classList.remove("active");
  cartOverlay.classList.remove("active");
  document.body.style.overflow = "";
  liberarFocusCarrinho?.();
  liberarFocusCarrinho = null;
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
  return carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0);
}

/**
 * Inicializa o carrinho
 */
export function initCart() {
  const adicionarAoCarrinho = () => {
    const quantidade = getQuantidade();
    const preco = getPreco();
    const itemExistente = carrinho.find((item) => item.id === produtoAtual.id);

    if (itemExistente) {
      itemExistente.quantidade += quantidade;
    } else {
      carrinho.push({
        id: produtoAtual.id,
        nome: produtoAtual.nome,
        preco: preco,
        quantidade: quantidade,
        imagem: produtoAtual.imagem,
      });
    }

    salvarCarrinho();
    renderizarCarrinho();
    animarBadge();

    if (typeof gtag !== 'undefined') {
      gtag('event', 'add_to_cart', {
        item_name: produtoAtual.nome,
        price: preco,
        quantity: quantidade
      });
    }

    const textoOriginal = btnComprar.textContent;
    btnComprar.textContent = "Adicionado! ✓";
    btnComprar.disabled = true;

    const btnSticky = document.getElementById("btnComprarSticky");
    if (btnSticky) {
      btnSticky.textContent = "Adicionado! ✓";
      btnSticky.disabled = true;
    }

    setTimeout(() => {
      btnComprar.textContent = textoOriginal;
      btnComprar.disabled = false;
      if (btnSticky) {
        btnSticky.textContent = `Adicionar ao Carrinho - ${formatarPreco(preco)}`;
        btnSticky.disabled = false;
      }
    }, 1500);

    abrirCarrinho();
  };

  btnComprar.addEventListener("click", adicionarAoCarrinho);

  const btnSticky = document.getElementById("btnComprarSticky");
  if (btnSticky) {
    btnSticky.addEventListener("click", adicionarAoCarrinho);
  }

  btnAbrirCarrinho.addEventListener("click", abrirCarrinho);
  btnFecharCarrinho.addEventListener("click", fecharCarrinho);
  cartOverlay.addEventListener("click", fecharCarrinho);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && cartDrawer.classList.contains("active")) {
      fecharCarrinho();
    }
  });

  btnCalcularFrete.addEventListener("click", () => {
    const cep = inputCEP.value.trim();
    const cepLimpo = cep.replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
      freteResultado.textContent = "CEP inválido. Digite 8 dígitos.";
      freteResultado.className = "frete-resultado erro";
      return;
    }

    freteResultado.textContent = "Frete grátis - entrega em até 7 dias úteis";
    freteResultado.className = "frete-resultado sucesso";
    mostrarToast("Frete calculado com sucesso!");
  });

  inputCEP.addEventListener("input", (e) => {
    let valor = e.target.value.replace(/\D/g, "");
    if (valor.length > 5) {
      valor = valor.slice(0, 5) + "-" + valor.slice(5, 8);
    }
    e.target.value = valor;
  });

  inputCEP.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      btnCalcularFrete.click();
    }
  });

  document.addEventListener("cart-updated", () => {
    carrinho = normalizarCarrinho(carregarStorage("carrinho", []));
    renderizarCarrinho();
    animarBadge();
  });

  renderizarCarrinho();
}
