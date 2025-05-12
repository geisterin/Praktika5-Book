'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'role_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Roles', // имя таблицы ролей
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'role_id');
  }
};
