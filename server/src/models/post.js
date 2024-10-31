'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'id',
        as: 'owner',
      })
      Post.hasMany(models.Payment, {
        foreignKey: 'postId',
        as: 'paidFor'
      })
    }
  }
  Post.init({
    // See https://sequelize.org/docs/v7/models/data-types/ for more info
    title: DataTypes.STRING,
    star: DataTypes.STRING,
    images: DataTypes.STRING,
    // address: DataTypes.Text,
    city: DataTypes.STRING,     // for both city and province
    district: DataTypes.STRING,
    ward: DataTypes.STRING,
    street: DataTypes.STRING,
    price: DataTypes.FLOAT,
    priceRange: DataTypes.STRING,
    description: DataTypes.TEXT('long'),
    size: DataTypes.FLOAT,
    sizeRange: DataTypes.STRING,
    categoryCode: DataTypes.STRING,
    userId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Post'
  });
  return Post;
};