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
  try {
    localStorage.setItem(chave, JSON.stringify(dados));
  } catch (e) {
    console.warn("localStorage cheio ou indisponível:", e);
  }
}

/**
 * Carrega dados do localStorage
 * @param {string} chave - A chave de armazenamento
 * @param {any} padrao - Valor padrão se não existir
 * @returns {any} Os dados carregados ou o valor padrão
 */
export function carregarStorage(chave, padrao = null) {
  try {
    const dados = localStorage.getItem(chave);
    return dados ? JSON.parse(dados) : padrao;
  } catch (e) {
    console.warn("Erro ao ler localStorage:", e);
    return padrao;
  }
}

/**
 * Valida número de cartão usando algoritmo de Luhn
 * @param {string} numero - Número do cartão sem espaços
 * @returns {boolean} True se válido
 */
export function validarLuhn(numero) {
  const digitos = numero.replace(/\D/g, "");
  if (digitos.length < 13 || digitos.length > 19) return false;

  let soma = 0;
  let deveDobrar = false;

  for (let i = digitos.length - 1; i >= 0; i--) {
    let digito = parseInt(digitos.charAt(i), 10);

    if (deveDobrar) {
      digito *= 2;
      if (digito > 9) digito -= 9;
    }

    soma += digito;
    deveDobrar = !deveDobrar;
  }

  return soma % 10 === 0;
}

/**
 * Mantém o foco do teclado dentro de um elemento (focus trap)
 * @param {HTMLElement} container
 */
export function trapFocus(container) {
  const focusableElements = container.querySelectorAll(
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  if (firstFocusable) firstFocusable.focus();

  container.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  });
}
