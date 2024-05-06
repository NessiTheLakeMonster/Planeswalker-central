const Conexion = require('./Conexion');
const model = require('../models/index');
const bycrypt = require('bcrypt');
const { Sequelize } = require('sequelize');
const conx = new Conexion();

class ConexionUsuario {
    getUsuarios = async () => {
        conx.conectar();
        let usuarios;

        try {
            usuarios = await model.Usuario.findAll({
                where: {
                    activo: 0
                }
            });
        } catch (error) {
            console.error('Error en la consulta: ', error);
        } finally {
            conx.desconectar();
        }

        return usuarios;
    }

    registroUsuario = async (usuario) => {
        conx.conectar();
        let resultado = 0;
        usuario.password = await bycrypt.hash(usuario.password, 10);

        try {
            const newUsuario = await model.Usuario.create(usuario);

            // Cuando se crea un usuario, se le asigna el rol basico por defecto
            const rolAsignado = await model.rolesAsignados.create({
                id_rol: 3,
                id_usuario: newUsuario.id
            });

            resultado = 1;
        } catch (error) {
            resultado = null;
        } finally {
            conx.desconectar();
        }

        return resultado;
    }

    loginUsuario = async (email, password) => {
        conx.conectar();
        let resultado = 0;

        try {
            resultado = await model.Usuario.findOne({
                where: {
                    email: email,
                    activo: 0
                }
            });

            if (!resultado) {
                return null;
            }

            let passwdCorrecta = await bycrypt.compare(password, resultado.password);
            if (!passwdCorrecta) {
                return null;
            }
        } catch (error) {
            resultado = null;
        } finally {
            conx.desconectar();
        }

        return resultado;
    }
}

module.exports = ConexionUsuario;