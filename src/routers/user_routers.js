const express  =  require('express');
const { createUserInDatabase, findUser } = require('../handlers/db_handler.js')
const { encryptPassword, verifyPassword, generateJwt } = require('../helpers/helpers.js')
var uuid = require('uuid');
const router =  express.Router();
// router for registering user
router.post('/register', async (req, res)=>{
  try{
    let {
      username,
      firstname,
      lastname,
      email,
      password,
    } = req.body;
      const { encryptedData} = encryptPassword(password);
      const userId = uuid.v4();
      const userInfo = {
        username: username ? username : '',
        firstname: firstname ? firstname : '',
        lastname: lastname ? lastname : '',
        email,
        password: encryptedData,
        userId
      }
      await createUserInDatabase(userInfo);
      return res.status(201).json({ message: 'A verification mail has been sent to your registered mail.' });
  } catch(err) {
    console.error(`Failed to register user ${req.body.username}`);
    return res.status(400).json({error: err.message});
  }
});

//  router for log in user and returens token with user info
router.post('/login', async(req, res)=>{
  var userData;
  try{
    const { email, password } = req.body;
    userData = await findUser(email);
    if(!verifyPassword(userData.password, password)){
      throw new Error('Invallied password');
    }
    const token = generateJwt(userData.user_id);
    const info = {
      token,
      user: {
        id: userData.user_id,
        username: userData.user_name,
        email: userData.email,
        firstname: userData.first_name,
        lastname: userData.last_name
      }
    }
    return res.status(201).json(info);
  } catch(err) {
    console.error(`Failed to login user ${userData.user_name}`);
    return res.status(401).json({error: err.message});
  }
});

module.exports = {userRouters: router};
