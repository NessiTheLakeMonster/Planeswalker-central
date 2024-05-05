'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('compra_carta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_comprador: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'usuario'
          },
          key: 'id'
        }
      },
      id_tienda: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'tienda_carta'
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
    await queryInterface.dropTable('compra_carta');
  }
};