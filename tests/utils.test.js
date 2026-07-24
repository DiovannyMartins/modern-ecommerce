import { describe, it, expect } from 'vitest';
import { formatarPreco, gerarNumeroPedido, validarLuhn, sanitize } from '../src/js/modules/utils.js';

describe('Utils', () => {
  it('formata preço em BRL', () => {
    const resultado = formatarPreco(899);
    expect(resultado).toContain('899');
    expect(resultado).toContain('R$');

    const resultadoZero = formatarPreco(0);
    expect(resultadoZero).toContain('0');
    expect(resultadoZero).toContain('R$');

    const resultadoDecimal = formatarPreco(1234.56);
    expect(resultadoDecimal).toContain('1.234');
    expect(resultadoDecimal).toContain('R$');
  });

  it('gera número de pedido com 6 dígitos', () => {
    const numero = gerarNumeroPedido();
    expect(numero).toMatch(/^#\d{6}$/);
  });

  it('valida número de cartão com Luhn', () => {
    expect(validarLuhn('4111111111111111')).toBe(true);
    expect(validarLuhn('1234567890123456')).toBe(false);
    expect(validarLuhn('123')).toBe(false);
  });

  it('sanitiza strings para prevenir XSS', () => {
    expect(sanitize('<script>alert("xss")</script>')).toBe('&lt;script&gt;alert("xss")&lt;/script&gt;');
    expect(sanitize('texto normal')).toBe('texto normal');
  });
});
