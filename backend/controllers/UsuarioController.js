const { response } = require('express')
const ConexionUsuario = require('../database/ConexionUsuario')

const getUsuarios = async (req, res = response) => {
    let conx = new ConexionUsuario();

    try {
        let usuarios = await conx.getUsuarios();
        res.json({
            ok: true,
            usuarios
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        });
    }
}

module.exports = {
    getUsuarios
}