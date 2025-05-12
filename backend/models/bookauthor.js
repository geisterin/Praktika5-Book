'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BookAuthor extends Model {
    static associate(models) {
      // никаких связей здесь не нужно — это join-таблица
    }
  }

  BookAuthor.init({
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Books',
        key: 'id'
      }
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Authors',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'BookAuthor',
    tableName: 'BookAuthors',
    timestamps: false
  });

  return BookAuthor;
};
