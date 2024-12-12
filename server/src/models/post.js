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
      });
      Post.belongsToMany(models.User, {
        through: models.Bookmark,
        foreignKey: 'postId',
        as: 'bookmarkedBy'
      });
    }
  }
  Post.init({
    // See https://sequelize.org/docs/v7/models/data-types/ for more info
    title: DataTypes.STRING,
    star: DataTypes.STRING,
    images: DataTypes.TEXT('long'),  // JSON stringified array of image URLs
    // address: DataTypes.Text,
    city: DataTypes.STRING,     // for both city and province
    district: DataTypes.STRING,
    ward: DataTypes.STRING,
    street: DataTypes.STRING,
    price: DataTypes.INTEGER.UNSIGNED,   // in VND,  0 to 4,294,967,295
    priceRange: DataTypes.STRING,
    description: DataTypes.TEXT('long'),
    size: DataTypes.INTEGER.UNSIGNED,   // in m2,  0 to 4,294,967,295
    sizeRange: DataTypes.STRING,
    categoryCode: DataTypes.STRING,
    userId: DataTypes.STRING,
    expiryDate: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    bookmarkCount: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.getDataValue('bookmarkCount')
      },
      set(value) {
        throw new Error('Do not try to set the `bookmarkCount` value!');
      }
    }
  }, {
    sequelize,
    modelName: 'Post'
  });
  return Post;
};