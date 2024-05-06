'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class compra_carta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Un usuario puede comprar varias cartas
      this.belongsTo(models.Usuario, {
        foreignKey: 'id_comprador',
        as: 'comprador'
      });

      // Una tienda puede vender varias cartas
      this.belongsTo(models.tiendaCarta, {
        foreignKey: 'id_tienda',
        as: 'tienda'
      });
    }
  }
  compra_carta.init({
    id_comprador: DataTypes.INTEGER,
    id_tienda: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'compraCarta',
    tableName: 'compra_carta'
  });
  return compra_carta;
};