'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'isAdmin', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false
    })
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.removeColumn('Transactions', 'status')
    await queryInterface.removeColumn('Users', 'isAdmin')
  }
};
