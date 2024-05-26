'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('carta', [
      {
        id_api: 386616,
        nombre_es: 'Narset, maestra iluminada',
        nombre_en: 'Narset, Enlightened Master',
        foto_es: 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=389306&type=card',
        foto_en: 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=386616&type=card',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_api: 386627,
        nombre_es: 'Delta contaminado',
        nombre_en: 'Polluted Delta',
        foto_es: 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=389317&type=card',
        foto_en: 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=386627&type=card',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_api: 386717,
        nombre_es: 'Aspirante a nombre bélico',
        nombre_en: 'War-Name Aspirant',
        foto_es: 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=389407&type=card',
        foto_en: 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=386717&type=card',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_api: 386643,
        nombre_es: 'Desgarradora despiadada',
        nombre_en: 'Ruthless Ripper',
        foto_es: 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=389333&type=card',
        foto_en: 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=386643&type=card',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_api: 386533,
        nombre_es: 'Borrar',
        nombre_en: 'Erase',
        foto_es: 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=389223&type=card',
        foto_en: 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=386533&type=card',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
