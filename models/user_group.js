'use strict';
module.exports = (sequelize, DataTypes) => {
  var User_Group = sequelize.define('User_Group', {
    id_user: {
      primaryKey: true,
      type: DataTypes.INTEGER(),
      key: 'id_user'
      },
    id_group: {
      primaryKey: true,
      type: DataTypes.INTEGER(),
      key: 'id_group'
      },
    id_role: {
      primaryKey: true,
      type: DataTypes.INTEGER(),
      key: 'id_role'
      },
  },{
    tableName: 'users_group',
    createdAt: false,
    updatedAt: false
  });
User_Group.associate = function(models) {
    models.User_Group.belongsTo(models.User,{ 
      as: 'user',
      foreignKey: 'id_user'
    }),
    models.User_Group.belongsTo(models.Group,{ 
      as: 'group',
      foreignKey: 'id_group'
    }),
    models.User_Group.belongsTo(models.Role,{ 
      as: 'role',
      foreignKey: 'id_role'
    })
  };
  return User_Group;
};