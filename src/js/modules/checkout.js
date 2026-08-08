import {
  formatarPreco,
  gerarNumeroPedido,
  validarLuhn,
  trapFocus,
} from "./utils.js";
import { mostrarToast } from "./toast.js";
import {
  getCarrinho,
  limparCarrinho,
  getTotalCarrinho,
  fecharCarrinho,
} from "./cart.js";

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
const nomeCartao = document.getElementById("nomeCartao");
const msgNumeroCartao = document.getElementById("msgNumeroCartao");
const msgNomeCartao = document.getElementById("msgNomeCartao");
const msgValidadeCartao = document.getElementById("msgValidadeCartao");
const msgCvvCartao = document.getElementById("msgCvvCartao");
const btnFinalizar = document.getElementById("btnFinalizar");

let metodoSelecionado = "pix";
let descontoAplicado = 0;
let valorOriginal = 0;
let liberarFocusCheckout = null;

const CUPONS_VALIDOS = {
  NEON10: 10,
  GAMER20: 20,
  PRIMEIRO: 15,
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
    checkoutDesconto.querySelector("span").textContent =
      `-${formatarPreco(valorDesconto)}`;
    checkoutDesconto.hidden = false;
  } else {
    checkoutDesconto.hidden = true;
  }
}

function fecharCheckout(force = false) {
  if (!force && metodoSelecionado === "cartao") {
    const numero = numeroCartao.value.replace(/\s/g, "");
    const nome = nomeCartao.value.trim();
    const validade = validadeCartao.value;
    const cvv = cvvCartao.value;

    if (
      numero.length > 0 ||
      nome.length > 0 ||
      validade.length > 0 ||
      cvv.length > 0
    ) {
      mostrarToast(
        "Fechar sem salvar? Os dados do cartão serão perdidos.",
        5000,
        {
          label: "Fechar",
          callback: () => fecharCheckout(true),
        },
      );
      return;
    }
  }

  const btnSticky = document.getElementById("btnComprarSticky");
  if (btnSticky) {
    btnSticky.textContent = `Adicionar ao Carrinho - ${formatarPreco(getTotalCarrinho())}`;
  }

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

    const textoOriginal = btnAplicarCupom.textContent;
    btnAplicarCupom.textContent = "...";
    btnAplicarCupom.disabled = true;

    setTimeout(() => {
      btnAplicarCupom.textContent = textoOriginal;
      btnAplicarCupom.disabled = false;

      if (CUPONS_VALIDOS[codigo]) {
        descontoAplicado = CUPONS_VALIDOS[codigo];
        cupomMensagem.textContent = `Cupom aplicado! ${descontoAplicado}% de desconto`;
        cupomMensagem.className = "cupom-mensagem sucesso";
        aplicarDesconto();
        mostrarToast(`Cupom ${codigo} aplicado com sucesso!`);
      } else {
        descontoAplicado = 0;
        cupomMensagem.textContent =
          "Cupom não encontrado. Tente NEON10, GAMER20 ou PRIMEIRO.";
        cupomMensagem.className = "cupom-mensagem erro";
        aplicarDesconto();
      }
    }, 500);
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
      metodosPagamento.forEach((b) =>
        b.setAttribute("aria-pressed", String(b === botao)),
      );
      metodoSelecionado = botao.dataset.metodo;
      formCartao.classList.toggle("visivel", metodoSelecionado === "cartao");
    });
  });

  numeroCartao.addEventListener("input", () => {
    let valor = numeroCartao.value.replace(/\D/g, "");
    valor = valor.slice(0, 16);
    valor = valor.replace(/(\d{4})(?=\d)/g, "$1 ");
    numeroCartao.value = valor;

    const digitos = valor.replace(/\s/g, "");
    numeroCartao.classList.remove("input-erro", "input-ok");
    msgNumeroCartao.textContent = "";
    msgNumeroCartao.className = "campo-mensagem";

    if (digitos.length === 0) return;

    if (digitos.length < 16) {
      msgNumeroCartao.textContent = `Faltam ${16 - digitos.length} dígitos`;
      msgNumeroCartao.className = "campo-mensagem erro";
    } else if (!validarLuhn(digitos)) {
      numeroCartao.classList.add("input-erro");
      msgNumeroCartao.textContent = "Número de cartão inválido";
      msgNumeroCartao.className = "campo-mensagem erro";
    } else {
      numeroCartao.classList.add("input-ok");
      msgNumeroCartao.textContent = "Cartão válido";
      msgNumeroCartao.className = "campo-mensagem ok";
    }
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
    validadeCartao.classList.remove("input-erro", "input-ok");
    msgValidadeCartao.textContent = "";
    msgValidadeCartao.className = "campo-mensagem";

    if (valor.length === 5) {
      if (validarValidade(valor)) {
        validadeCartao.classList.add("input-ok");
        msgValidadeCartao.textContent = "Válida";
        msgValidadeCartao.className = "campo-mensagem ok";
      } else {
        validadeCartao.classList.add("input-erro");
        msgValidadeCartao.textContent = "Cartão vencido";
        msgValidadeCartao.className = "campo-mensagem erro";
      }
    }
  });

  cvvCartao.addEventListener("input", () => {
    let valor = cvvCartao.value.replace(/\D/g, "");
    cvvCartao.value = valor.slice(0, 4);

    cvvCartao.classList.remove("input-erro", "input-ok");
    msgCvvCartao.textContent = "";
    msgCvvCartao.className = "campo-mensagem";

    if (valor.length >= 3) {
      cvvCartao.classList.add("input-ok");
      msgCvvCartao.textContent = "OK";
      msgCvvCartao.className = "campo-mensagem ok";
    } else if (valor.length > 0) {
      msgCvvCartao.textContent = `Faltam ${3 - valor.length} dígitos`;
      msgCvvCartao.className = "campo-mensagem erro";
    }
  });

  nomeCartao.addEventListener("input", () => {
    nomeCartao.classList.remove("input-erro", "input-ok");
    msgNomeCartao.textContent = "";
    msgNomeCartao.className = "campo-mensagem";

    const valor = nomeCartao.value.trim();
    if (valor.length === 0) return;

    if (valor.length < 3) {
      nomeCartao.classList.add("input-erro");
      msgNomeCartao.textContent = "Nome muito curto";
      msgNomeCartao.className = "campo-mensagem erro";
    } else {
      nomeCartao.classList.add("input-ok");
    }
  });

  btnConfirmarPedido.addEventListener("click", () => {
    if (metodoSelecionado === "cartao") {
      const numero = numeroCartao.value.replace(/\s/g, "");
      const nome = nomeCartao.value.trim();
      const validade = validadeCartao.value;
      const cvv = cvvCartao.value;
      let erros = false;

      if (numero.length !== 16 || !validarLuhn(numero)) {
        numeroCartao.classList.add("input-erro");
        msgNumeroCartao.textContent = "Número do cartão inválido";
        msgNumeroCartao.className = "campo-mensagem erro";
        erros = true;
      }

      if (nome === "") {
        nomeCartao.classList.add("input-erro");
        msgNomeCartao.textContent = "Preencha o nome impresso no cartão";
        msgNomeCartao.className = "campo-mensagem erro";
        erros = true;
      }

      if (!validarValidade(validade)) {
        validadeCartao.classList.add("input-erro");
        msgValidadeCartao.textContent = "Validade inválida";
        msgValidadeCartao.className = "campo-mensagem erro";
        erros = true;
      }

      if (cvv.length < 3) {
        cvvCartao.classList.add("input-erro");
        msgCvvCartao.textContent = "CVV inválido";
        msgCvvCartao.className = "campo-mensagem erro";
        erros = true;
      }

      if (erros) {
        const primeiroErro = [numeroCartao, nomeCartao, validadeCartao, cvvCartao]
          .find(el => el.classList.contains("input-erro"));
        if (primeiroErro) primeiroErro.focus();
        return;
      }
    }

    numeroPedido.textContent = gerarNumeroPedido();
    etapaPagamento.hidden = true;
    etapaSucesso.hidden = false;
    liberarFocusCheckout?.();
    liberarFocusCheckout = trapFocus(checkoutModal);

    if (typeof gtag !== "undefined") {
      gtag("event", "purchase", {
        transaction_id: numeroPedido.textContent,
        value: getTotalCarrinho(),
        currency: "BRL",
      });
    }
  });

  btnFecharSucesso.addEventListener("click", () => {
    limparCarrinho();
    fecharCheckout();
    fecharCarrinho();

    etapaPagamento.hidden = false;
    etapaSucesso.hidden = true;
    formCartao.reset();
    [msgNumeroCartao, msgNomeCartao, msgValidadeCartao, msgCvvCartao].forEach(msg => {
      msg.textContent = "";
      msg.className = "campo-mensagem";
    });
    [numeroCartao, nomeCartao, validadeCartao, cvvCartao].forEach(el => {
      el.classList.remove("input-erro", "input-ok");
    });
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
