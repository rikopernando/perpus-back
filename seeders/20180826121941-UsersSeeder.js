'use strict';
const bcrypt = require('bcrypt')

module.exports = {
  up: (queryInterface, Sequelize) => {
      const password = bcrypt.hashSync('rahasia',10)
      return queryInterface.bulkInsert('Users', [
      {
        name: 'Admin',
        email: 'admin@gmail.com',
        password: password,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Member',
        email: 'member@gmail.com',
        password: password,
        role: 'member',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      ],{});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
