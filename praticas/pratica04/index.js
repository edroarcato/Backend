const express = require('express');
const tarefas = [  
  { id: 1, nome: "Estudar middleware", concluida: false },  
  { id: 2, nome: "Praticar Express", concluida: true }  
];

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  const agora = new Date().toISOString();
  console.log(`[${agora}] ${req.method} ${req.url}`);
  next();
});

const tarefasRouter = express.Router();

tarefasRouter.get('/', (req, res) => {
  res.json(tarefas);
});

tarefasRouter.post('/', (req, res) => {
  const id = tarefas.length ? tarefas[tarefas.length - 1].id + 1 : 1;
  tarefas.push({ id, nome: req.body.nome, concluida: req.body.concluida || false });
  res.status(201).json(tarefas[tarefas.length - 1]);
});

tarefasRouter.get('/:id', (req, res, next) => {
  const t = tarefas.find(t => t.id === +req.params.id);
  if (!t) {
    const err = new Error('Tarefa não localizada');
    err.status = 404;
    return next(err);
  }
  res.json(t);
});

tarefasRouter.put('/:id', (req, res, next) => {
  const t = tarefas.find(t => t.id == req.params.id);
  if (!t) {
    const err = new Error('Tarefa não localizada');
    err.status = 404;
    return next(err);
  }
  for (let k in req.body) t[k] = req.body[k];
  res.json(t);
});

tarefasRouter.delete('/:id', (req, res, next) => {
  const i = tarefas.findIndex(t => t.id == req.params.id);
  if (i === -1) {
    const err = new Error('Tarefa não localizada');
    err.status = 404;
    return next(err);
  }
  tarefas.splice(i, 1);
  res.status(204).end();
});

app.use('/tarefas', tarefasRouter);

app.get('/', (req, res) => {
  res.send('API está rodando');
});

app.use((err, req, res, next) => {
  if (['GET', 'PUT', 'DELETE'].includes(req.method)) {
    return res.status(400).json({ erro: err.message });
  }
  res.status(err.status || 500).json({ erro: err.message || 'Erro interno' });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

module.exports = app;
