import { formatarPreco, gerarNumeroPedido, validarLuhn, trapFocus } from "./utils.js";
import { mostrarToast } from "./toast.js";
import { getCarrinho, limparCarrinho, getTotalCarrinho, fecharCarrinho } from "./cart.js";

const checkoutOverlay = document.getElementById("checkoutOverlay");
const checkoutModal = document.getElementById("checkoutModal");
const btnFecharCheckout = document.getElementById("btnFecharCheckout");
const checkoutTotal = document.getElementById("checkoutTotal");
const checkoutDesconto = document.getElementById("checkoutDesconto");
const inputCupom = document.getElementById("inputCupom");
const btnAplicarCupom = document.getElementById("btnAplicarCupom");
const cupomMensagem = document.getElementById("cupomMensagem");
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
let descontoAplicado = 0;
let valorOriginal = 0;
let liberarFocusCheckout = null;

const CUPONS_VALIDOS = {
  "NEON10": 10,
  "GAMER20": 20,
  "PRIMEIRO": 15
};

function abrirCheckout() {
  checkoutOverlay.classList.add("active");
  checkoutModal.classList.add("active");
  document.body.style.overflow = "hidden";
  liberarFocusCheckout?.();
  liberarFocusCheckout = trapFocus(checkoutModal);

  valorOriginal = getTotalCarrinho();
  aplicarDesconto();
}

function aplicarDesconto() {
  const valorDesconto = valorOriginal * (descontoAplicado / 100);
  const valorFinal = valorOriginal - valorDesconto;

  checkoutTotal.textContent = formatarPreco(valorFinal);

  if (descontoAplicado > 0) {
    const spanDesconto = checkoutDesconto.querySelector("span");
    if (spanDesconto) {
      spanDesconto.textContent = `-${formatarPreco(valorDesconto)}`;
    }
    checkoutDesconto.hidden = false;
  } else {
    checkoutDesconto.hidden = true;
  }
}

function fecharCheckout() {
  checkoutOverlay.classList.remove("active");
  checkoutModal.classList.remove("active");
  document.body.style.overflow = "";
  liberarFocusCheckout?.();
  liberarFocusCheckout = null;
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

    checkoutTotal.textContent = formatarPreco(getTotalCarrinho());
    abrirCheckout();
  });

  btnFecharCheckout.addEventListener("click", fecharCheckout);
  checkoutOverlay.addEventListener("click", fecharCheckout);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && checkoutModal.classList.contains("active")) {
      e.stopPropagation();
      fecharCheckout();
    }
  });

  btnAplicarCupom.addEventListener("click", () => {
    const codigo = inputCupom.value.trim().toUpperCase();

    if (!codigo) {
      cupomMensagem.textContent = "Digite um código de cupom";
      cupomMensagem.className = "cupom-mensagem erro";
      return;
    }

    if (CUPONS_VALIDOS[codigo]) {
      descontoAplicado = CUPONS_VALIDOS[codigo];
      cupomMensagem.textContent = `Cupom aplicado! ${descontoAplicado}% de desconto`;
      cupomMensagem.className = "cupom-mensagem sucesso";
      aplicarDesconto();
      mostrarToast(`Cupom ${codigo} aplicado com sucesso!`);
    } else {
      descontoAplicado = 0;
      cupomMensagem.textContent = "Cupom inválido";
      cupomMensagem.className = "cupom-mensagem erro";
      aplicarDesconto();
    }
  });

  inputCupom.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      btnAplicarCupom.click();
    }
  });

  formCartao.addEventListener("submit", (e) => e.preventDefault());

  metodosPagamento.forEach((botao) => {
    botao.addEventListener("click", () => {
      metodosPagamento.forEach((b) => b.classList.remove("active"));
      botao.classList.add("active");
      metodosPagamento.forEach((b) => b.setAttribute("aria-pressed", String(b === botao)));
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

      if (!validarLuhn(numero)) {
        mostrarToast("Número do cartão inválido. Verifique os dígitos.");
        return;
      }

      if (nome === "") {
        mostrarToast("Preencha o nome impresso no cartão.");
        return;
      }

      if (!validarValidade(validade)) {
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
    liberarFocusCheckout?.();
    liberarFocusCheckout = trapFocus(checkoutModal);
  });

  btnFecharSucesso.addEventListener("click", () => {
    limparCarrinho();
    fecharCheckout();
    fecharCarrinho();

    etapaPagamento.hidden = false;
    etapaSucesso.hidden = true;
    formCartao.reset();
    metodosPagamento.forEach((b) => b.classList.remove("active"));
    metodosPagamento.forEach((b) => b.setAttribute("aria-pressed", "false"));
    const metodoPix = document.querySelector('[data-metodo="pix"]');
    metodoPix.classList.add("active");
    metodoPix.setAttribute("aria-pressed", "true");
    formCartao.classList.remove("visivel");
    metodoSelecionado = "pix";
    descontoAplicado = 0;
    inputCupom.value = "";
    cupomMensagem.textContent = "";

    mostrarToast("Pedido confirmado com sucesso!");
  });
}

function validarValidade(validade) {
  if (!/^\d{2}\/\d{2}$/.test(validade)) return false;

  const [mes, ano] = validade.split("/").map(Number);
  if (mes < 1 || mes > 12) return false;

  const hoje = new Date();
  const anoAtual = hoje.getFullYear() % 100;
  return ano > anoAtual || (ano === anoAtual && mes >= hoje.getMonth() + 1);
}
