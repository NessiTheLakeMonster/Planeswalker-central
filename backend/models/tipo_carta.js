'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tipo_carta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Un tipo de carta puede tener muchas cartas
      this.hasMany(models.Carta, {
        foreignKey: 'id_tipo_carta',
        as: 'cartas'
      });
    }
  }
  tipo_carta.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tipoCarta',
    tableName: 'tipo_carta'
  });
  return tipo_carta;
};