const Conexion = require('../database/Conexion');
const model = require('../models/index');
const conx = new Conexion();

class ConexionMazos {
    getMazoById = async (id) => {
        conx.conectar();
        let resultado;

        try {
            let mazo = await model.Mazo.findOne(
                {
                    where: {
                        id: id
                    }
                });

            if (mazo) {
                resultado = mazo;
            }
        } catch (error) {
            resultado = null;
        } finally {
            conx.desconectar();
        }

        return resultado;
    }

    getMazoByUsuario = async (idUsuario) => {
        conx.conectar();
        let resultado;

        try {
            let mazo = await model.Mazo.findAll(
                {
                    where: {
                        id_usuario: idUsuario
                    }
                });

            if (mazo) {
                resultado = mazo;
            }
        } catch (error) {
            resultado = null;
        } finally {
            conx.desconectar();
        }

        return resultado;
    }

    guardarMazo = async (mazo) => {
        conx.conectar();
        let resultado;

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

}

module.exports = ConexionMazos;