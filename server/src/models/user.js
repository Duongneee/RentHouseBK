// Auto generate by sequelize-cli, in pair with server/src/migrations/create-user.js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    // TODO: relationship with Post, payments, etc.
    static associate(models) {
      // define association here
      User.hasMany(models.Post, { foreignKey: 'userId', as: 'posts' })
    }
  }
  User.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    // zalo: DataTypes.STRING,
    // using phone nummer instead of zalo
    balance: DataTypes.FLOAT,

  }, {
    sequelize,
    modelName: 'User'
  });
  return User;
};