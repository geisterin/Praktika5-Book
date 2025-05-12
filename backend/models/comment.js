'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Комментарий принадлежит пользователю
      Comment.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    
      // Комментарий относится к одной книге
      Comment.belongsTo(models.Book, {
        foreignKey: 'bookId',
        as: 'book'
      });
    }
    
  }
  Comment.init({
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      },
      field: 'body'
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'book_id'
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id'
    }
  }, {
    sequelize,
    modelName: 'Comment',
    tableName: 'Comments',
  });
  return Comment;
};