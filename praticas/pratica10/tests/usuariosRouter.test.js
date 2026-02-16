const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

let usuarioId = '';
let token = '';

describe('Testes do recurso /usuarios', () => {
    test('Deve criar um usuário e retornar status 201', async () => {
      const response = await request
        .post('/usuarios')
        .send({
          email: 'usuario@email.com',
          senha: 'abcd1234'
        })
        .set('Accept', 'application/json');
  
      expect(response.status).toBe(201);
      expect(response.headers['content-type']).toMatch(/json/);
  
      expect(response.body).toHaveProperty('_id');
      expect(response.body).toHaveProperty('email', 'usuario@email.com');
  
      usuarioId = response.body._id;
    });
  
    test('Deve retornar 422 ao tentar criar usuário sem dados', async () => {
      const response = await request
        .post('/usuarios')
        .send({})
        .set('Accept', 'application/json');
  
      expect(response.status).toBe(422);
      expect(response.headers['content-type']).toMatch(/json/);
  
      expect(response.body).toHaveProperty('msg', 'Email e Senha são obrigatórios');
    });
  
    test('Deve fazer login e retornar um token', async () => {
      const response = await request
        .post('/usuarios/login')
        .send({
          usuario: 'usuario@email.com',
          senha: 'abcd1234'
        })
        .set('Accept', 'application/json');
  
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toMatch(/json/);
  
      expect(response.body).toHaveProperty('token');
  
      token = response.body.token;
    });
  
    test('Deve retornar 401 ao tentar login sem credenciais', async () => {
      const response = await request
        .post('/usuarios/login')
        .send({})
        .set('Accept', 'application/json');
  
      expect(response.status).toBe(401);
      expect(response.headers['content-type']).toMatch(/json/);
  
      expect(response.body).toHaveProperty('msg', 'Credenciais inválidas');
    });
  
    test('Deve renovar o token com sucesso', async () => {
      const response = await request
        .post('/usuarios/renovar')
        .set('authorization', `Bearer ${token}`);
  
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toMatch(/json/);
  
      expect(response.body).toHaveProperty('token');
    });
  
    test('Deve retornar 401 com token inválido', async () => {
      const response = await request
        .post('/usuarios/renovar')
        .set('authorization', 'Bearer 123456789');
  
      expect(response.status).toBe(401);
      expect(response.headers['content-type']).toMatch(/json/);
  
      expect(response.body).toHaveProperty('msg', 'Token inválido');
    });
  
    test('Deve deletar o usuário pelo id', async () => {
      const response = await request
        .delete(`/usuarios/${usuarioId}`)
        .set('authorization', `Bearer ${token}`);
  
      expect(response.status).toBe(204);
    });
  
  });