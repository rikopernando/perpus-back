'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.addColumn('Users','role',{
          type: Sequelize.STRING,
          allowNull: false
     })
  },

  down: (queryInterface, Sequelize) => {
      return removeColumn('Users','role')
  }
};
