const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ msg: "Não autorizado" });
        }

        const usuario = jwt.verify(token, process.env.JWT_SEGREDO);
        req.usuario = usuario;

        return next();
    } catch (err) {
        return res.status(401).json({ msg: "Token inválido" });
    }
}

function gerarToken(payload) {
    try {
        const expiresIn = 120;
        const token = jwt.sign(payload, process.env.JWT_SEGREDO, { expiresIn });
        return token;
    } catch (err) {
        throw new Error("Erro ao gerar o token");
    }
}

module.exports = { verificarToken, gerarToken };
