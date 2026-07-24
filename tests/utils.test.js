import { describe, it, expect } from 'vitest';
import { formatarPreco, gerarNumeroPedido } from '../src/js/modules/utils.js';

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
});
