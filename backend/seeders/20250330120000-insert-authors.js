'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Authors', [
      { id: 1, first_name: 'Фёдор', last_name: 'Достоевский', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, first_name: 'Лев', last_name: 'Толстой', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, first_name: 'Александр', last_name: 'Пушкин', createdAt: new Date(), updatedAt: new Date() },
      { id: 4, first_name: 'Михаил', last_name: 'Булгаков', createdAt: new Date(), updatedAt: new Date() },
      { id: 5, first_name: 'Джордж', last_name: 'Оруэлл', createdAt: new Date(), updatedAt: new Date() },
      { id: 6, first_name: 'Дем', last_name: 'Михайлов', createdAt: new Date(), updatedAt: new Date() },
      { id: 7, first_name: 'Дмитрий', last_name: 'Рус', createdAt: new Date(), updatedAt: new Date() },
      { id: 8, first_name: 'Василий', last_name: 'Маханенко', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Authors', null, {});
  }
};
