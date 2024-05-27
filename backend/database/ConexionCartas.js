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

    getCartaByNombreES = async (name) => {
        let resultado = 0;

        try {
            resultado = await mtg.card.where({ name: name, language: 'spanish' });
        } catch (error) {
            resultado = null;
        }

        return resultado;
    }

    guardarCarta = async (carta) => {
        conx.conectar();
        let resultado = null;

        try {
            let cartaGuardada = await model.Carta.create(carta);

            if (cartaGuardada) {
                resultado = cartaGuardada;
            }

        } catch (error) {
            resultado = null;
        } finally {
            conx.desconectar();
        }

        return resultado;
    }

    checkCartaRepetida = async (id) => {
        conx.conectar();
        let resultado = null;

        try {
            let carta = await model.Carta.findOne({ where: { id_api: id } });

            if (carta) {
                resultado = false;
            } else {
                resultado = true;
            }

        } catch (error) {
            resultado = null;
        } finally {
            conx.desconectar();
        }

        return resultado;
    }

    getCartaByIdLocal = async (id) => {
        conx.conectar();
        let resultado = null;

        try {
            let carta = await model.Carta.findOne({ where: { id_api: id } });

            if (carta) {
                resultado = carta;
            }

        } catch (error) {
            resultado = null;
        } finally {
            conx.desconectar();
        }

        return resultado;
    }

    checkFormatosJugables = async (id) => {
    }
}

module.exports = ConexionCartas