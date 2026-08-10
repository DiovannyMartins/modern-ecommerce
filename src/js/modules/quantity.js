import { formatarPreco } from "./utils.js";

const btnDiminuir = document.getElementById("btnDiminuir");
const btnAumentar = document.getElementById("btnAumentar");
const quantidadeValor = document.getElementById("quantidadeValor");
const subtotalValor = document.getElementById("subtotalValor");
const precoUnitario = document.getElementById("precoUnitario");

let quantidade = 1;
const preco = precoUnitario ? (parseFloat(precoUnitario.dataset.price) || 899.00) : 899.00;

/**
 * Atualiza o subtotal exibido na tela
 */
function atualizarSubtotal() {
  const subtotal = preco * quantidade;
  subtotalValor.textContent = formatarPreco(subtotal);
}

/**
 * Retorna a quantidade atual
 * @returns {number}
 */
export function getQuantidade() {
  return quantidade;
}

/**
 * Retorna o preço unitário
 * @returns {number}
 */
export function getPreco() {
  return preco;
}

/**
 * Inicializa os controles de quantidade
 */
export function initQuantity() {
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
}
