'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class imagenes_noticia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Una imagen de noticia pertenece a una noticia
      imagenes_noticia.belongsTo(models.Noticia,
        {
          foreignKey: 'id_noticia',
          as: 'noticia'
        });
    }
  }
  imagenes_noticia.init({
    id_noticia: DataTypes.INTEGER,
    imagen: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'imagenesNoticia',
    tableName: 'imagenes_noticia'
  });
  return imagenes_noticia;
};