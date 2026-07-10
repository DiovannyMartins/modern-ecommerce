/* ===== MENU MOBILE ===== */

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

/* ===== GALERIA DE IMAGENS ===== */

const mainImage = document.getElementById("mainImage");
const miniaturas = document.querySelectorAll(".image-gallery img");

miniaturas.forEach((miniatura) => {
  miniatura.addEventListener("click", () => {
    mainImage.classList.add("carregando");

    mainImage.onload = () => {
      mainImage.classList.remove("carregando");
    };

    mainImage.src = miniatura.src;

    miniaturas.forEach((img) => img.classList.remove("active"));
    miniatura.classList.add("active");
  });
});

/* ===== CONTADOR DE QUANTIDADE E SUBTOTAL ===== */

const btnDiminuir = document.getElementById("btnDiminuir");
const btnAumentar = document.getElementById("btnAumentar");
const quantidadeValor = document.getElementById("quantidadeValor");
const subtotalValor = document.getElementById("subtotalValor");
const precoUnitario = document.getElementById("precoUnitario");

let quantidade = 1;
const preco = parseFloat(precoUnitario.dataset.price);

// Formata um número como moeda brasileira (R$ 0.000,00)
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

/* ===== CARRINHO (com persistência em localStorage) ===== */

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

// Carrega o carrinho salvo no localStorage, ou começa vazio
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// Reconstrói o HTML dos itens do carrinho a partir do array "carrinho"
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
        <button type="button" class="cart-item-remover" data-index="${index}">Remover</button>
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

// Botão "Finalizar Compra" (simulado, sem backend real)
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

/* ===== RODAPÉ ===== */

const anoAtual = document.getElementById("anoAtual");
anoAtual.textContent = new Date().getFullYear();

/* ===== SCROLL REVEAL ===== */

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

/* ===== ZOOM NA IMAGEM DO PRODUTO ===== */

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

/* ===== BUSCA (SIMULADA) ===== */

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

/* ===== TOAST DE NOTIFICAÇÃO ===== */

const toast = document.getElementById("toast");
let toastTimeout;

function mostrarToast(mensagem) {
  clearTimeout(toastTimeout);
  toast.textContent = mensagem;
  toast.classList.add("show");

  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

/* ===== AVALIAÇÕES (interativas, com ordenação e novo formulário) ===== */

const reviewsGrid = document.getElementById("reviewsGrid");
const ordenarAvaliacoes = document.getElementById("ordenarAvaliacoes");
const formAvaliacao = document.getElementById("formAvaliacao");
const starOptions = document.querySelectorAll(".star-option");

let avaliacoes = [
  {
    nome: "Carlos Silva",
    data: "Há 2 dias",
    nota: 5,
    texto:
      "Simplesmente incrível! O cancelamento de ruído é surreal e o fone é muito leve. Recomendo demais para quem joga FPS.",
  },
  {
    nome: "Mariana Costa",
    data: "Há 1 semana",
    nota: 4,
    texto:
      "Qualidade de som impecável. O único ponto é que poderia vir com uma case de transporte, mas o produto em si é nota 10.",
  },
  {
    nome: "Felipe Oliveira",
    data: "Há 2 semanas",
    nota: 5,
    texto:
      "A bateria realmente dura 50 horas. Estou usando para trabalhar e jogar e carrego uma vez por semana. Excelente investimento.",
  },
];

let notaSelecionada = 0;

function renderizarEstrelas(nota) {
  return "★".repeat(nota) + "☆".repeat(5 - nota);
}

function renderizarAvaliacoes() {
  reviewsGrid.innerHTML = "";

  avaliacoes.forEach((avaliacao) => {
    const card = document.createElement("div");
    card.classList.add("review-card");
    card.innerHTML = `
      <div class="review-header">
        <div class="reviewer-info">
          <h4>${avaliacao.nome}</h4>
          <span class="date">${avaliacao.data}</span>
        </div>
        <span class="stars">${renderizarEstrelas(avaliacao.nota)}</span>
      </div>
      <p class="review-text">"${avaliacao.texto}"</p>
    `;
    reviewsGrid.appendChild(card);
  });
}

// Ordena as avaliações conforme o critério escolhido
ordenarAvaliacoes.addEventListener("change", () => {
  const criterio = ordenarAvaliacoes.value;

  if (criterio === "maior-nota") {
    avaliacoes.sort((a, b) => b.nota - a.nota);
  } else if (criterio === "menor-nota") {
    avaliacoes.sort((a, b) => a.nota - b.nota);
  }
  // "recentes" mantém a ordem atual (mais nova primeiro, por causa do unshift)

  renderizarAvaliacoes();
});

// Seleção de estrelas no formulário de nova avaliação
starOptions.forEach((estrela) => {
  estrela.addEventListener("click", () => {
    notaSelecionada = parseInt(estrela.dataset.valor);

    starOptions.forEach((s) => {
      s.classList.toggle(
        "selecionada",
        parseInt(s.dataset.valor) <= notaSelecionada,
      );
    });
  });
});

// Envio de nova avaliação
formAvaliacao.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = document.getElementById("nomeAvaliador").value.trim();
  const comentario = document
    .getElementById("comentarioAvaliador")
    .value.trim();

  if (nome === "" || comentario === "" || notaSelecionada === 0) {
    mostrarToast("Preencha seu nome, comentário e selecione uma nota.");
    return;
  }

  avaliacoes.unshift({
    nome: nome,
    data: "Agora mesmo",
    nota: notaSelecionada,
    texto: comentario,
  });

  renderizarAvaliacoes();
  formAvaliacao.reset();
  notaSelecionada = 0;
  starOptions.forEach((s) => s.classList.remove("selecionada"));

  mostrarToast("Avaliação enviada com sucesso!");
});

// Renderiza as avaliações iniciais ao carregar a página
renderizarAvaliacoes();

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
    mostrarToast("Nenhum produto encontrado para: " + inputBusca.value);
  }

  inputBusca.value = "";
});

btnFinalizar.addEventListener("click", () => {
  if (carrinho.length === 0) {
    mostrarToast("Seu carrinho está vazio!");
    return;
  }
  mostrarToast("Compra finalizada com sucesso!");
  carrinho = [];
  salvarCarrinho();
  renderizarCarrinho();
  fecharCarrinho();
});
