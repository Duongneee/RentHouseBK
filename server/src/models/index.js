// Run npx sequelize-cli db:migrate to create the table in the database.  
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
import config from '../config/config.js';
const db = {};
require('dotenv').config(); 

let sequelize;

const env = process.env.NODE_ENV || 'development';
const currentConfig = config[env];
if (currentConfig.use_env_variable) {
  sequelize = new Sequelize(process.env[currentConfig.use_env_variable], currentConfig);
} else {
  sequelize = new Sequelize(currentConfig.database, currentConfig.username, currentConfig.password, currentConfig);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
export default db;
