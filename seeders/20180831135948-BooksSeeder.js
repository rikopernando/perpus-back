'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Books', [
      {
        title: 'Kupinang Engkau dengan Hamdalah',
        amount: 3,
        author_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Jalan Cinta para Pejuang',
        amount: 2,
        author_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Membingkai Surga dalam Rumah Tangga',
        amount: 4,
        author_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Cinta & Sexs Rumah Tangga Islam',
        amount: 3,
        author_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Books', null, {});
  }
};
