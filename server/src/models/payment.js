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
      Payment.belongsTo(models.Post, {
        foreignKey: 'postId',
        as: 'paidFor'
      })
      Payment.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'paidBy'
      })
    }
  }
  Payment.init({

    postId: DataTypes.STRING,
    userId: DataTypes.STRING,
    amount: DataTypes.INTEGER.UNSIGNED,   // in VND,  0 to 4,294,967,295
    // timestamp: DataTypes.DATETIME,

  }, {
    sequelize,
    modelName: 'Payment'
  });
  return Payment;
};