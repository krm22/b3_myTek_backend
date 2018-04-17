'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id_user: DataTypes.INTEGER,
    firstname_user: DataTypes.STRING,
    surname_user: DataTypes.STRING,
    password_user: DataTypes.STRING,
    email_user: DataTypes.STRING,
    _link_user: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};