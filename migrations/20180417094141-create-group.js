'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Groups', {
      id_group: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      label_group: {
        type: Sequelize.STRING
      },
      avatar_link_group: {
        type: Sequelize.STRING
      },
      creation_date_group: {
        type: Sequelize.DATE
      },
      modification_date_group: {
        type: Sequelize.DATE
      },
      public_group: {
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
    return queryInterface.dropTable('Groups');
  }
};