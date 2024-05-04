'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class insignia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Una insignia puede tener varios usuarios asignados
      this.belongsToMany(models.Usuario, {
        through: models.insigniaUsuario,
        as: 'usuarios',
        foreignKey: 'id_insignia'
      });
    }
  }
  insignia.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    imagen: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Insignia',
    tableName: 'insignia'
  });
  return insignia;
};