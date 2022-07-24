const { Sequelize } = require('sequelize');

const { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER} = require('./config.js');

const connection =  new Sequelize(
  DB_NAME, 
  DB_USER, 
  DB_PASS, 
  {
    host: DB_HOST,
    dialect: 'mysql',
    port: DB_PORT,
    logging: false,
  });

module.exports = { connection };
