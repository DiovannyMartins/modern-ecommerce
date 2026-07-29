const mainImage = document.getElementById("mainImage");
const miniaturas = document.querySelectorAll(".image-gallery img");
const mainImageContainer = document.querySelector(".main-image");
const btnGaleriaCima = document.getElementById("btnGaleriaCima");
const btnGaleriaBaixo = document.getElementById("btnGaleriaBaixo");

let indiceAtual = 0;
let isZoomed = false;
let touchStartX = 0;
let touchStartY = 0;

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

  btnGaleriaCima.addEventListener("click", () => {
    const novoIndice = indiceAtual > 0 ? indiceAtual - 1 : miniaturas.length - 1;
    trocarImagem(novoIndice);
  });

  btnGaleriaBaixo.addEventListener("click", () => {
    const novoIndice = indiceAtual < miniaturas.length - 1 ? indiceAtual + 1 : 0;
    trocarImagem(novoIndice);
  });

  // Scroll suave da galeria ao trocar imagem
  function scrollParaMiniatura(index) {
    const gallery = document.querySelector(".image-gallery");
    const miniatura = miniaturas[index];
    if (gallery && miniatura) {
      const galleryRect = gallery.getBoundingClientRect();
      const miniRect = miniatura.getBoundingClientRect();
      const scrollLeft = miniatura.offsetLeft - (galleryRect.width / 2) + (miniRect.width / 2);
      gallery.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }

  // Navegação por teclado nas setas
  document.addEventListener("keydown", (e) => {
    const tag = document.activeElement.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

    if (e.key === "ArrowLeft") {
      const novoIndice = indiceAtual > 0 ? indiceAtual - 1 : miniaturas.length - 1;
      trocarImagem(novoIndice);
    } else if (e.key === "ArrowRight") {
      const novoIndice = indiceAtual < miniaturas.length - 1 ? indiceAtual + 1 : 0;
      trocarImagem(novoIndice);
    }
  });

  atualizarSetas();
  initZoom();
  initSwipe();
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

  scrollParaMiniatura(index);
  atualizarSetas();
}

/**
 * Atualiza o estado das setas de navegação
 */
function atualizarSetas() {
  btnGaleriaCima.disabled = indiceAtual === 0;
  btnGaleriaBaixo.disabled = indiceAtual === miniaturas.length - 1;
}

/**
 * Inicializa o zoom da imagem principal (desktop e mobile)
 */
function initZoom() {
  mainImageContainer.addEventListener("mousemove", (event) => {
    if (isZoomed) return;
    const { left, top, width, height } = mainImageContainer.getBoundingClientRect();
    const x = ((event.clientX - left) / width) * 100;
    const y = ((event.clientY - top) / height) * 100;

    mainImage.style.transformOrigin = `${x}% ${y}%`;
    mainImage.style.transform = "scale(2)";
  });

  mainImageContainer.addEventListener("mouseleave", () => {
    if (!isZoomed) {
      mainImage.style.transform = "scale(1)";
    }
  });
}

/**
 * Inicializa o swipe na galeria (mobile) - sem conflito com zoom
 */
function initSwipe() {
  const threshold = 50;

  mainImageContainer.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  mainImageContainer.addEventListener("touchmove", (e) => {
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    const diffX = Math.abs(touchX - touchStartX);
    const diffY = Math.abs(touchY - touchStartY);

    // Só ativa swipe se movimento horizontal for maior que vertical
    if (diffX > diffY && diffX > threshold) {
      e.preventDefault();
    }
  }, { passive: false });

  // Swipe e double-tap unificados
  let lastTap = 0;
  mainImageContainer.addEventListener("touchend", (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartX - touchEndX;
    const diffY = Math.abs(touchStartY - touchEndY);

    // Double-tap para zoom
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;

    if (tapLength < 300 && tapLength > 0 && Math.abs(diffX) < 10 && diffY < 10) {
      isZoomed = !isZoomed;
      mainImage.style.transform = isZoomed ? "scale(2)" : "scale(1)";
      e.preventDefault();
      lastTap = 0;
      return;
    }

    lastTap = currentTime;

    // Swipe horizontal
    if (Math.abs(diffX) > threshold && diffY < 50) {
      if (diffX > 0 && indiceAtual < miniaturas.length - 1) {
        trocarImagem(indiceAtual + 1);
      } else if (diffX < 0 && indiceAtual > 0) {
        trocarImagem(indiceAtual - 1);
      }
    }
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
