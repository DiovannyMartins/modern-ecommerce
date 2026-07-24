const mainImage = document.getElementById("mainImage");
const miniaturas = document.querySelectorAll(".image-gallery img");
const mainImageContainer = document.querySelector(".main-image");

/**
 * Inicializa a galeria de imagens e o zoom
 */
export function initGallery() {
  miniaturas.forEach((miniatura) => {
    miniatura.addEventListener("click", () => {
      mainImage.classList.add("carregando");

      mainImage.onload = () => {
        mainImage.classList.remove("carregando");
      };

      mainImage.src = miniatura.src;

      miniaturas.forEach((img) => {
        img.classList.remove("active");
        img.setAttribute("aria-selected", "false");
      });
      miniatura.classList.add("active");
      miniatura.setAttribute("aria-selected", "true");
    });

    miniatura.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        miniatura.click();
      }
    });
  });

  initZoom();
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
