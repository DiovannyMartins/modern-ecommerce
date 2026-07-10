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

let quantidade = 1;

btnAumentar.addEventListener("click", () => {
  quantidade++;
  quantidadeValor.textContent = quantidade;
});

btnDiminuir.addEventListener("click", () => {
  if (quantidade > 1) {
    quantidade--;
    quantidadeValor.textContent = quantidade;
  }
});
