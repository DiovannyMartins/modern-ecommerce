// Menu mobile
const menuToggle = document.getElementById("menuToggle");
const menu = document.querySelector(".menu");

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("active");
});

// Fecha o menu ao clicar em um link
const menuLinks = document.querySelectorAll(".menu a");

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("active");
  });
});

// Troca de imagem principal ao clicar nas miniaturas
const mainImage = document.getElementById("mainImage");
const miniaturas = document.querySelectorAll(".image-gallery img");

miniaturas.forEach((miniatura) => {
  miniatura.addEventListener("click", () => {
    // Troca a imagem principal pela miniatura clicada
    mainImage.src = miniatura.src;

    // Marca a miniatura clicada como ativa, removendo dos demais
    miniaturas.forEach((img) => img.classList.remove("active"));
    miniatura.classList.add("active");
  });
});

// Contador de quantidade
const btnDiminuir = document.getElementById("btnDiminuir");
const btnAumentar = document.getElementById("btnAumentar");
const quantidadeValor = document.getElementById("quantidadeValor");
const subtotalValor = document.getElementById("subtotalValor");
const precoUnitario = document.getElementById("precoUnitario");

let quantidade = 1;
const preco = parseFloat(precoUnitario.dataset.price);

function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function atualizarSubtotal() {
  const subtotal = preco * quantidade;
  subtotalValor.textContent = formatarPreco(subtotal);
}

btnAumentar.addEventListener("click", () => {
  quantidade++;
  quantidadeValor.textContent = quantidade;
  atualizarSubtotal();
});

btnDiminuir.addEventListener("click", () => {
  if (quantidade > 1) {
    quantidade--;
    quantidadeValor.textContent = quantidade;
    atualizarSubtotal();
  }
});

// ===== CARRINHO (com persistência em localStorage) =====

const btnAbrirCarrinho = document.getElementById("btnAbrirCarrinho");
const btnFecharCarrinho = document.getElementById("btnFecharCarrinho");
const btnComprar = document.getElementById("btnComprar");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const cartItensContainer = document.getElementById("cartItens");
const cartTotalValor = document.getElementById("cartTotalValor");
const cartBadge = document.getElementById("cartBadge");

const nomeProdutoAtual = "Headset Wireless NeonX Pro";
const imagemProdutoAtual = "img/Headset-preto.avif";

// Carrega o carrinho salvo, ou começa vazio
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function renderizarCarrinho() {
  cartItensContainer.innerHTML = "";

  if (carrinho.length === 0) {
    cartItensContainer.innerHTML =
      '<p class="cart-vazio">Seu carrinho está vazio.</p>';
  }

  let total = 0;
  let totalItens = 0;

  carrinho.forEach((item, index) => {
    total += item.preco * item.quantidade;
    totalItens += item.quantidade;

    const itemHTML = document.createElement("div");
    itemHTML.classList.add("cart-item");
    itemHTML.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}">
      <div class="cart-item-info">
        <h4>${item.nome}</h4>
        <p>${item.quantidade}x ${formatarPreco(item.preco)}</p>
        <button class="cart-item-remover" data-index="${index}">Remover</button>
      </div>
    `;
    cartItensContainer.appendChild(itemHTML);
  });

  cartTotalValor.textContent = formatarPreco(total);
  cartBadge.textContent = totalItens;

  // Liga o evento de remover em cada botão criado dinamicamente
  document.querySelectorAll(".cart-item-remover").forEach((botao) => {
    botao.addEventListener("click", () => {
      const index = parseInt(botao.dataset.index);
      carrinho.splice(index, 1);
      salvarCarrinho();
      renderizarCarrinho();
    });
  });
}

// Adiciona (ou soma) o produto atual ao carrinho
btnComprar.addEventListener("click", () => {
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

  // Feedback visual temporário no botão
  const textoOriginal = btnComprar.textContent;
  btnComprar.textContent = "Adicionado! ✓";
  btnComprar.disabled = true;

  setTimeout(() => {
    btnComprar.textContent = textoOriginal;
    btnComprar.disabled = false;
  }, 1500);

  // Abre o carrinho automaticamente ao adicionar
  abrirCarrinho();
});

function abrirCarrinho() {
  cartDrawer.classList.add("active");
  cartOverlay.classList.add("active");
}

function fecharCarrinho() {
  cartDrawer.classList.remove("active");
  cartOverlay.classList.remove("active");
}

btnAbrirCarrinho.addEventListener("click", abrirCarrinho);
btnFecharCarrinho.addEventListener("click", fecharCarrinho);
cartOverlay.addEventListener("click", fecharCarrinho);

// Botão "Finalizar Compra" (simulado, sem backend)
const btnFinalizar = document.getElementById("btnFinalizar");
btnFinalizar.addEventListener("click", () => {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }
  alert("Compra finalizada com sucesso! (simulação)");
  carrinho = [];
  salvarCarrinho();
  renderizarCarrinho();
  fecharCarrinho();
});

// Renderiza o carrinho já ao carregar a página (caso tenha itens salvos)
renderizarCarrinho();

// Ano automático no rodapé
const anoAtual = document.getElementById("anoAtual");
anoAtual.textContent = new Date().getFullYear();

// Scroll reveal
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 },
);

revealElements.forEach((el) => revealObserver.observe(el));

// Zoom na imagem principal ao passar o mouse
const mainImageContainer = document.querySelector(".main-image");

mainImageContainer.addEventListener("mousemove", (event) => {
  const { left, top, width, height } =
    mainImageContainer.getBoundingClientRect();
  const x = ((event.clientX - left) / width) * 100;
  const y = ((event.clientY - top) / height) * 100;

  mainImage.style.transformOrigin = `${x}% ${y}%`;
  mainImage.style.transform = "scale(2)";
});

mainImageContainer.addEventListener("mouseleave", () => {
  mainImage.style.transform = "scale(1)";
});

// Busca simulada
const formBusca = document.getElementById("formBusca");
const inputBusca = document.getElementById("inputBusca");

formBusca.addEventListener("submit", (event) => {
  event.preventDefault();

  const termo = inputBusca.value.trim().toLowerCase();
  const nomeProduto = "headset wireless neonx pro";

  if (termo === "") return;

  if (nomeProduto.includes(termo)) {
    document
      .querySelector(".product-hero")
      .scrollIntoView({ behavior: "smooth" });
  } else {
    alert("Nenhum produto encontrado para: " + inputBusca.value);
  }

  inputBusca.value = "";
});
