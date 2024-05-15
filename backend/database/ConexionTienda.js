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
}

module.exports = ConexionTienda