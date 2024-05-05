'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roles_asignados extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Un rol puede tener varios usuarios asignados
      roles_asignados.belongsTo(models.rol, {
        foreignKey: 'id_rol'
      });

      // Un usuario puede tener varios roles asignados
      roles_asignados.belongsTo(models.usuario, {
        foreignKey: 'id_usuario'
      });
    }
  }
  roles_asignados.init({
    id_rol: DataTypes.INTEGER,
    id_usuario: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'rolesAsignados',
    tableName: 'roles_asignados'
  });
  return roles_asignados;
};