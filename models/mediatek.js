'use strict';
module.exports = (sequelize, DataTypes) => {
  var Mediatek = sequelize.define('Mediatek', {
    id_mediatek: {
      primaryKey: true,
      type: DataTypes.INTEGER(),
      autoIncrement: true,
    },
    label_mediatek: DataTypes.STRING,
    creation_date_mediatek: DataTypes.DATE,
    modification_date_mediatek: DataTypes.DATE,
    public_mediatek: DataTypes.BOOLEAN
  }, {
    tableName: 'mediateks',
    createdAt: false,
    updatedAt: false  
  });
  Mediatek.associate = function(models) {
    models.Mediatek.hasMany(models.Publish, {
      as: 'publish',
      foreignKey: 'id_mediatek'
    });
  };
  return Mediatek;
};