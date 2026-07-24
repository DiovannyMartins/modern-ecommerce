import { mostrarToast } from "./toast.js";

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
    const nomeProduto = "headset wireless neonx pro";

    if (termo === "") return;

    if (nomeProduto.includes(termo)) {
      document.querySelector(".product-hero").scrollIntoView({ behavior: "smooth" });
    } else {
      mostrarToast("Nenhum produto encontrado para: " + inputBusca.value);
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
