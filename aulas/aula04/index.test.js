import { soma, subtracao, multiplicacao, divisao } from "./index.js";

console.log("Teste da função soma ()");
if (soma(2, 2) === 4) console.log("Passou 1°!")
else console.log("Falhou 1°!");
if (soma(-1, 2) === 1) console.log("Passou 2°!")
else console.log("Falhou 2°!");
if (soma(2, 0) === 2) console.log("Passou 3°!")
    else console.log("Falhou 3°!");

console.log("Teste da função subtração()");
if (subtracao(2, 2) === 0) console.log("Passou 4°!")
else console.log("Falhou 4°!");
if (subtracao(-2, 2) === -4) console.log("Passou 5°!")
else console.log("Falhou 5°!");
if (subtracao(-2, 0) === -2) console.log("Passou 6°!")
    else console.log("Falhou 6°!");

console.log("Teste da função multiplicação()");
if (multiplicacao(4, 2) === 8) console.log("Passou 7°!")
else console.log("Falhou 7°!");
if (multiplicacao(-2, 2) === -4) console.log("Passou 8°!")
else console.log("Falhou 8°!");
if (multiplicacao(-2, -2) === 4) console.log("Passou 9°!")
    else console.log("Falhou 9°!");

console.log("Teste da função divisão()");
if (divisao(4, 2) === 2) console.log("Passou 10°!")
else console.log("Falhou 10°!");
if (divisao(-2, 2) === -1) console.log("Passou 11°!")
else console.log("Falhou 11°!");
if (divisao(-2, 0) === undefined) console.log("Passou 12°!")
    else console.log("Falhou 12°!");