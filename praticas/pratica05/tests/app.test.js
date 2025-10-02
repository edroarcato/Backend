const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

let tarefaId;

describe('API REST /tarefas', () => {
  test('GET /tarefas deve retornar status 200 e JSON', async () => {
    const res = await request.get('/tarefas');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
  });

  test('POST /tarefas deve retornar 201 e JSON', async () => {
    const res = await request
      .post('/tarefas')
      .send({ nome: 'Estudar Node', concluida: false });
    expect(res.status).toBe(201);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('id');
    tarefaId = res.body.id;
  });

  test('GET /tarefas/:id deve retornar 200 e JSON', async () => {
    const res = await request.get(`/tarefas/${tarefaId}`);
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
  });

  test('GET /tarefas/1 deve retornar 404 se tarefa não existir', async () => {
    const res = await request.get('/tarefas/1');
    expect(res.status).toBe(404);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('msg', 'Tarefa não encontrada');
  });

  test('PUT /tarefas/:id deve retornar 200 e JSON após atualização', async () => {
    const res = await request
      .put(`/tarefas/${tarefaId}`)
      .send({ nome: 'Estudar Node e Express', concluida: true });
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
  });

  test('PUT /tarefas/1 deve retornar 404 se tarefa não existir', async () => {
    const res = await request
      .put('/tarefas/1')
      .send({ nome: 'Qualquer coisa', concluida: false });
    expect(res.status).toBe(404);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('msg', 'Tarefa não encontrada');
  });

  test('DELETE /tarefas/:id deve retornar 204 e sem conteúdo', async () => {
    const res = await request.delete(`/tarefas/${tarefaId}`);
    expect(res.status).toBe(204);
    expect(res.body).toEqual({});
  });

  test('DELETE /tarefas/1 deve retornar 404 se tarefa não existir', async () => {
    const res = await request.delete('/tarefas/1');
    expect(res.status).toBe(404);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('msg', 'Tarefa não encontrada');
  });
});
