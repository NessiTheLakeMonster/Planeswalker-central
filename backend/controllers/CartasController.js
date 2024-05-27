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
                carta: carta.card
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
        let cartas = await conx.getCartaByNombreES(req.body.name);

        if (cartas && Array.isArray(cartas)) {
            let cartasConId = cartas.map(carta => (
                {
                    id: carta.multiverseid,
                    nombre_en: carta.name,
                    nombre_es: carta.foreignNames.find(fn => fn.language === "Spanish").name,
                    foto_en: carta.imageUrl,
                    foto_es: carta.foreignNames.find(fn => fn.language === "Spanish").imageUrl
                })
            );

            res.json({
                ok: true,
                cartas: cartasConId
            });
        } else {
            res.status(404).json({
                ok: false,
                error: "Carta no encontrada"
            });
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error
        });
    }
}

const guardarCarta = async (req, res = response) => {
    let conx = new ConexionCartas();

    try {

        let repetida = await conx.checkCartaRepetida(req.body.id_api);

        if (repetida) {

            let carta = await conx.guardarCarta(req.body);

            if (carta) {
                res.json({
                    ok: true,
                    carta: carta
                });
            } else {
                res.status(400).json({
                    ok: false,
                    error: "No se pudo guardar la carta"
                });
            }
        } else {

            let carta = await conx.getCartaByIdLocal(req.body.id_api);

            res.status(400).json({
                ok: false,
                error: "Carta repetida",
                carta: carta
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
    getCartaById,
    getCartaByNombreES,
    guardarCarta
}
