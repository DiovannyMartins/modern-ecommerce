import { describe, it, expect } from 'vitest';
import { formatarPreco, gerarNumeroPedido, validarLuhn, sanitize } from '../src/js/modules/utils.js';

describe('Utils', () => {
  it('formata preço em BRL', () => {
    expect(formatarPreco(899)).toBe('R$ 899,00');
    expect(formatarPreco(0)).toBe('R$ 0,00');
    expect(formatarPreco(1234.56)).toBe('R$ 1.234,56');
  });

  it('gera número de pedido com 6 dígitos', () => {
    const numero = gerarNumeroPedido();
    expect(numero).toMatch(/^#\d{6}$/);
  });

  it('valida número de cartão com Luhn', () => {
    // Número válido (Visa teste)
    expect(validarLuhn('4111111111111111')).toBe(true);
    // Número inválido
    expect(validarLuhn('1234567890123456')).toBe(false);
    // Número muito curto
    expect(validarLuhn('123')).toBe(false);
  });

  it('sanitiza strings para prevenir XSS', () => {
    expect(sanitize('<script>alert("xss")</script>')).toBe('&lt;script&gt;alert("xss")&lt;/script&gt;');
    expect(sanitize('texto normal')).toBe('texto normal');
  });
});
