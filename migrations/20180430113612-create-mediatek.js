'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Mediateks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_mediatek: {
        type: Sequelize.INTEGER
      },
      label_mediatek: {
        type: Sequelize.STRING
      },
      creation_date_mediatek: {
        type: Sequelize.DATE
      },
      modification_date_mediatek: {
        type: Sequelize.DATE
      },
      public_mediatek: {
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('Mediateks');
  }
};