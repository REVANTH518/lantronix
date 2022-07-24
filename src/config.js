const dotenv = require('dotenv');
const config = require('../config.json')

dotenv.config();

const { DB_NAME, DB_HOST, DB_PASS, DB_PORT, DB_USER, SERVER_PORT = 8000 } = process.env;
const ENV = process.env.ENVIRONMENT || 'dev';

const PASS_KEY = config[ENV].password.key;
const PASS_IV = config[ENV].password.iv;
const PASS_ALG = config[ENV].password.algorithm;
const JWT_KEY = config[ENV].jwt.secret;
const JWT_HEADER = config[ENV].jwt.header;
const JWT_EXP = config[ENV].jwt.expiresIn;

module.exports = {
  DB_NAME, 
  DB_HOST, 
  DB_PASS, 
  DB_PORT, 
  DB_USER, 
  SERVER_PORT,
  PASS_ALG,
  PASS_IV,
  PASS_KEY,
  JWT_KEY,
  JWT_HEADER,
  JWT_EXP
}
