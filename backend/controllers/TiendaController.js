const { response } = require('express')
const ConexionTienda = require('../database/ConexionTienda')

const postTienda = async (req, res = response) => {
    let conx = new ConexionTienda();

    try {
        let resultado = await conx.postTienda(req.body);
        console.log(req.body);

        if (resultado) {
            res.json({
                ok: true,
                resultado
            });
        } else {
            res.status(400).json({
                ok: false,
                error: "No se pudo insertar la carta"
            });
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        });
    }
}

const getTienda = async (req, res = response) => {
    let conx = new ConexionTienda();

    try {
        let articulos = await conx.getTienda();

        if (articulos) {
            res.json({
                ok: true,
                articulos
            });
        } else {
            res.status(400).json({
                ok: false,
                error: "No se pudo obtener la tienda"
            });
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        });
    }
}

module.exports = {
    postTienda,
    getTienda
}
