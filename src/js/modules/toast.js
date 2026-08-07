const toast = document.getElementById("toast");
let toastTimeout;

export function mostrarToast(mensagem, duracao = 3000, acao = null) {
  clearTimeout(toastTimeout);
  toast.textContent = "";
  toast.classList.remove("show");

  const span = document.createElement("span");
  span.textContent = mensagem;
  toast.appendChild(span);

  if (acao && acao.label && typeof acao.callback === "function") {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "toast-action";
    btn.textContent = acao.label;
    btn.addEventListener("click", () => {
      acao.callback();
      clearTimeout(toastTimeout);
      toast.classList.remove("show");
    });
    toast.appendChild(btn);
  }

  void toast.offsetWidth;
  toast.classList.add("show");

  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, duracao);
}
