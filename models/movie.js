'use strict';
module.exports = (sequelize, DataTypes) => {
  var Movie = sequelize.define('Movie', {
    id_movie: {
      primaryKey: true,
      type: DataTypes.INTEGER(),
      autoIncrement: true,
      },
    title_movie: DataTypes.STRING,
    release_date_movie: DataTypes.DATE,
    creation_date_movie: DataTypes.DATE,
    poster_movie: DataTypes.STRING,
    description_movie: DataTypes.STRING,
    original_title_movie: DataTypes.STRING,
    id_genre: DataTypes.INTEGER
  },{
    tableName: 'movies',
    createdAt: false,
    updatedAt: false
  });
  Movie.associate = function(models) {
    models.Movie.hasMany(models.Publish, { 
      as: 'publish',
      foreignKey: 'id_movie'
    })
    models.Movie.hasMany(models.User, { 
      as: 'users',
      foreignKey: 'id_user'
    })
    models.Movie.hasMany(models.Role, { 
      as: 'role',
      foreignKey: 'id_role'
    })
  };
  return Movie;
};
