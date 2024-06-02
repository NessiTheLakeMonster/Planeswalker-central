const { response } = require('express')
const ConexionMazos = require('../database/ConexionMazos')

const getMazoById = async (req, res = response) => {
    let conx = new ConexionMazos();

    try {
        let mazo = await conx.getMazoById(req.params.id);
        res.json({
            ok: true,
            mazo
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        });
    }
}

const getMazoByUsuario = async (req, res = response) => {
    let conx = new ConexionMazos();

    try {
        let mazos = await conx.getMazoByUsuario(req.params.id);
        res.json({
            ok: true,
            mazos
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        });
    }
}

getCartasInMazo = async (req, res = response) => {
    let conx = new ConexionMazos();

    try {
        let cartas = await conx.getCartasInMazo(req.params.id);
        res.json({
            ok: true,
            cartas
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        });
    }
}


module.exports = {
    getMazoById,
    getMazoByUsuario,
    getCartasInMazo
}