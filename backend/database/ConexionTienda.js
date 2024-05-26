const Conexion = require('../database/Conexion');
const model = require('../models/index');
const conx = new Conexion();

class ConexionTienda {
    postTienda = async (body) => {
        conx.conectar();
        let resultado = 0;

        body.activa = 0;
        body.comprada = 0;

        try {
            let carta = await model.tiendaCarta.create(body);

            if (carta) {
                resultado = 1;
            } else {
                resultado = 0;
            }
        } catch (error) {
            resultado = null;
        } finally {
            conx.desconectar();
        }

        return resultado;
    }

    getTienda = async () => {
        conx.conectar();
        let resultado;

        try {
            resultado = await model.tiendaCarta.findAll(
                {
                    include: [{
                        model: model.Carta,
                        as: "carta",
                        attributes: ["id_api", "nombre_es", "nombre_en", "foto_es", "foto_en"]
                    }, {
                        model: model.Usuario,
                        as: "vendedor",
                        attributes: ["nombre", "apellidos", "nick"]
                    }]
                },
                {
                    where: {
                        activa: 0,
                        comprada: 0
                    }
                });
        } catch (error) {
            throw error;
        } finally {
            conx.desconectar();
        }

        return resultado;
    }

    getTiendaById = async (id) => {
        conx.conectar();
        let resultado;

        try {
            resultado = await model.tiendaCarta.findByPk(id,
                {
                    include: [{
                        model: model.Carta,
                        as: "carta",
                        attributes: ["id_api", "nombre_es", "nombre_en", "foto_es", "foto_en"]
                    }, {
                        model: model.Usuario,
                        as: "vendedor",
                        attributes: ["nombre", "apellidos", "nick"]
                    }]
                });
        } catch (error) {
            throw error;
        } finally {
            conx.desconectar();
        }

        return resultado;
    }
}

module.exports = ConexionTienda