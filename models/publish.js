'use strict';
module.exports = (sequelize, DataTypes) => {
  var Publish = sequelize.define('Publish', {
    date_publish: {
    primaryKey: true,
    type: DataTypes.INTEGER()
    },
    id_movie: {
    primaryKey: true,
    type: DataTypes.INTEGER(),
    model: 'movies',
    key: 'id_movie'
    },
    id_mediatek: {
    primaryKey: true,
    type: DataTypes.INTEGER(),
    model: 'mediatek',
    key: 'id_mediatek'
    },
    id_user:
    { primaryKey: true,
    type: DataTypes.INTEGER(),
    model: 'movies',
    key: 'id_movie'
     }
   }, 
   {
    tableName: 'publish',
    createdAt: false,
    updatedAt: false  
  });
  Publish.associate = function(models) {
    
  };
  return Publish;
};