const Conexion = require('../database/Conexion');
const model = require('../models/index');
const conx = new Conexion();
const mtg = require('mtgsdk')

class ConexionPlanificadorMazos {
    checkCartaLegalFormat = async (idCartaAPI, formato) => {
        let resultado = 0;

        try {
            resultado = await mtg.card.find(idCartaAPI);

            for (let i = 0; i < resultado.card.legalities.length; i++) {
                if (resultado.card.legalities[i].format === formato && resultado.card.legalities[i].legality === 'Legal') {
                    resultado.card.legalities = resultado.card.legalities[i];
                    break;
                }
            }

            if (resultado.card.legalities.format === formato && resultado.card.legalities.legality === 'Legal') {
                resultado = true;
            } else {
                resultado = false;
            }

        } catch (error) {
            resultado = null;
        }

        return resultado;
    }
    filterbyColor = async (color) => {
        let resultado = 0;

        try {
            resultado = await mtg.card.where(
                {
                    colors: color
                });
        } catch (error) {
            resultado = null;
        }

        return resultado;
    }

    getCartasByType = async (numero, tipo) => {
        let resultado = [];

        try {
            const cartas = await mtg.card.where({ types: tipo });

            if (cartas && cartas.length > 0) {
                for (let i = 0; i < numero; i++) {
                    const randomCard = Math.floor(Math.random() * cartas.length);
                    resultado.push(cartas[randomCard]);
                }
            }
        } catch (error) {
            console.error(error);
        }

        return resultado;
    }

    getCMCByCard = async (id) => { // CMC = Coste de Maná Convertido
        let resultado = 0;

        try {
            resultado = await mtg.card.find(id);

            if (resultado) {
                resultado = resultado.card.cmc;
            } else {
                resultado = null;
            }
        } catch (error) {
            resultado = null;
        }

        return resultado;
    }

    postRecomendacionMazo = async (mazo) => {
        conx.conectar();
        let resultado = null;
        mazo.activo = 0;

        try {
            let mazoGuardado = await model.Mazo.create(mazo);

            if (mazoGuardado) {
                resultado = mazoGuardado;
            }

        } catch (error) {
            resultado = null;
        } finally {
            conx.desconectar();
        }

        return resultado;
    }

    addCartasMazo = async (idMazo, idCarta) => {
        conx.conectar();
        let resultado = null;

        try {

            let addCarta = await model.CartasMazo.create(
                {
                    id_mazo: idMazo,
                    id_carta: idCarta
                });

            if (addCarta) {
                resultado = addCarta;
            }

        } catch (error) {
            resultado = null;
        } finally {
            conx.desconectar();
        }

        return resultado;
    }
}

module.exports = ConexionPlanificadorMazos;