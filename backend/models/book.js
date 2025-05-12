'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      // Книга принадлежит одной категории
      Book.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'category'
      });

      // Книга может иметь много авторов (многие ко многим)
      Book.belongsToMany(models.Author, {
        through: 'BookAuthors',
        foreignKey: 'book_id',
        as: 'authors'
      });

      // У книги может быть много комментариев
      Book.hasMany(models.Comment, {
        foreignKey: 'book_id',
        as: 'comments'
      });
    }
  }

  Book.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    publication_year: DataTypes.INTEGER,
    last_update: DataTypes.DATE,
    category_id: DataTypes.INTEGER,
    image_url: DataTypes.STRING,
    file_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Book',
  });

  return Book;
};
