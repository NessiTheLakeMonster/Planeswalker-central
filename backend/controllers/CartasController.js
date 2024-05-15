const { response } = require('express')
const ConexionCartas = require('../database/ConexionCartas');
const { body } = require('express-validator');

const getCartaById = async (req, res = response) => {
    let conx = new ConexionCartas();

    try {
        let carta = await conx.getCartaById(req.params.id);
        let cartaES = carta.card.foreignNames.find(fn => fn.language === "Spanish");

        if (cartaES) {
            res.json({
                ok: true,
                id: carta.card.multiverseid,
                nameES: cartaES,
                name: carta.card.name,
            });
        } else {
            res.status(404).json({
                ok: false,
                error: "Nombre en español no encontrado"
            });
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        });
    }
}


const getCartaByNombreES = async (req, res = response) => {
    let conx = new ConexionCartas();

    try {
        let carta = await conx.getCartaByNombre(req.body.name);
        console.log(carta);
        if (carta) {

            res.json({
                ok: true,
                id: carta[0].multiverseid,
                nombre: carta[0].name,
            });
        } else {
            res.status(404).json({
                ok: false,
                error: "Carta no encontrada"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            error : error
        });
        
    }
}

module.exports = {
    getCartaById,
    getCartaByNombreES
}
