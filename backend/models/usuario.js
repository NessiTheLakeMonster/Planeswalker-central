'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Un usuario puede tener varios roles asignados
      this.belongsToMany(models.Rol, {
        through: models.rolesAsignados,
        foreignKey: 'id_usuario',
        as: 'roles'
      });

      // Un usuario puede tener varias insignias
      this.belongsToMany(models.Insignia, {
        through: models.insigniaUsuario,
        foreignKey: 'id_usuario',
        as: 'insignias'
      });

      // Un usuario puede tener varios mazos
      this.hasMany(models.Mazo, {
        foreignKey: 'id_usuario',
        as: 'mazos'
      });

      // Un usuario puede tener varias cartas en su lista de deseos
      this.belongsToMany(models.Carta, {
        through: models.listaDeseos,
        foreignKey: 'id_usuario',
        as: 'cartasDeseadas'
      });

      // Un usuario puede tener varias cartas a la venta
      this.hasMany(models.tiendaCarta, {
        foreignKey: 'id_vendedor',
        as: 'cartasVenta'
      });

      // Un usuario puede comprar varias cartas
      this.hasMany(models.compraCarta, {
        foreignKey: 'id_comprador',
        as: 'cartasCompradas'
      });
    }
  }
  usuario.init({
    nombre: DataTypes.STRING,
    apellidos: DataTypes.STRING,
    email: DataTypes.STRING,
    nick: DataTypes.STRING,
    password: DataTypes.STRING,
    puntos: DataTypes.INTEGER,
    foto_perfil: DataTypes.STRING,
    activo: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuario'
  });
  return usuario;
};