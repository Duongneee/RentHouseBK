// Auto generate by sequelize-cli, in pair with server/src/migrations/create-Transaction.js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    // TODO: relationship with  Transactions, etc.
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'id',
        as: 'transactions'
      })
    }
  }
  Transaction.init({

    transactionTrace: DataTypes.STRING,
    userId: DataTypes.STRING,
    amount: DataTypes.INTEGER.UNSIGNED,   // in VND,  0 to 4,294,967,295
    status: DataTypes.STRING,
    // timestamp: DataTypes.DATETIME,
    status: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Transaction'
  });
  return Transaction;
};