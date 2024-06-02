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
      // Una carta puede estar en varios mazos
      this.belongsToMany(models.Mazo, {
        through: models.CartasMazo,
        foreignKey: 'id_carta',
        as: 'mazos'
      });

      // Una carta esta en la tienda
      this.hasOne(models.tiendaCarta, {
        foreignKey: 'id_carta',
        as: 'tienda'
      });
    }
  }
  carta.init({
    id_api: DataTypes.INTEGER,
    nombre_es: DataTypes.STRING,
    nombre_en: DataTypes.STRING,
    foto_es: DataTypes.STRING,
    foto_en: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Carta',
    tableName: 'carta'
  });
  return carta;
};