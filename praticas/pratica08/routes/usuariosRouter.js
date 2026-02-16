const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post("/login", (req, res) => {
  const { usuario } = req.body;
  const token = authMiddleware.gerarToken({ email: usuario });
  return res.status(200).json({ token });
});

router.post("/renovar", authMiddleware.verificarToken, (req, res) => {
  const novoToken = authMiddleware.gerarToken({ email: req.usuario.email });
  return res.status(200).json({ token: novoToken });
});

module.exports = router;
