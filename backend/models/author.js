'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    static associate(models) {
      // Автор может написать много книг (многие ко многим)
      Author.belongsToMany(models.Book, {
        through: 'BookAuthors',
        foreignKey: 'author_id',
        as: 'books'
      });
    }
  }

  Author.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    last_update: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Author',
  });

  return Author;
};
