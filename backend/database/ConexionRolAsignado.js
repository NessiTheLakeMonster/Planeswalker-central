const Conexion = require('./Conexion');
const model = require('../models/index');
const conx = new Conexion();

class ConexionRolAsignado {
    getRolesUsuario = async (id) => {
        conx.conectar();
        let roles;
        try {
            const usuario = await model.Usuario.findOne({
                where: {
                    id: id
                },
                include: [{
                    model: model.Rol,
                    as: 'roles',
                    through: {
                        model: model.RolAsignado,
                        attributes: []
                    },
                    attributes: ['nombre']
                }],
                attributes: []
            });

            roles = usuario.roles.map(rol => rol.nombre);
        } catch (error) {
            console.error('Error en la consulta: ', error);
        } finally {
            conx.desconectar();
        }
        return roles;
    }
}

module.exports = ConexionRolAsignado;