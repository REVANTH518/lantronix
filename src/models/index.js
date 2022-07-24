const { connection } = require('../db.js');

const Users = require(`./users`)(connection)

// estblashing connection with mysql db
const connectToDataBase = async ()=>{
  try{
    await connection.authenticate();
    await createModels();
    console.log("Successfully connected to database!")
  } catch(err) {
    console.error(`database connection failed error: ${err.message}`)
  }
}
// creating users model in mysql db
const createModels =  async ()=>{
  try{
    await Users.sync({ alter: true });
    console.log("Users model created successfully!");
  } catch(err) {
    console.error(`Failed to created model users error: ${err.message}`);
  }
}

module.exports = { Users, connectToDataBase };
