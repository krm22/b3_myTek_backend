'use strict';
module.exports = (sequelize, DataTypes) => {
  var Possess = sequelize.define('Possess', {
    id_role_people: DataTypes.INTEGER,
    id_people: DataTypes.INTEGER,
    id_movie: DataTypes.INTEGER
  }, {});
  Possess.associate = function(models) {
    // associations can be defined here
  };
  return Possess;
};