/**
 * Formata um número como moeda brasileira (R$ 0.000,00)
 * @param {number} valor - O valor a ser formatado
 * @returns {string} O valor formatado como moeda
 */
export function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

/**
 * Sanitiza uma string para prevenir XSS
 * @param {string} str - A string a ser sanitizada
 * @returns {string} A string sanitizada
 */
export function sanitize(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/**
 * Gera um número de pedido aleatório
 * @returns {string} Número do pedido formatado
 */
export function gerarNumeroPedido() {
  const numero = Math.floor(100000 + Math.random() * 900000);
  return `#${numero}`;
}

/**
 * Salva dados no localStorage
 * @param {string} chave - A chave de armazenamento
 * @param {any} dados - Os dados a serem salvos
 */
export function salvarStorage(chave, dados) {
  localStorage.setItem(chave, JSON.stringify(dados));
}

/**
 * Carrega dados do localStorage
 * @param {string} chave - A chave de armazenamento
 * @param {any} padrao - Valor padrão se não existir
 * @returns {any} Os dados carregados ou o valor padrão
 */
export function carregarStorage(chave, padrao = null) {
  const dados = localStorage.getItem(chave);
  return dados ? JSON.parse(dados) : padrao;
}
