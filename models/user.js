'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id_user: {
    primaryKey: true,
    type: DataTypes.INTEGER()
  },
    firstname_user: DataTypes.STRING(),
    surname_user: DataTypes.STRING(),
    password_user: DataTypes.STRING(),
    email_user: DataTypes.STRING(),
    avatar_link_user: DataTypes.STRING()
  }, 
  {
    tableName: 'users',
    createdAt: false,
    updatedAt: false
  });
  User.associate = function (models) {
    models.User.hasMany(models.Publish, {
      as: 'publish',
      foreignKey: 'id_user'
    });
    models.User.hasMany(models.User_Group,{
      as: 'users_group',
      foreignKey: 'id_user'
    });
    models.User.hasMany(models.Group,{
        as:'group',
        foreignKey: 'id_group'
    }),
    models.User.hasMany(models.Role,{
      as:'role',
      foreignKey: 'id_role'
  })
  models.User.hasMany(models.Movie,{
    as:'movie',
    foreignKey: 'id_movie'
})
  };
  return User;
};