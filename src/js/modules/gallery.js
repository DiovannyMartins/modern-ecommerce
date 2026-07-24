const mainImage = document.getElementById("mainImage");
const miniaturas = document.querySelectorAll(".image-gallery img");
const mainImageContainer = document.querySelector(".main-image");

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

  // Navegação por teclado nas setas
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && indiceAtual > 0) {
      trocarImagem(indiceAtual - 1);
    } else if (e.key === "ArrowRight" && indiceAtual < miniaturas.length - 1) {
      trocarImagem(indiceAtual + 1);
    }
  });

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

  mainImageContainer.addEventListener("touchend", (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartX - touchEndX;
    const diffY = Math.abs(touchStartY - touchEndY);

    // Só processa swipe se movimento horizontal for dominante
    if (Math.abs(diffX) > threshold && diffY < 50) {
      if (diffX > 0 && indiceAtual < miniaturas.length - 1) {
        trocarImagem(indiceAtual + 1);
      } else if (diffX < 0 && indiceAtual > 0) {
        trocarImagem(indiceAtual - 1);
      }
    }
  });

  // Zoom com double-tap no mobile
  let lastTap = 0;
  mainImageContainer.addEventListener("touchend", (e) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;

    if (tapLength < 300 && tapLength > 0) {
      isZoomed = !isZoomed;
      mainImage.style.transform = isZoomed ? "scale(2)" : "scale(1)";
      e.preventDefault();
    }

    lastTap = currentTime;
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
