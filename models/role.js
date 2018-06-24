'use strict';
module.exports = (sequelize, DataTypes) => {
  var Role = sequelize.define('Role', {
    id_role: {
      primaryKey: true,
      type: DataTypes.INTEGER(),
      autoIncrement: true,
    },
    label_role: DataTypes.STRING
  },
  {
    tableName: 'role',
    createdAt: false,
    updatedAt: false,
  });
  Role.associate = function (models) {
    models.Role.hasMany(models.User_Group, { 
      as: 'users_group',
      foreignKey: 'id_role'
    }),
    models.Role.hasMany(models.Group, { 
      as: 'group',
      foreignKey: 'id_group'
    }),
    models.Role.hasMany(models.User, { 
      as: 'user',
      foreignKey: 'id_user'
    }),
    models.Role.hasMany(models.Movie, { 
      as: 'movie',
      foreignKey: 'id_movie'
    })
  };
  return Role;
};