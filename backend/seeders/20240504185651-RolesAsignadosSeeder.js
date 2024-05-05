'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let roles_usuario = []
    for (let i = 1; i < 9; i++) {
      let rolusuario = {
        id_usuario: i,
        id_rol: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      roles_usuario.push(rolusuario)
    }
    let rolAdmin = {
      id_usuario: 8,
      id_rol: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    roles_usuario.push(rolAdmin)
    await queryInterface.bulkInsert('roles_asignados', roles_usuario, {});
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
