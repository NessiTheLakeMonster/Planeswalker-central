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
                imageUrl: carta.card.imageUrl
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
                    nombre: carta.name,
                    nombreES: carta.foreignNames.find(fn => fn.language === "Spanish").name
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

const getCartaByNombreEN = async (req, res = response) => {
    let conx = new ConexionCartas();

    try {
        let cartas = await conx.getCartaByNombreEN(req.body.name);
        console.log(cartas);

        if (cartas && Array.isArray(cartas)) {
            // Mapea el array de cartas para extraer solo los nombres
            let nombres = cartas.map(carta => carta.name);
            let id = cartas.map(carta => carta.multiverseid);

            res.json({
                ok: true,
                id: id,
                nombres: nombres
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
            error : error
        });

        console.log(error);
    }
}

module.exports = {
    getCartaById,
    getCartaByNombreES,
    getCartaByNombreEN
}
