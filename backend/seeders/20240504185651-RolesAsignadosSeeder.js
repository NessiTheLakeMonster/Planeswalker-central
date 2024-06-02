'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let roles_usuario = []

    // Los usuarios tienen por defecto el rol de comprador
    for (let i = 1; i < 9; i++) {
      let rolusuario = {
        id_usuario: i,
        id_rol: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      roles_usuario.push(rolusuario)
    }

    // El usuario 1 y 2 tienes el rol de vendedor
    for (let i = 1; i < 2; i++) {
      let rolusuario = {
        id_usuario: i,
        id_rol: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      roles_usuario.push(rolusuario)
    }

    // El usuario 8 tiene el rol de admin, comprador y vendedor
    let rolAdmin = {
      id_usuario: 8,
      id_rol: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    roles_usuario.push(rolAdmin)

    let rolVendedor = {
      id_usuario: 8,
      id_rol: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    roles_usuario.push(rolVendedor)
    await queryInterface.bulkInsert('roles_asignados', roles_usuario, {});
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
