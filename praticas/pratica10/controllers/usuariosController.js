const { cifrarSenha, gerarToken, compararSenha } = require("../middlewares/authMiddleware.js");
const usuariosModel = require("../models/usersModel.js");

async function criar(req, res) {
    try {
        const senhaCifrada = await cifrarSenha(req.body.senha);

        const novoUsuario = await usuariosModel.create({
            email: req.body.email,
            senha: senhaCifrada
        });

        return res.status(201).json({
            _id: novoUsuario._id,
            email: novoUsuario.email
        });
    } catch (error) {
        return res.status(422).json({ msg: "Email e Senha são obrigatórios" });
    }
}

async function entrar(req, res) {
    try {
        const usuarioEncontrado = await usuariosModel.findOne({
            email: req.body.usuario
        });

        if (usuarioEncontrado) {
            const senhaCorreta = compararSenha(
                req.body.senha,
                usuarioEncontrado.senha
            );

            console.log(senhaCorreta)

            if (senhaCorreta) {
                const token = gerarToken({ email: req.body.usuario });

                return res.status(200).json({ token });
            }
        }

        return res.status(401).json({ msg: "Credenciais inválidas" });

    } catch (error) {
        console.log(error)
        return res.status(401).json({ msg: "Credenciais inválidas" });
    }
}

async function renovar(req, res) {
    try {
        const token = gerarToken({ email: req.usuario });

        return res.status(200).json({ token });
    } catch (error) {
        return res.status(401).json({ msg: "Erro ao renovar token" });
    }
}

async function remover(req, res) {
    try {
        await usuariosModel.findOneAndDelete({ _id: req.params.id });
        return res.status(204).send();
    } catch (error) {
        return res.status(400).json({ msg: "Erro ao remover usuário" });
    }
}

module.exports = { criar, entrar, renovar, remover };