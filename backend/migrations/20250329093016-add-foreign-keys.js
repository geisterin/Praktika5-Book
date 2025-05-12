'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Book → Category
    await queryInterface.addConstraint('Books', {
      fields: ['category_id'],
      type: 'foreign key',
      name: 'fk_books_category',
      references: {
        table: 'Categories',
        field: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });

    // User → Role
    await queryInterface.addConstraint('Users', {
      fields: ['role_id'],
      type: 'foreign key',
      name: 'fk_users_role',
      references: {
        table: 'Roles',
        field: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });

    // Comment → User
    await queryInterface.addConstraint('Comments', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_comments_user',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    // Comment → Book
    await queryInterface.addConstraint('Comments', {
      fields: ['book_id'],
      type: 'foreign key',
      name: 'fk_comments_book',
      references: {
        table: 'Books',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    // BookAuthor → Book
    await queryInterface.addConstraint('BookAuthors', {
      fields: ['book_id'],
      type: 'foreign key',
      name: 'fk_bookauthors_book',
      references: {
        table: 'Books',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    // BookAuthor → Author
    await queryInterface.addConstraint('BookAuthors', {
      fields: ['author_id'],
      type: 'foreign key',
      name: 'fk_bookauthors_author',
      references: {
        table: 'Authors',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Books', 'fk_books_category');
    await queryInterface.removeConstraint('Users', 'fk_users_role');
    await queryInterface.removeConstraint('Comments', 'fk_comments_user');
    await queryInterface.removeConstraint('Comments', 'fk_comments_book');
    await queryInterface.removeConstraint('BookAuthors', 'fk_bookauthors_book');
    await queryInterface.removeConstraint('BookAuthors', 'fk_bookauthors_author');
  }
};
