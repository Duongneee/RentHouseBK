'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Transactions', 'status')
    await queryInterface.addColumn('Transactions', 'status', {
      type: Sequelize.STRING,
      allowNull: true,
      
    })
  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.removeColumn('Transactions', 'status')
  }
};
