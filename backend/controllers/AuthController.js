const { response } = require('express')
const ConexionUsuario = require('../database/ConexionUsuario')
const ConexionRol = require('../database/ConexionRol')
const { generarJWT } = require('../helpers/generate_jwt');

const cifrarPasswd = async (password) => {
    return bcrypt.hash(password, 10);
}

const registro = async (req, res = response) => {
    const conx = new ConexionUsuario();
    const body = req.body;
    body.password = await cifrarPasswd(body.password);

    conx.registroUsuario(body)
        .then(usuario => {
            res.status(200).json({
                ok: true,
                usuario
            });
        })
        .catch(error => {
            res.status(400).json({
                ok: false,
                msg: 'Error al registrar usuario'
            });
        });
}

const login = async (req, res = response) => {
    const conx = new ConexionUsuario();
    const usuario = await conx.loginUsuario(req.body.email, req.body.password);

    if (!usuario) {
        return res.status(400).json({
            ok: false,
            msg: 'Usuario o contraseña incorrectos'
        });
    }

    const token = await generarJWT(usuario.id, usuario.nombre);
    res.status(200).json({
        ok: true,
        "usuario": usuario,
        "token": token
    });
}

module.exports = {
    registro,
    login
}