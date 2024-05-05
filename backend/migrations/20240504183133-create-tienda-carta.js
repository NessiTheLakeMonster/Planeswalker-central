'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tienda_carta', {
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
      id_vendedor: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'usuario'
          },
          key: 'id'
        }
      },
      precio: {
        type: Sequelize.INTEGER
      },
      estado: {
        type: Sequelize.STRING
      },
      activa: {
        type: Sequelize.INTEGER
      },
      comprada: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('tienda_carta');
  }
};