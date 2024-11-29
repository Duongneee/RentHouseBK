// Auto generate by sequelize-cli, in pair with server/src/migrations/create-user.js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    // TODO: relationship with Post, payments, etc.
    static associate(models) {
      // define association here, more info at https://sequelize.org/master/manual/assocs.html
      Bookmark.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      Bookmark.belongsTo(models.Post, {
        foreignKey: 'postId',
        as: 'post'
      });
    }
  }
  Bookmark.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
      type: DataTypes.STRING,
      references: {
        model: 'User',
        key: 'id'
      },
      allowNull: false,
    },
    postId: {
      type: DataTypes.STRING,
      references: {
        model: 'Post',
        key: 'id'
      },
      allowNull: false
    }

  }, {
    sequelize,
    modelName: 'Bookmark'
  });
  return Bookmark;
};