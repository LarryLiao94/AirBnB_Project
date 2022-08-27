'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('Users', [
      {
        firstName: 'one',
        lastName: 'one',
        email: 'demo@user.io',
        username: 'Demo-lition',
        password: bcrypt.hashSync('password')
      },
      {
        firstName: 'two',
        lastName: 'two',
        email: 'user1@user.io',
        username: 'FakeUser1',
        password: bcrypt.hashSync('password2')
      },
      {
        firstName: 'three',
        lastName: 'three',
        email: 'user2@user.io',
        username: 'FakeUser2',
        password: bcrypt.hashSync('password3')
      },
      {
        firstName: 'four',
        lastName: 'four',
        email: 'user4@user.io',
        username: 'FakeUser4',
        password: bcrypt.hashSync('password4')
      },
      {
        firstName: 'five',
        lastName: 'five',
        email: 'user5@user.io',
        username: 'FakeUser5',
        password: bcrypt.hashSync('password5')
      },
      {
        firstName: 'six',
        lastName: 'six',
        email: 'user6@user.io',
        username: 'FakeUser6',
        password: bcrypt.hashSync('password6')
      },
      {
        firstName: 'seven',
        lastName: 'seven',
        email: 'user7@user.io',
        username: 'FakeUser7',
        password: bcrypt.hashSync('password7')
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return await queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2', 'FakeUser3', 'FakeUser4', 'FakeUser5', 'FakeUser6', 'FakeUser7'] }
    }, {});
  }
};