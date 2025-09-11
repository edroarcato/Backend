// 1. importar o framework
const express = require("express")
// importar middleware de terceiros
const cors = require('cors');
const router = require('./router');

// 2. criar uma instância da aplicação
const app = express();

// middleware embutido ou integrado
app.use(express.json());
// ?paaram1=valor1&param2=valor2...
app.use(express.urlencoded({ extended: false }));

// middleware de terceiros
app.use(cors());

// middleware de aplicação
app.use((req, res, next) => {
   console.log("Passei pelo middleware de app");
   next();
});

// middleware de roteamento
const router = express.Router();

router.get('/', (req, res) => {
  res.send("Listar as tarefas")
});

router.post('/', (req, res) => {
  console.log(req.body);
  res.send(201).send("Tarefa criada com sucesso");
});

router.put('/:id', (req, res) => {
  const { id } = req.params; // desestruturando o objeto params
  if (id == 1) return res.send("Tarefa atualizada");
  res.status(404).send("Tarefa não encontrada");
});

router.delete('/:id', (req, res) => {
  const { id } = req.params; // desestruturando o objeto params
  if (id == 1) return res.status(204).end(); // sem conteúdo
  throw Error("Tarefa não encontrada");
});

app.use('/tarefas', router);

// Criar um middleware de roteamento
app.get('/', (req, res) =>{
  res.send("Olá");
});

// middleware de erro
app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

// 3. iniciar a aplicação em uma porta
app.listen(3000, () => {
    console.log("App está On!");
})