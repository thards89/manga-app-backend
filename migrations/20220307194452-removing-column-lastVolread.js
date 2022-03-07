'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('userMangas', 'lastVolRead');
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('userMangas');
  }
};