'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // field 추가
    await queryInterface.addColumn('secrets', 'userId', Sequelize.INTEGER);

    // foreign key 연결
    await queryInterface.addConstraint('secrets', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'FK_any_name_you_want',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('secrets', 'FK_any_name_you_want');
    await queryInterface.removeColumn('secrets', 'userId');
  }
};
