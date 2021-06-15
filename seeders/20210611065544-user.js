'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('users', [{
     id: 1,
     username: 'david',
     email: 'david@naver.com',
     password: '12341234'
   }], {})

   await queryInterface.bulkInsert('users', [{
    id: 2,
    username: 'hwang',
    email: 'hwang@naver.com',
    password: '12341234'
  }], {})

  await queryInterface.bulkInsert('secrets', [{
    id: 1,
    content: '관리자가 쓴 쓸데없는 글 입니다.1',
    userId: 1
  }], {})

  await queryInterface.bulkInsert('secrets', [{
    id: 2,
    content: '관리자가 쓴 쓸데없는 글 입니다.2',
    userId: 1
  }], {})

  await queryInterface.bulkInsert('secrets', [{
    id: 3,
    content: '랜덤글은 내가 나와야해 관리자야.3',
    userId: 2
  }], {})

  await queryInterface.bulkInsert('secrets', [{
    id: 4,
    content: '읽은글은 내가 나와야해 관리자야.4',
    userId: 2
  }], {})
  await queryInterface.bulkInsert('secrets', [{
    id: 5,
    content: '관리자가 쓴 쓸데없는 글 입니다.5',
    userId: 1
  }], {})

  await queryInterface.bulkInsert('users_secrets', [{
    id: 1,
    userId: 1,
    secretId: 4
  }], {})

  },
  

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('secrets', null, {});
    await queryInterface.bulkDelete('users_secrets', null, {});
  }
};
