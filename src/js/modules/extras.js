import { formatarPreco, salvarStorage, carregarStorage } from "./utils.js";
import { mostrarToast } from "./toast.js";

let wishlist = carregarStorage("wishlist", []);

/**
 * Adiciona produto à wishlist
 * @param {Object} produto
 */
export function addToWishlist(produto) {
  const existe = wishlist.find((p) => p.id === produto.id);

  if (existe) {
    wishlist = wishlist.filter((p) => p.id !== produto.id);
    mostrarToast("Removido da wishlist");
  } else {
    wishlist.push(produto);
    mostrarToast("Adicionado à wishlist");
  }

  salvarStorage("wishlist", wishlist);
  atualizarBadgeWishlist();
}

/**
 * Retorna a wishlist
 */
export function getWishlist() {
  return wishlist;
}

/**
 * Atualiza o badge da wishlist
 */
function atualizarBadgeWishlist() {
  const badge = document.getElementById("wishlistBadge");
  if (badge) {
    badge.textContent = wishlist.length;
  }
}

/**
 * Valida cupom de desconto
 * @param {string} codigo
 * @returns {number|null} Desconto em porcentagem ou null
 */
export function validarCupom(codigo) {
  const cupons = {
    "NEON10": 10,
    "GAMER20": 20,
    "PRIMEIRO": 15
  };

  return cupons[codigo.toUpperCase()] || null;
}

/**
 * Calcula frete por CEP
 * @param {string} cep
 * @returns {Object} Valor e prazo
 */
export function calcularFrete(cep) {
  const cepLimpo = cep.replace(/\D/g, "");

  if (cepLimpo.length !== 8) {
    return { valor: 0, prazo: 0, erro: "CEP inválido" };
  }

  const regiao = parseInt(cepLimpo.substring(0, 2));

  if (regiao >= 1 && regiao <= 2) {
    return { valor: 0, prazo: 3, texto: "Grátis - 3 dias úteis" };
  } else if (regiao >= 3 && regiao <= 5) {
    return { valor: 29.90, prazo: 5, texto: `R$ 29,90 - 5 dias úteis` };
  } else {
    return { valor: 49.90, prazo: 7, texto: `R$ 49,90 - 7 dias úteis` };
  }
}

export function initWishlist() {
  atualizarBadgeWishlist();
}
