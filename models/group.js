'use strict';
module.exports = (sequelize, DataTypes) => {
  var Group = sequelize.define('Group', {
    id_group: DataTypes.INTEGER,
    label_group: DataTypes.STRING,
    avatar_link_group: DataTypes.STRING,
    creation_date_group: DataTypes.DATE,
    modification_date_group: DataTypes.DATE,
    public_group: DataTypes.BOOLEAN
  }, {});
  Group.associate = function(models) {
    // associations can be defined here
  };
  return Group;
};