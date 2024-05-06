const Conexion = require('./Conexion');
const model = require('../models/index');
const conx = new Conexion();

class ConexionRol {
    getRoles = async () => {
        conx.conectar();
        let roles;

        try {
            roles = await model.Rol.findAll();
        } catch (error) {
            console.error('Error en la consulta: ', error);
        } finally {
            conx.desconectar();
        }

        return roles;
    }

    getRol = async (id) => {
        conx.conectar();
        let rol;

        try {
            rol = await model.Rol.findOne({
                where: {
                    id: id
                }
            });
        } catch (error) {
            console.error('Error en la consulta: ', error);
        } finally {
            conx.desconectar();
        }

        return rol;
    }
}

module.exports = ConexionRol;