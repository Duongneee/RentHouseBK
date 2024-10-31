'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Posts', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            title: {
                type: Sequelize.STRING
            },
            star: {
                type: Sequelize.STRING,
                defaultValue: '0'
            },
            images: {
                type: Sequelize.STRING
            },
            city: {
                type: Sequelize.STRING
            },
            district: {
                type: Sequelize.STRING
            },
            ward: {
                type: Sequelize.STRING
            },
            street: {
                type: Sequelize.STRING
            },
            price: {
                type: Sequelize.FLOAT
            },
            priceRange: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.TEXT
            },
            size: {
                type: Sequelize.FLOAT
            },
            sizeRange: {
                type: Sequelize.STRING
            },
            // categoryId is one of these: CTCH, CTMB, NCT, CTPT
            categoryCode: {
                type: Sequelize.STRING
            },
            userId: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Posts');
    }
};