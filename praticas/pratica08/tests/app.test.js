const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

let tokenValido = "";
let novoToken = "";

describe("Testes da API REST", () => {

  test("GET /produtos deve retornar 401 e msg 'Não autorizado'", async () => {
    const res = await request.get('/produtos');

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('msg', 'Não autorizado');
    expect(res.type).toMatch(/json/);
  });

  test("GET /produtos com token 123456789 deve retornar 401 e msg 'Token inválido'", async () => {
    const res = await request
      .get('/produtos')
      .set('authorization', '123456789');

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('msg', 'Token inválido');
    expect(res.type).toMatch(/json/);
  });

  test("POST /usuarios/login deve retornar 200 e JSON contendo token", async () => {
    const res = await request
      .post('/usuarios/login')
      .send({
        usuario: "email@exemplo.com",
        senha: "abcd1234"
      });

    expect(res.status).toBe(200);
    expect(res.type).toMatch(/json/);
    expect(res.body).toHaveProperty('token');

    tokenValido = res.body.token;
  });

  test("GET /produtos com token válido deve retornar 200 e JSON", async () => {
    const res = await request
      .get('/produtos')
      .set('authorization', tokenValido);

    expect(res.status).toBe(200);
    expect(res.type).toMatch(/json/);
  });

  test("POST /usuarios/renovar deve retornar 200 e JSON contendo token", async () => {
    const res = await request
      .post('/usuarios/renovar')
      .set('authorization', tokenValido);

    expect(res.status).toBe(200);
    expect(res.type).toMatch(/json/);
    expect(res.body).toHaveProperty('token');

    novoToken = res.body.token;
  });

  test("GET /produtos com novo token deve retornar 200 e JSON", async () => {
    const res = await request
      .get('/produtos')
      .set('authorization', novoToken);

    expect(res.status).toBe(200);
    expect(res.type).toMatch(/json/);
  });

});
