'use strict';
module.exports = (sequelize, DataTypes) => {
  var People = sequelize.define('People', {
    id_people: DataTypes.INTEGER,
    firstname_people: DataTypes.STRING,
    surname_people: DataTypes.STRING,
    id_nationality_people: DataTypes.INTEGER
  }, {});
  People.associate = function(models) {
    // associations can be defined here
  };
  return People;
};