import { mostrarToast } from "./toast.js";

const formBusca = document.getElementById("formBusca");
const inputBusca = document.getElementById("inputBusca");

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
  });
}
