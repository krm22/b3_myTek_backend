'use strict';
module.exports = (sequelize, DataTypes) => {
  var Watch = sequelize.define('Watch', {
    state_watch: DataTypes.BOOLEAN,
    title_writing: DataTypes.STRING,
    mark_writing: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    id_movie: DataTypes.INTEGER
  }, {});
  Watch.associate = function(models) {
    // associations can be defined here
  };
  return Watch;
};