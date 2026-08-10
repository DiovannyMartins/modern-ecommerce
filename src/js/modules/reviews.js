import { salvarStorage, carregarStorage } from "./utils.js";
import { mostrarToast } from "./toast.js";

const reviewsGrid = document.getElementById("reviewsGrid");
const ordenarAvaliacoes = document.getElementById("ordenarAvaliacoes");
const formAvaliacao = document.getElementById("formAvaliacao");
const starOptions = document.querySelectorAll(".star-option");
const starPicker = document.getElementById("starPicker");

let notaSelecionada = 0;

const avaliacoesPadrao = [
  {
    id: 3,
    nome: "Carlos Silva",
    data: "Há 2 dias",
    nota: 5,
    texto:
      "Simplesmente incrível! O cancelamento de ruído é surreal e o fone é muito leve. Recomendo demais para quem joga FPS.",
  },
  {
    id: 2,
    nome: "Mariana Costa",
    data: "Há 1 semana",
    nota: 4,
    texto:
      "Qualidade de som impecável. O único ponto é que poderia vir com uma case de transporte, mas o produto em si é nota 10.",
  },
  {
    id: 1,
    nome: "Felipe Oliveira",
    data: "Há 2 semanas",
    nota: 5,
    texto:
      "A bateria realmente dura 80 horas. Estou usando para trabalhar e jogar e carrego uma vez por semana. Excelente investimento.",
  },
];

let avaliacoes = carregarStorage("avaliacoes", avaliacoesPadrao);
let proximoId = carregarStorage("proximoId", 4);

function renderizarEstrelas(nota) {
  return "★".repeat(nota) + "☆".repeat(5 - nota);
}

function renderizarAvaliacoes(lista = avaliacoes) {
  reviewsGrid.innerHTML = "";

  lista.forEach((avaliacao) => {
    const card = document.createElement("div");
    card.classList.add("review-card");

    const header = document.createElement("div");
    header.classList.add("review-header");

    const reviewerInfo = document.createElement("div");
    reviewerInfo.classList.add("reviewer-info");

    const h3 = document.createElement("h3");
    h3.textContent = avaliacao.nome;

    const date = document.createElement("span");
    date.classList.add("date");
    date.textContent = avaliacao.data;

    reviewerInfo.appendChild(h3);
    reviewerInfo.appendChild(date);

    const stars = document.createElement("span");
    stars.classList.add("stars");
    stars.textContent = renderizarEstrelas(avaliacao.nota);

    header.appendChild(reviewerInfo);
    header.appendChild(stars);

    const text = document.createElement("p");
    text.classList.add("review-text");
    text.textContent = `"${avaliacao.texto}"`;

    card.appendChild(header);
    card.appendChild(text);
    reviewsGrid.appendChild(card);
  });
}

/**
 * Inicializa a seção de avaliações
 */
export function initReviews() {
  ordenarAvaliacoes.addEventListener("change", () => {
    const criterio = ordenarAvaliacoes.value;
    const copia = [...avaliacoes];

    if (criterio === "maior-nota") {
      copia.sort((a, b) => b.nota - a.nota);
    } else if (criterio === "menor-nota") {
      copia.sort((a, b) => a.nota - b.nota);
    } else if (criterio === "recentes") {
      copia.sort((a, b) => b.id - a.id);
    }

    renderizarAvaliacoes(copia);
  });

  starOptions.forEach((estrela) => {
    estrela.addEventListener("click", () => {
      notaSelecionada = parseInt(estrela.dataset.valor);

      starOptions.forEach((s) => {
        const valor = parseInt(s.dataset.valor);
        s.classList.toggle("selecionada", valor <= notaSelecionada);
        s.setAttribute(
          "aria-checked",
          valor === notaSelecionada ? "true" : "false",
        );
      });
    });
  });

  starPicker.addEventListener("keydown", (event) => {
    const estrelasArray = Array.from(starOptions);
    const indexAtual = estrelasArray.findIndex(
      (s) => s === document.activeElement,
    );

    if (event.key === "ArrowRight" && indexAtual < estrelasArray.length - 1) {
      estrelasArray[indexAtual + 1].focus();
    }

    if (event.key === "ArrowLeft" && indexAtual > 0) {
      estrelasArray[indexAtual - 1].focus();
    }
  });

  formAvaliacao.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = document.getElementById("nomeAvaliador").value.trim();
    const comentario = document
      .getElementById("comentarioAvaliador")
      .value.trim();

    if (!nome) {
      mostrarToast("Digite seu nome para enviar a avaliação.");
      return;
    }
    if (!comentario) {
      mostrarToast("Escreva um comentário sobre o produto.");
      return;
    }
    if (notaSelecionada === 0) {
      mostrarToast("Selecione uma nota de 1 a 5 estrelas.");
      return;
    }

    avaliacoes.unshift({
      id: proximoId,
      nome: nome,
      data: "Agora mesmo",
      nota: notaSelecionada,
      texto: comentario,
    });
    proximoId++;

    salvarStorage("avaliacoes", avaliacoes);
    salvarStorage("proximoId", proximoId);

    renderizarAvaliacoes();
    formAvaliacao.reset();
    notaSelecionada = 0;
    starOptions.forEach((s) => {
      s.classList.remove("selecionada");
      s.setAttribute("aria-checked", "false");
    });

    mostrarToast("Avaliação enviada com sucesso!");
  });

  renderizarAvaliacoes();
  reviewsGrid.querySelectorAll(".review-skeleton").forEach((el) => el.remove());
}
