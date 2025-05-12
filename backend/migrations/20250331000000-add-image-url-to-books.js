'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Проверяем, существует ли колонка
    const tableInfo = await queryInterface.describeTable('Books');
    if (!tableInfo.image_url) {
      // Если колонки нет, добавляем её
      await queryInterface.addColumn('Books', 'image_url', {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      });
    }
  },

  async down(queryInterface, Sequelize) {
    // При откате миграции удаляем колонку
    await queryInterface.removeColumn('Books', 'image_url');
  }
}; 