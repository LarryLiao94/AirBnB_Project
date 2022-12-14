'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Trip.belongsTo(
        models.User,
        {
          foreignKey: 'userId'
        }
      );
      Trip.belongsTo(
        models.Spot,
        {
          foreignKey: 'spotId'
        }
      );
    }
  }
  Trip.init({
    spotId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Spot',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Trip',
  });
  return Trip;
};