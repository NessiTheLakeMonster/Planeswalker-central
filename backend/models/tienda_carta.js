'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tienda_carta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Una carta esta en la tienda
      this.belongsTo(models.Carta, {
        foreignKey: 'id_carta',
        as: 'carta'
      });

      // Un vendedor tiene cartas en la tienda
      this.belongsTo(models.Usuario, {
        foreignKey: 'id_vendedor',
        as: 'vendedor'
      });

      // Una carta es comprada por un usuario
      this.hasOne(models.compraCarta, {
        foreignKey: 'id_tienda',
        as: 'compra'
      });
    }
  }
  tienda_carta.init({
    id_carta: DataTypes.INTEGER,
    id_vendedor: DataTypes.INTEGER,
    precio: DataTypes.INTEGER,
    estado: DataTypes.STRING,
    activa: DataTypes.INTEGER,
    comprada: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tiendaCarta',
    tableName: 'tienda_carta'
  });
  return tienda_carta;
};