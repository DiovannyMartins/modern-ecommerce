const toast = document.getElementById("toast");
let toastTimeout;

/**
 * Exibe uma notificação toast
 * @param {string} mensagem - A mensagem a ser exibida
 * @param {number} duracao - Duração em milissegundos (padrão: 3000)
 */
export function mostrarToast(mensagem, duracao = 3000) {
  clearTimeout(toastTimeout);
  toast.textContent = mensagem;
  toast.classList.add("show");

  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, duracao);
}
