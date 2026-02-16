const mongoose = require('mongoose');
const Produto = require('../models/produtosModel');

async function criar(req, res) {
  try {
    const { nome, preco } = req.body;
    if (nome === undefined || preco === undefined) {
      return res.status(422).json({ msg: "Nome e preço do produto são obrigatórios" });
    }

    const novoProduto = await Produto.create({ nome, preco });
    return res.status(201).json({
      _id: novoProduto._id,
      nome: novoProduto.nome,
      preco: novoProduto.preco
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
}

async function listar(req, res) {
  const produtos = await Produto.find({});
  return res.json(produtos);
}

async function buscar(req, res, next) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "Parâmetro inválido" });
  }

  const produtoEncontrado = await Produto.findById(id);
  if (produtoEncontrado) {
    req.produto = produtoEncontrado;
    return next();
  }
  return res.status(404).json({ msg: "Produto não encontrado" });
}

function exibir(req, res) {
  const { _id, nome, preco } = req.produto;
  return res.json({ _id, nome, preco });
}

async function atualizar(req, res) {
  try {
    const { nome, preco } = req.body;
    if (nome === undefined || preco === undefined) {
      return res.status(422).json({ msg: "Nome e preço do produto são obrigatórios" });
    }

    const { id } = req.params;
    const produtoAtualizado = await Produto.findByIdAndUpdate(id, { nome, preco }, { new: true });
    return res.json({
      _id: produtoAtualizado._id,
      nome: produtoAtualizado.nome,
      preco: produtoAtualizado.preco
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
}

async function remover(req, res) {
  const { id } = req.params;
  await Produto.findByIdAndDelete(id);
  return res.status(204).end();
}

module.exports = {
  criar,
  listar,
  buscar,
  exibir,
  atualizar,
  remover
};
