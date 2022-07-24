const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { PASS_ALG, PASS_IV, PASS_KEY, JWT_KEY, JWT_EXP } = require('../config.js');

// enscriptiong password using cripto module
const encryptPassword = (pass) => {
  let cipher = crypto.createCipheriv(PASS_ALG, Buffer.from(PASS_KEY), PASS_IV);
  let encrypted = cipher.update(pass);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { encryptedData: encrypted.toString('hex') };
}

// decrypting password
const decryptPassword = (encryptedPass) => {
  let encryptedText = Buffer.from(encryptedPass, 'hex');
  let decipher = crypto.createDecipheriv(PASS_ALG, Buffer.from(PASS_KEY), PASS_IV);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
// generating jwt token and including expery date and user id
const generateJwt = (userId) => {
  const data = {
    user_id: userId,
    time: JWT_EXP
  }
  return jwt.sign(data, JWT_KEY);
}
// validating jwt token returns true if valied
const verifyJwt = (token) => {
  return jwt.verify(token, JWT_KEY)
}

const verifyPassword = (dbPass, enterPass) => {
  const pass = decryptPassword(dbPass);
  return pass == enterPass;
}

module.exports = {
  encryptPassword,
  decryptPassword,
  generateJwt,
  verifyJwt,
  verifyPassword
}
