'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('BookAuthors', [
      { book_id: 1, author_id: 1, createdAt: now, updatedAt: now },
      { book_id: 2, author_id: 2, createdAt: now, updatedAt: now },
      { book_id: 3, author_id: 3, createdAt: now, updatedAt: now },
      { book_id: 4, author_id: 4, createdAt: now, updatedAt: now },
      { book_id: 5, author_id: 5, createdAt: now, updatedAt: now },
      { book_id: 6, author_id: 6, createdAt: now, updatedAt: now },
      { book_id: 9, author_id: 6, createdAt: now, updatedAt: now },
      { book_id: 7, author_id: 7, createdAt: now, updatedAt: now },
      { book_id: 10, author_id: 7, createdAt: now, updatedAt: now },
      { book_id: 8, author_id: 8, createdAt: now, updatedAt: now },
      { book_id: 11, author_id: 8, createdAt: now, updatedAt: now }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('BookAuthors', null, {});
  }
};




