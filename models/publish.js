'use strict';
module.exports = (sequelize, DataTypes) => {
  var Publish = sequelize.define('Publish', {
    date_publish: {
    type: DataTypes.INTEGER()
    },
    id_movie: {
    primaryKey: true,
    type: DataTypes.INTEGER(),
    key: 'id_movie'
    },
    id_mediatek: {
    primaryKey: true,
    type: DataTypes.INTEGER(),
    key: 'id_mediatek'
    },
    id_user:
    { primaryKey: true,
    type: DataTypes.INTEGER(),
    key: 'id_user'
     }
   }, 
   {
    tableName: 'publish',
    createdAt: false,
    updatedAt: false  
  });
  Publish.associate = function(models) {
    models.Publish.belongsTo(models.Movie, { 
      as: 'movie',
      foreignKey: 'id_movie'
    }),
    models.Publish.belongsTo(models.User, { 
      as: 'user',
      foreignKey: 'id_user'
    }),
    models.Publish.belongsTo(models.Mediatek, { 
      as: 'mediatek',
      foreignKey: 'id_mediatek'
    })
    models.Publish.belongsTo(models.User_Group, { 
      as: 'users_group',
      foreignKey: 'id_user'
    })
  };
  return Publish;
};