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
        onDelete: 'CASCADE'
      })
      User.hasMany(models.Payment, {
        foreignKey: 'userId',
        as: 'payments',
      })
      User.hasMany(models.Transaction, {
        foreignKey: 'userId',
        as: 'transactions',
      })
      User.belongsToMany(models.Post, {
        through: models.Bookmark,
        foreignKey: 'userId',
        as: 'bookmarkedPosts',
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
    avatar: DataTypes.STRING,     // avatar URL
    isAdmin: DataTypes.BOOLEAN,   // 1: admin, 0: user

  }, {
    sequelize,
    modelName: 'User',
    timestamps: true, // Bật timestamps: createdAt, updatedAt
    createdAt: 'createdAt', // Tên trường cho thời gian tạo
    updatedAt: 'updatedAt', // Tên trường cho thời gian cập nhật
  });
  return User;
};