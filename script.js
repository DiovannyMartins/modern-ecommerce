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

// Carrinho: contador e feedback ao adicionar
const btnComprar = document.getElementById("btnComprar");
const cartBadge = document.getElementById("cartBadge");

let itensNoCarrinho = 0;

btnComprar.addEventListener("click", () => {
  itensNoCarrinho += quantidade;
  cartBadge.textContent = itensNoCarrinho;

  // Feedback visual temporário no botão
  const textoOriginal = btnComprar.textContent;
  btnComprar.textContent = "Adicionado! ✓";
  btnComprar.disabled = true;

  setTimeout(() => {
    btnComprar.textContent = textoOriginal;
    btnComprar.disabled = false;
  }, 1500);
});
