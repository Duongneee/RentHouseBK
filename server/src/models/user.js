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
      // define association here, more info at https://sequelize.org/master/manual/assocs.html
      User.hasMany(models.Post, {
        foreignKey: 'userId',
        as: 'owner',
      })
      User.hasMany(models.Payment, {
        foreignKey: 'userId',
        as: 'payments',
      })
      User.hasMany(models.Transaction, {
        foreignKey: 'userId',
        as: 'transactions',
      })
    }
  }
  User.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    // zalo: DataTypes.STRING,
    // using phone nummer instead of zalo
    balance: DataTypes.INTEGER.UNSIGNED,   // in VND,  0 to 4,294,967,295

  }, {
    sequelize,
    modelName: 'User'
  });
  return User;
};