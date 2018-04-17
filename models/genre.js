'use strict';
module.exports = (sequelize, DataTypes) => {
  var Genre = sequelize.define('Genre', {
    id_genre: DataTypes.INTEGER,
    label_genre: DataTypes.STRING
  }, {});
  Genre.associate = function(models) {
    // associations can be defined here
  };
  return Genre;
};