
  
  'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Books', [
      { id: 1, title: 'Преступление и наказание', publication_year: 1866, category_id: 1, createdAt: new Date(), updatedAt: new Date() },
      { id: 2, title: 'Анна Каренина', publication_year: 1877, category_id: 3, createdAt: new Date(), updatedAt: new Date() },
      { id: 3, title: 'Евгений Онегин', publication_year: 1833, category_id: 1, createdAt: new Date(), updatedAt: new Date() },
      { id: 4, title: 'Мастер и Маргарита', publication_year: 1966, category_id: 2, createdAt: new Date(), updatedAt: new Date() },
      { id: 5, title: '1984', publication_year: 1949, category_id: 2, createdAt: new Date(), updatedAt: new Date() },
      { id: 6, title: 'Шаг в бездну', publication_year: 2010, category_id: 4, createdAt: new Date(), updatedAt: new Date() },
      { id: 7, title: 'Играть, чтобы жить', publication_year: 2012, category_id: 4, createdAt: new Date(), updatedAt: new Date() },
      { id: 8, title: 'Путь Шамана', publication_year: 2013, category_id: 4, createdAt: new Date(), updatedAt: new Date() }, 
      { id: 9, title: 'Во мрак', publication_year: 2011, category_id: 4, createdAt: new Date(), updatedAt: new Date() },
      { id: 10, title: 'Кто мы на самом деле?', publication_year: 2013, category_id: 4, createdAt: new Date(), updatedAt: new Date() },
      { id: 11, title: 'Шаман. Книга 2', publication_year: 2014, category_id: 4, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Books', null, {});
  }
};
