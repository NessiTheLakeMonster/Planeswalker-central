const { response } = require('express')
const ConexionUsuario = require('../database/ConexionUsuario')
const ConexionRolAsignado = require('../database/ConexionRolAsignado')

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

const getRolesUsuario = async (req, res = response) => {
    let conx = new ConexionRolAsignado();

    try {
        let roles = await conx.getRolesUsuario(req.params.id);
        res.json({
            ok: true,
            roles
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        });
    }
}

module.exports = {
    getUsuarios,
    getRolesUsuario
}