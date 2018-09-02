'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Authors', [
      {
        name: 'Mohammad Fauzil Adhim',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Salim A. Fillah',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Aam Amirudin',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Authors', null, {});
  }
};
