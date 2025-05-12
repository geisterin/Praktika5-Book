'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // Одна категория — много книг
      Category.hasMany(models.Book, {
        foreignKey: 'category_id'
      });
    }
  }

  Category.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
    timestamps: true // или false, если не нужно
  });

  return Category;
};
