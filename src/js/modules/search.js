import { mostrarToast } from "./toast.js";
import { PRODUTO_TERMOS_BUSCA } from "./product-config.js";

const formBusca = document.getElementById("formBusca");
const inputBusca = document.getElementById("inputBusca");
const btnBuscaMobile = document.getElementById("btnBuscaMobile");

/**
 * Inicializa a busca simulada
 */
export function initSearch() {
  formBusca.addEventListener("submit", (event) => {
    event.preventDefault();

    const termo = inputBusca.value.trim().toLowerCase();

    if (termo === "") return;

    if (PRODUTO_TERMOS_BUSCA.includes(termo)) {
      document
        .querySelector(".product-hero")
        .scrollIntoView({ behavior: "smooth" });
    } else {
      mostrarToast("Nenhum produto encontrado para: " + termo);
    }

    inputBusca.value = "";
    formBusca.classList.remove("expandida");
  });

  btnBuscaMobile.addEventListener("click", () => {
    formBusca.classList.toggle("expandida");
    if (formBusca.classList.contains("expandida")) {
      inputBusca.focus();
    }
  });

  inputBusca.addEventListener("blur", () => {
    if (inputBusca.value.trim() === "") {
      formBusca.classList.remove("expandida");
    }
  });
}
