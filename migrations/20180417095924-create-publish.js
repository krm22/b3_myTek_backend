'use strict';
// Table intermedia 
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Publishes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date_publish: {
        type: Sequelize.DATE
      },
      id_movie: {
        type: Sequelize.INTEGER
      },
      id_mediatek: {
        type: Sequelize.INTEGER
      },
      id_user: {
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
    return queryInterface.dropTable('Publishes');
  }
};