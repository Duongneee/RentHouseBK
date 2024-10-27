const {Sequelize} = require('sequelize');

const config = require(__dirname + '/example-config.json')["development"];
//Option 1: Passing parameters separately
// Warning: DO NOT PUBLIC THESE CREDENTIALS. should be stored in .env file
const sequelize = new Sequelize('renthousebk_db', 'avnadmin', config.password, {
    host: 'mysql-renthousebk-duong-9e8d.j.aivencloud.com',
    port: 27240,
    dialect: 'mysql'
});

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