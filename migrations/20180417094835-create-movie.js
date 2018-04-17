'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_movie: {
        type: Sequelize.INTEGER
      },
      title_movie: {
        type: Sequelize.STRING
      },
      release_date_movie: {
        type: Sequelize.DATE
      },
      creation_date_movie: {
        type: Sequelize.DATE
      },
      poster_movie: {
        type: Sequelize.STRING
      },
      description_movie: {
        type: Sequelize.STRING
      },
      original_title_movie: {
        type: Sequelize.STRING
      },
      id_genre: {
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
    return queryInterface.dropTable('Movies');
  }
};