'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cartas_mazo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Una carta pertenece a un mazo
      this.belongsTo(models.Mazo, {
        foreignKey: 'id_mazo',
        as: 'mazo'
      });

      this.belongsTo(models.Carta, {
        foreignKey: 'id_carta',
        as: 'carta'
      });
    }
  }
  cartas_mazo.init({
    id_mazo: DataTypes.INTEGER,
    id_carta: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CartasMazo',
    tableName: 'cartas_mazo'
  });
  return cartas_mazo;
};