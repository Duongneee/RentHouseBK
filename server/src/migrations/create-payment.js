'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payments', {

      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      postId: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.INTEGER.UNSIGNED,   // in VND,  0 to 4,294,967,295
      },
      // zalo: {
      //   type: Sequelize.STRING
      // },
      // timestamp: {
      //   type: Sequelize.DATETIME,
      // },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Payments');
  }
};