'use strict';
module.exports = (sequelize, DataTypes) => {
  var Nationality_People = sequelize.define('Nationality_People', {
    id_nationality_people: DataTypes.INTEGER,
    label_nationality_people: DataTypes.STRING
  }, {});
  Nationality_People.associate = function(models) {
    // associations can be defined here
  };
  return Nationality_People;
};