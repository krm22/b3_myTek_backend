'use strict';
module.exports = (sequelize, DataTypes) => {
  var User_Group = sequelize.define('User_Group', {
    id_user: DataTypes.INTEGER,
    id_group: DataTypes.INTEGER,
    id_role: DataTypes.INTEGER
  }, {});
  User_Group.associate = function(models) {
    // associations can be defined here
  };
  return User_Group;
};