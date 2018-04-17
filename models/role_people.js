'use strict';
module.exports = (sequelize, DataTypes) => {
  var Role_People = sequelize.define('Role_People', {
    id_role_people: DataTypes.INTEGER,
    label_role_people: DataTypes.STRING
  }, {});
  Role_People.associate = function(models) {
    // associations can be defined here
  };
  return Role_People;
};