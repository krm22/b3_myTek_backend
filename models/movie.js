'use strict';
module.exports = (sequelize, DataTypes) => {
  var Movie = sequelize.define('Movie', {
    id_movie: DataTypes.INTEGER,
    title_movie: DataTypes.STRING,
    release_date_movie: DataTypes.DATE,
    creation_date_movie: DataTypes.DATE,
    poster_movie: DataTypes.STRING,
    description_movie: DataTypes.STRING,
    original_title_movie: DataTypes.STRING,
    id_genre: DataTypes.INTEGER
  }, {});
  Movie.associate = function(models) {
    // associations can be defined here
  };
  return Movie;
};