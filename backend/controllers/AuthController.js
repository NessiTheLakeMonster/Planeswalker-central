const { response } = require('express')
const ConexionUsuario = require('../database/ConexionUsuario')
const ConexionRolAsignado = require('../database/ConexionRolAsignado')
const { generarJWT } = require('../helpers/generate_jwt');
const bcrypt = require('bcrypt');

const registro = async (req, res = response) => {
    const conx = new ConexionUsuario();
    const body = req.body;

    conx.registroUsuario(body)
        .then(usuario => {
            res.status(200).json({
                ok: true,
                msg: 'Usuario registrado correctamente',
                "usuario": usuario
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
    const conxRol = new ConexionRolAsignado();
    const usuario = await conx.loginUsuario(req.body.email, req.body.password);

    console.log(usuario, req.body.email, req.body.password);

    if (!usuario) {
        return res.status(400).json({
            ok: false,
            msg: 'Usuario o contraseña incorrectos'
        });
    }

    console.log(res);

    const roles = await conxRol.getRolesUsuario(usuario.id);
    const token = await generarJWT(usuario.id, roles, usuario.nombre);

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