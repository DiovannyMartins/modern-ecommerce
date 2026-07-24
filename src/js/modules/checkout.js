import { gerarNumeroPedido } from "./utils.js";
import { mostrarToast } from "./toast.js";
import { getCarrinho, limparCarrinho, getTotalCarrinho, fecharCarrinho } from "./cart.js";

const checkoutOverlay = document.getElementById("checkoutOverlay");
const checkoutModal = document.getElementById("checkoutModal");
const btnFecharCheckout = document.getElementById("btnFecharCheckout");
const checkoutTotal = document.getElementById("checkoutTotal");
const metodosPagamento = document.querySelectorAll(".metodo-pagamento");
const formCartao = document.getElementById("formCartao");
const btnConfirmarPedido = document.getElementById("btnConfirmarPedido");
const etapaPagamento = document.getElementById("etapaPagamento");
const etapaSucesso = document.getElementById("etapaSucesso");
const numeroPedido = document.getElementById("numeroPedido");
const btnFecharSucesso = document.getElementById("btnFecharSucesso");
const numeroCartao = document.getElementById("numeroCartao");
const validadeCartao = document.getElementById("validadeCartao");
const cvvCartao = document.getElementById("cvvCartao");
const btnFinalizar = document.getElementById("btnFinalizar");

let metodoSelecionado = "pix";

function abrirCheckout() {
  checkoutOverlay.classList.add("active");
  checkoutModal.classList.add("active");
  document.body.style.overflow = "hidden";
  trapFocus(checkoutModal);
}

function fecharCheckout() {
  checkoutOverlay.classList.remove("active");
  checkoutModal.classList.remove("active");
  document.body.style.overflow = "";
  btnFinalizar.focus();
}

/**
 * Inicializa o checkout simulado
 */
export function initCheckout() {
  btnFinalizar.addEventListener("click", () => {
    if (getCarrinho().length === 0) {
      mostrarToast("Seu carrinho está vazio!");
      return;
    }

    checkoutTotal.textContent = getTotalCarrinho();
    abrirCheckout();
  });

  btnFecharCheckout.addEventListener("click", fecharCheckout);
  checkoutOverlay.addEventListener("click", fecharCheckout);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && checkoutModal.classList.contains("active")) {
      fecharCheckout();
    }
  });

  metodosPagamento.forEach((botao) => {
    botao.addEventListener("click", () => {
      metodosPagamento.forEach((b) => b.classList.remove("active"));
      botao.classList.add("active");
      metodoSelecionado = botao.dataset.metodo;
      formCartao.classList.toggle("visivel", metodoSelecionado === "cartao");
    });
  });

  numeroCartao.addEventListener("input", () => {
    let valor = numeroCartao.value.replace(/\D/g, "");
    valor = valor.slice(0, 16);
    valor = valor.replace(/(\d{4})(?=\d)/g, "$1 ");
    numeroCartao.value = valor;
  });

  validadeCartao.addEventListener("input", () => {
    let valor = validadeCartao.value.replace(/\D/g, "");
    valor = valor.slice(0, 4);

    if (valor.length >= 2) {
      let mes = parseInt(valor.slice(0, 2));

      if (mes === 0) {
        valor = "01" + valor.slice(2);
      } else if (mes > 12) {
        valor = "12" + valor.slice(2);
      }
    }

    if (valor.length >= 3) {
      valor = valor.slice(0, 2) + "/" + valor.slice(2);
    }

    validadeCartao.value = valor;
  });

  cvvCartao.addEventListener("input", () => {
    let valor = cvvCartao.value.replace(/\D/g, "");
    cvvCartao.value = valor.slice(0, 4);
  });

  btnConfirmarPedido.addEventListener("click", () => {
    if (metodoSelecionado === "cartao") {
      const numero = numeroCartao.value.replace(/\s/g, "");
      const nome = document.getElementById("nomeCartao").value.trim();
      const validade = validadeCartao.value;
      const cvv = cvvCartao.value;

      if (numero.length !== 16) {
        mostrarToast("Número do cartão inválido. Digite 16 dígitos.");
        return;
      }

      if (nome === "") {
        mostrarToast("Preencha o nome impresso no cartão.");
        return;
      }

      if (validade.length !== 5) {
        mostrarToast("Validade inválida. Use o formato MM/AA.");
        return;
      }

      if (cvv.length < 3) {
        mostrarToast("CVV inválido. Digite 3 ou 4 dígitos.");
        return;
      }
    }

    numeroPedido.textContent = gerarNumeroPedido();
    etapaPagamento.hidden = true;
    etapaSucesso.hidden = false;
  });

  btnFecharSucesso.addEventListener("click", () => {
    limparCarrinho();
    fecharCheckout();
    fecharCarrinho();

    etapaPagamento.hidden = false;
    etapaSucesso.hidden = true;
    formCartao.reset();
    metodosPagamento.forEach((b) => b.classList.remove("active"));
    document.querySelector('[data-metodo="pix"]').classList.add("active");
    formCartao.classList.remove("visivel");
    metodoSelecionado = "pix";

    mostrarToast("Pedido confirmado com sucesso!");
  });
}

/**
 * Mantém o foco do teclado dentro de um elemento (focus trap)
 * @param {HTMLElement} container
 */
function trapFocus(container) {
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
