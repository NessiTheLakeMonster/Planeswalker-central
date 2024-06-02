'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('lista_deseos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_carta: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'carta'
          },
          key: 'id'
        }
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'usuario'
          },
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('lista_deseos');
  }
};