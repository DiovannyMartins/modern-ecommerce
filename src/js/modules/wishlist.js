import { formatarPreco, salvarStorage, carregarStorage } from "./utils.js";
import { mostrarToast } from "./toast.js";

const btnAbrirWishlist = document.getElementById("btnAbrirWishlist");
const btnFecharWishlist = document.getElementById("btnFecharWishlist");
const wishlistDrawer = document.getElementById("wishlistDrawer");
const wishlistOverlay = document.getElementById("wishlistOverlay");
const wishlistItensContainer = document.getElementById("wishlistItens");
const wishlistBadge = document.getElementById("wishlistBadge");
const btnFavoritar = document.getElementById("btnFavoritar");

let wishlist = carregarStorage("wishlist", []);

function salvarWishlist() {
  salvarStorage("wishlist", wishlist);
}

function atualizarBadgeWishlist() {
  wishlistBadge.textContent = wishlist.length;
}

function animarBadge() {
  wishlistBadge.classList.remove("bounce");
  void wishlistBadge.offsetWidth;
  wishlistBadge.classList.add("bounce");
}

function renderizarWishlist() {
  wishlistItensContainer.innerHTML = "";

  if (wishlist.length === 0) {
    wishlistItensContainer.innerHTML = '<p class="wishlist-vazio">Sua wishlist está vazia.</p>';
    return;
  }

  wishlist.forEach((item, index) => {
    const itemHTML = document.createElement("div");
    itemHTML.classList.add("wishlist-item");

    const img = document.createElement("img");
    img.src = item.imagem;
    img.alt = item.nome;
    img.width = 70;
    img.height = 70;

    const info = document.createElement("div");
    info.classList.add("wishlist-item-info");

    const h4 = document.createElement("h4");
    h4.textContent = item.nome;

    const p = document.createElement("p");
    p.textContent = formatarPreco(item.preco);

    const actions = document.createElement("div");
    actions.classList.add("wishlist-item-actions");

    const btnAddCart = document.createElement("button");
    btnAddCart.type = "button";
    btnAddCart.classList.add("btn-add-cart");
    btnAddCart.textContent = "Adicionar ao Carrinho";
    btnAddCart.addEventListener("click", () => {
      // Adiciona diretamente ao localStorage do carrinho
      const carrinho = carregarStorage("carrinho", []);
      const itemExistente = carrinho.find((i) => i.id === item.id);

      if (itemExistente) {
        itemExistente.quantidade++;
      } else {
        carrinho.push({
          id: item.id,
          nome: item.nome,
          preco: item.preco,
          quantidade: 1,
          imagem: item.imagem
        });
      }

      salvarStorage("carrinho", carrinho);
      mostrarToast("Adicionado ao carrinho!");
    });

    const btnRemove = document.createElement("button");
    btnRemove.type = "button";
    btnRemove.classList.add("btn-remove");
    btnRemove.textContent = "Remover";
    btnRemove.addEventListener("click", () => {
      wishlist.splice(index, 1);
      salvarWishlist();
      renderizarWishlist();
      atualizarBadgeWishlist();
      atualizarBotaoFavoritar();
      mostrarToast("Removido da wishlist");
    });

    actions.appendChild(btnAddCart);
    actions.appendChild(btnRemove);
    info.appendChild(h4);
    info.appendChild(p);
    info.appendChild(actions);
    itemHTML.appendChild(img);
    itemHTML.appendChild(info);
    wishlistItensContainer.appendChild(itemHTML);
  });
}

function atualizarBotaoFavoritar() {
  const produtoAtual = {
    id: "headset-neonx-pro",
    nome: "Headset Wireless NeonX Pro",
    preco: 899.00,
    imagem: "src/img/frontal.webp"
  };

  const existe = wishlist.find((p) => p.id === produtoAtual.id);

  if (existe) {
    btnFavoritar.classList.add("ativo");
  } else {
    btnFavoritar.classList.remove("ativo");
  }
}

export function abrirWishlist() {
  wishlistDrawer.classList.add("active");
  wishlistOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
  trapFocus(wishlistDrawer);
}

export function fecharWishlist() {
  wishlistDrawer.classList.remove("active");
  wishlistOverlay.classList.remove("active");
  document.body.style.overflow = "";
  btnAbrirWishlist.focus();
}

export function toggleWishlist(produto) {
  const existe = wishlist.find((p) => p.id === produto.id);

  if (existe) {
    wishlist = wishlist.filter((p) => p.id !== produto.id);
    mostrarToast("Removido da wishlist");
  } else {
    wishlist.push(produto);
    mostrarToast("Adicionado à wishlist");
  }

  salvarWishlist();
  renderizarWishlist();
  atualizarBadgeWishlist();
  animarBadge();
  atualizarBotaoFavoritar();
}

export function getWishlist() {
  return wishlist;
}

export function initWishlist() {
  renderizarWishlist();
  atualizarBadgeWishlist();
  atualizarBotaoFavoritar();

  btnAbrirWishlist.addEventListener("click", abrirWishlist);
  btnFecharWishlist.addEventListener("click", fecharWishlist);
  wishlistOverlay.addEventListener("click", fecharWishlist);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && wishlistDrawer.classList.contains("active")) {
      fecharWishlist();
    }
  });

  btnFavoritar.addEventListener("click", () => {
    const produto = {
      id: "headset-neonx-pro",
      nome: "Headset Wireless NeonX Pro",
      preco: 899.00,
      imagem: "src/img/frontal.webp"
    };

    toggleWishlist(produto);
  });
}

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
