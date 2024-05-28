const Conexion = require('./Conexion');
const model = require('../models/index');
const bcrypt = require('bcrypt');
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
        usuario.password = await bcrypt.hash(usuario.password, 10);
        usuario.activo = 0;
        usuario.puntos = 0;
        usuario.foto_perfil = 'foto_perfil_defecto.jpg';

        try {
            const newUsuario = await model.Usuario.create(usuario);

            // Cuando se crea un usuario, se le asigna el rol basico por defecto
            await model.rolesAsignados.create({
                id_rol: 3,
                id_usuario: newUsuario.id
            });

            resultado = newUsuario;
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
                resultado = null;
            }

            let passwdCorrecta = await bcrypt.compare(password, resultado.password);

            if (!passwdCorrecta) {
                resultado = null;
            }
        } catch (error) {
            resultado = null;
        } finally {
            conx.desconectar();
        }

        return resultado;
    }

    emailExisteValidator = async (email) => {
        let resultado = [];
        this.con.conectar();

        resultado = await models.Usuario.findAll({
            where: {
                email: email
            }
        });

        this.con.desconectar();
        if (!resultado) {
            throw error;
        }
    }
}

module.exports = ConexionUsuario;