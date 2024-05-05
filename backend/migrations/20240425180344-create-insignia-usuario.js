'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('insignia_usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_insignia: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'insignia'
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
    await queryInterface.dropTable('insignia_usuarios');
  }
};