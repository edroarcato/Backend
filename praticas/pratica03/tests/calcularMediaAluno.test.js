const { calcularMediaAluno } = require('../src/calcularMediaAluno');

test('função calcularMediaAluno deve estar definida', () => {
    expect(calcularMediaAluno).toBeDefined();
});

test("deve lançar erro se a1 ou a2 estiverem indefinidos", () => {
    expect(() => calcularMediaAluno(undefined, 5, 7)).toThrow("Notas a1 ou a2 não informadas");
    expect(() => calcularMediaAluno(8, undefined, 7)).toThrow("Notas a1 ou a2 não informadas");
});

test("deve lançar erro se a1 ou a2 forem negativos", () => {
    expect(() => calcularMediaAluno(-1, 5, 7)).toThrow("Notas a1 ou a2 não podem ser negativas");
    expect(() => calcularMediaAluno(8, -3, 7)).toThrow("Notas a1 ou a2 não podem ser negativas");
});
  
test("deve calcular a média com a1 * 0.4 + a2 * 0.6 quando a3 não é informada", () => {
    const resultado = calcularMediaAluno(5, 7);
    const esperado = 5 * 0.4 + 7 * 0.6;
    expect(resultado).toBeCloseTo(esperado, 1);
});

test("deve lançar erro se a3 for negativa", () => {
    expect(() => calcularMediaAluno(6, 7, -2)).toThrow('Nota a3 não pode ser negativa');
});

test("deve usar a melhor combinação entre a1 e a3 se essa for a maior média", () => {
  const resultado = calcularMediaAluno(9, 5, 8);
  const esperado = 9 * 0.4 + 8 * 0.6;
  expect(resultado).toBeCloseTo(esperado, 1);
});

test("deve usar a melhor combinação entre a3 e a2 se essa for a maior média", () => {
  const resultado = calcularMediaAluno(4, 9, 8);
  const esperado = 8 * 0.4 + 9 * 0.6;
  expect(resultado).toBeCloseTo(esperado, 1);
});