'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lista_deseos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Una carta puede estar en la lista de deseos de varios usuarios
      this.belongsTo(models.Carta, {
        foreignKey: 'id_carta',
        as: 'carta'
      });

      // Un usuario puede tener varias cartas en su lista de deseos
      this.belongsTo(models.Usuario, {
        foreignKey: 'id_usuario',
        as: 'usuario'
      });
    }
  }
  lista_deseos.init({
    id_carta: DataTypes.INTEGER,
    id_usuario: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'listaDeseos',
    tableName: 'lista_deseos'
  });
  return lista_deseos;
};