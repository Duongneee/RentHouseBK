const { Sequelize } = require('sequelize');
require('dotenv').config()

// Option 1: Passing parameters separately
// Warning: DO NOT PUBLIC THESE CREDENTIALS. should be stored in .env file
const sequelize = new Sequelize(
    process.env.DB_DATABASE_DEV,  // Database name
    process.env.DB_USERNAME_DEV,  // Username
    process.env.DB_PASSWORD_DEV,  // Password
    {
        host: process.env.DB_HOST_DEV,   // Host
        port: process.env.DB_PORT_DEV,   // Port
        dialect: process.env.DB_DIALECT_DEV || 'mysql' ,  // Dialect (mysql, postgres, etc.)
    }
);

const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        console.log('Check credentials in .env');
    }
};

export default connectDatabase;
