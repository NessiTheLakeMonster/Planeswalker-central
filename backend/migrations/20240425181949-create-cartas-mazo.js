'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cartas_mazos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_mazo: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'mazo'
          },
          key: 'id'
        }
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
    await queryInterface.dropTable('cartas_mazos');
  }
};