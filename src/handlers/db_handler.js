const { Users } = require('../models/index.js');

// creating user entry in database
const createUserInDatabase = async (userInfo) =>{
  const { username, firstname, lastname, email, password, userId } = userInfo;
  try{
    await Users.create({
      user_id: userId,
      user_name: username,
      first_name: firstname,
      last_name: lastname,
      email,
      password,
      is_active: 1,
      created_at: new Date().toISOString()
    });
    console.log(`User ${username} created!`);
    return;
  } catch(error){
    console.error(`Failed to create user ${username} error: ${error.message}`);
    throw new Error(error.message);
  }
};
// finding user in db based on email
const findUser = async (email) => {
  try{
    return await Users.findOne({ where: { email } })
  } catch(err) {

  }
}

module.exports = {
  createUserInDatabase,
  findUser
}
