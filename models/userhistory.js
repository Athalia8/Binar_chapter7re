'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Userhistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Userhistory.init({
    UserId: DataTypes.INTERGER,
    level: DataTypes.INTERGER,
    hasil_kalah: DataTypes.STRING,
    hasil_menang: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Userhistory',
  });
  return Userhistory;
};