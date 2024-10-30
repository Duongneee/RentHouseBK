// Auto generate by sequelize-cli, in pair with server/src/migrations/create-payment.js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    // TODO: relationship with Post, payments, etc.
    static associate(models) {
      // define association here
      Payment.belongsToMany(models.Post, { foreignKey: 'userId', as: 'posts' })
      Payment.hasMany(models.User, { foreignKey: 'userId', as: 'payments' })
    }
  }
  Payment.init({

    postId: DataTypes.STRING,
    userId: DataTypes.STRING,
    amount: DataTypes.INTEGER.UNSIGNED,   // in VND,  0 to 4,294,967,295
    timestamp: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Payment'
  });
  return Payment;
};