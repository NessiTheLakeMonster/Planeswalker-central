'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Un rol puede tener varios roles asignados
      this.belongsToMany(models.Usuario, {
        through: models.rolesAsignados,
        foreignKey: 'id_rol',
        as: 'users'
      });
    }
  }
  rol.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Rol',
    tableName: 'rol'
  });
  return rol;
};