'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // field 추가
    await queryInterface.addColumn('secrets', 'userId', Sequelize.INTEGER);
    await queryInterface.addColumn('users_secrets', 'userId', Sequelize.INTEGER);
    await queryInterface.addColumn('users_secrets', 'secretId', Sequelize.INTEGER);

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

    await queryInterface.addConstraint('users_secrets', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'FK_users_secret',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('users_secrets', {
      fields: ['secretId'],
      type: 'foreign key',
      name: 'FK_view_secret',
      references: {
        table: 'secrets',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('secrets', 'FK_any_name_you_want');
    await queryInterface.removeColumn('secrets', 'userId');
    await queryInterface.removeConstraint('users_secrets', 'FK_users_secret');
    await queryInterface.removeColumn('users_secrets', 'userId');
    await queryInterface.removeConstraint('users_secrets', 'FK_view_secret');
    await queryInterface.removeColumn('users_secrets', 'secretId');
  }
};