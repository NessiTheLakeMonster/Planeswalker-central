'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class noticia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Una noticia puede tener varias imágenes
      noticia.hasMany(models.imagenesNoticia,
        {
          foreignKey: 'id_noticia',
          as: 'imagenes'
        });

      // Una noticia pertenece a un tipo de noticia
      noticia.belongsTo(models.tipoNoticia,
        {
          foreignKey: 'id_tipo',
          as: 'tipo'
        });
    }
  }
  noticia.init({
    titulo: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    id_tipo: DataTypes.INTEGER,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Noticia',
    tableName: 'noticia'
  });
  return noticia;
};