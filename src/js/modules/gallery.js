const mainImage = document.getElementById("mainImage");
const miniaturas = document.querySelectorAll(".image-gallery img");
const mainImageContainer = document.querySelector(".main-image");

let indiceAtual = 0;

/**
 * Inicializa a galeria de imagens e o zoom
 */
export function initGallery() {
  miniaturas.forEach((miniatura, index) => {
    miniatura.addEventListener("click", () => {
      trocarImagem(index);
    });

    miniatura.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        trocarImagem(index);
      }
    });
  });

  initSwipe();
  initZoom();
  aplicarSkeleton();
}

/**
 * Troca a imagem principal
 * @param {number} index - Índice da miniatura
 */
function trocarImagem(index) {
  if (index === indiceAtual) return;

  mainImage.classList.add("carregando");
  indiceAtual = index;

  mainImage.onload = () => {
    mainImage.classList.remove("carregando");
  };

  mainImage.src = miniaturas[index].src;

  miniaturas.forEach((img, i) => {
    img.classList.toggle("active", i === index);
    img.setAttribute("aria-selected", i === index ? "true" : "false");
  });
}

/**
 * Inicializa o swipe na galeria (mobile)
 */
function initSwipe() {
  let startX = 0;
  let endX = 0;
  const threshold = 50;

  mainImageContainer.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  mainImageContainer.addEventListener("touchmove", (e) => {
    endX = e.touches[0].clientX;
  }, { passive: true });

  mainImageContainer.addEventListener("touchend", () => {
    const diff = startX - endX;

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && indiceAtual < miniaturas.length - 1) {
        trocarImagem(indiceAtual + 1);
      } else if (diff < 0 && indiceAtual > 0) {
        trocarImagem(indiceAtual - 1);
      }
    }
  });
}

/**
 * Inicializa o zoom da imagem principal (desktop e mobile)
 */
function initZoom() {
  let isZoomed = false;

  mainImageContainer.addEventListener("mousemove", (event) => {
    if (isZoomed) return;
    const { left, top, width, height } = mainImageContainer.getBoundingClientRect();
    const x = ((event.clientX - left) / width) * 100;
    const y = ((event.clientY - top) / height) * 100;

    mainImage.style.transformOrigin = `${x}% ${y}%`;
    mainImage.style.transform = "scale(2)";
  });

  mainImageContainer.addEventListener("mouseleave", () => {
    mainImage.style.transform = "scale(1)";
  });

  mainImageContainer.addEventListener("touchstart", () => {
    isZoomed = true;
    mainImage.style.transform = "scale(2)";
  }, { passive: true });

  mainImageContainer.addEventListener("touchend", () => {
    isZoomed = false;
    mainImage.style.transform = "scale(1)";
  });
}

/**
 * Aplica skeleton loading nas imagens
 */
function aplicarSkeleton() {
  mainImage.classList.add("skeleton");

  if (mainImage.complete) {
    mainImage.classList.remove("skeleton");
  } else {
    mainImage.addEventListener("load", () => {
      mainImage.classList.remove("skeleton");
    });
  }
}
