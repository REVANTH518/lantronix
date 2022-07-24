const express = require("express");
const bodyParser = require('body-parser');
const { SERVER_PORT } = require('./config.js');
const { connectToDataBase } =  require('./models/index.js');
const { userRouters } = require('./routers/user_routers.js')
console.log("Revanth!")
const app =  express();
connectToDataBase()
app.use(bodyParser.json({type: 'application/json'}));

// validating request object that comes with /user/ path
app.use('/user/*',(req, res, next)=>{
  console.log('Verifying incoming request..');
  if(!req.body.email || !req.body.password) {
    console.log(`User email or password con't be empty`)
    return res.status(401).json({error: 'UNAUTHORIZED'});
  } else if(req.body.email && !req.body.email.match(/\S+@\S+\.\S+/)) {
    console.log(`email invalied`)
    return res.status(400).json({error: 'INVALIED_EMAIL'});
  }
  return next();
})

// service health check
app.get('/healthcheck',(req, res)=>{
  res.send('okay')
})

app.use('/user', userRouters)

app.listen(SERVER_PORT,()=>{
  console.log(`Server started in port ${SERVER_PORT} !!`);
})

module.exports = {
  app
}
