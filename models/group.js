'use strict';
module.exports = (sequelize, DataTypes) => {
  var Group = sequelize.define('Group', {
    id_group: {
      primaryKey: true,
      type: DataTypes.INTEGER(),
      autoIncrement: true,
    },
    label_group: DataTypes.STRING,
    avatar_link_group: DataTypes.STRING,
    creation_date_group: DataTypes.DATE,
    modification_date_group: DataTypes.DATE,
    public_group: DataTypes.BOOLEAN
  }, {
    tableName: 'groups',
    createdAt: false,
    updatedAt: false
  });
  Group.associate = function (models) {
    models.Group.hasMany(models.User_Group, {
      as: 'users_group',
      foreignKey: 'id_group'
    }),
    models.Group.hasMany(models.User, {
        as:'user',
        foreignKey: 'id_user'
    }),
    models.Group.hasMany(models.Role, {
      as:'role',
      foreignKey: 'id_role'
  })
  }
  return Group;
};