'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('Books','title', { 
        type: Sequelize.STRING,
        allowNull: false
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('Books');
  }
};
