'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      { id: 1, name: 'Классика', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: 'Фантастика', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, name: 'Роман', createdAt: new Date(), updatedAt: new Date() },
      { id: 4, name: 'ЛитРПГ', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
