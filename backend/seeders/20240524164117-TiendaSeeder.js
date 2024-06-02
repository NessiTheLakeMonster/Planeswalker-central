'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tienda_carta', [
      {
        id_carta: 1,
        id_vendedor: 1,
        precio: 10,
        estado: 'Casi nueva',
        activa: 0,
        comprada: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_carta: 2,
        id_vendedor: 2,
        precio: 20,
        estado: 'Usada',
        activa: 0,
        comprada: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_carta: 3,
        id_vendedor: 3,
        precio: 30,
        estado: 'Nueva',
        activa: 0,
        comprada: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
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
