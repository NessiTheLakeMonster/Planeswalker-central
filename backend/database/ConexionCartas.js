const Conexion = require('../database/Conexion');
const model = require('../models/index');
const conx = new Conexion();
const mtg = require('mtgsdk')

class ConexionCartas {
    getCartaById = async (id) => {
        let resultado = 0;

        try {
            resultado = await mtg.card.find(id);
        } catch (error) {
            resultado = null;
        }

        return resultado;
    }

    getCartaByNombre = async (name) => {
        let resultado = 0;

        try {
            resultado = await mtg.card.where({ name: name, language: 'spanish'});
            console.log(name);
        } catch (error) {
            resultado = null;
        }

        return resultado;
    }
}

module.exports = ConexionCartas