const { Sequelize } = require('sequelize');

const config = require(__dirname + '/config.json')["development"];
//Option 1: Passing parameters separately
// Warning: DO NOT PUBLIC THESE CREDENTIALS. should be stored in .env file
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect
}
);

const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        console.log('Check credentials:', config);
    }
};
export default connectDatabase;
