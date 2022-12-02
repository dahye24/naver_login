'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Navers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Navers.init({
    naverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    email: DataTypes.STRING,
    nick: DataTypes.STRING,
    snsId: DataTypes.STRING,
    provider: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Navers',
  });
  return Navers;
};