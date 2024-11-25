'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.removeColumn('Users', 'avatar')
    await queryInterface.addColumn('Users', 'avatar', {
      type: Sequelize.BLOB('medium'),
      allowNull: true,

    })
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.removeColumn('Transactions', 'status')
    await queryInterface.removeColumn('Users', 'avatar')
  }
};
