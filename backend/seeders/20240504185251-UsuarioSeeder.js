'use strict';
const { generarUsuarios } = require('../factories/UsuarioFActory');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await generarUsuarios(7)

    await queryInterface.bulkInsert('usuario', users, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
