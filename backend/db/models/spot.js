'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(
        models.User,
        {
          foreignKey: 'ownerId',
          as: 'Owner',
          onDelete: "CASCADE",
        }
      );
      Spot.hasMany(
        models.Trip,
        {
          foreignKey: 'spotId',
          onDelete: "CASCADE",
        }
      );
      Spot.hasMany(
        models.Image,
        {
          foreignKey: 'imageableId',
          constraints: false,
          as: 'Images',
          onDelete: 'CASCADE',
        }
      );
      Spot.hasMany(models.Review, {
        foreignKey: 'spotId',
        onDelete: "CASCADE",
      })
    }
  }
  Spot.init({
    ownerId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.FLOAT,
    previewImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};