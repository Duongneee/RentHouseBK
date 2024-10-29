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
      // Post.belongsTo(models.Image, { foreignKey: 'imagesId', targetKey: 'id', as: 'images' })
      // Post.belongsTo(models.Attribute, { foreignKey: 'attributesId', targetKey: 'id', as: 'attributes' })
      Post.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'user' })
    }
  }
  Post.init({
    title: DataTypes.STRING,
    star: DataTypes.STRING,
    images: DataTypes.STRING,
    // address: DataTypes.STRING,
    cityId: DataTypes.STRING,     // for both city and province
    districtId: DataTypes.STRING,
    wardId: DataTypes.STRING,
    price: DataTypes.FLOAT,
    priceRange: DataTypes.STRING,
    description: DataTypes.TEXT,
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