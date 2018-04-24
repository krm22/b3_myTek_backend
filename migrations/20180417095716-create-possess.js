'use strict';

// Table de intermedia
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Possesses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_role_people: {
        type: Sequelize.INTEGER
      },
      id_people: {
        type: Sequelize.INTEGER
      },
      id_movie: {
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Possesses');
  }
};