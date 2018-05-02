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
  };
  return User;
};