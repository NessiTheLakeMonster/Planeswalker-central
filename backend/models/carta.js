'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class carta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Una carta pertenece a un tipo de carta
      this.belongsTo(models.TipoCarta, {
        foreignKey: 'id_tipo_carta',
        as: 'tipo_carta'
      });

      // Una carta puede estar en varios mazos
      this.belongsToMany(models.Mazo, {
        through: 'cartas_mazo',
        foreignKey: 'id_carta',
        as: 'mazos'
      });
    }
  }
  carta.init({
    nombre: DataTypes.STRING,
    id_tipo_carta: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Carta',
    tableName: 'carta'
  });
  return carta;
};