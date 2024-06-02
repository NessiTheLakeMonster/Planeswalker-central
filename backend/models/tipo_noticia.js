'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tipo_noticia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Un tipo de noticia puede tener varias noticias
      tipo_noticia.hasMany(models.Noticia,
        {
          foreignKey: 'id_tipo',
          as: 'noticias'
        });
    }
  }
  tipo_noticia.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tipoNoticia',
    tableName: 'tipo_noticia'
  });
  return tipo_noticia;
};