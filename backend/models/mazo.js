'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mazo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Un mazo pertenece a un usuario
      this.belongsTo(models.Usuario, {
        foreignKey: 'id_usuario',
        as: 'usuario'
      });

      // Un mazo puede tener varias cartas
      this.belongsToMany(models.Carta, {
        through: models.CartasMazo,
        foreignKey: 'id_mazo',
        as: 'cartas'
      });
    }
  }
  mazo.init({
    nombre: DataTypes.STRING,
    activo: DataTypes.INTEGER,
    id_usuario: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Mazo',
    tableName: 'mazo',
  });
  return mazo;
};