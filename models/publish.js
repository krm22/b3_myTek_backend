'use strict';
module.exports = (sequelize, DataTypes) => {
  var Publish = sequelize.define('Publish', {
    date_publish: DataTypes.DATE,
    id_movie: DataTypes.INTEGER,
    id_mediatek: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER
  }, {});
  Publish.associate = function(models) {
    // associations can be defined here
  };
  return Publish;
};