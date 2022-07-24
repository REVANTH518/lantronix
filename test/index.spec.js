const sinon =  require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../src/index.js');
const db = require('../src/handlers/db_handler.js')

chai.should()
chai.use(chaiHttp);
const sandbox = sinon.createSandbox();
describe('Routers', ()=>{
  let connection;
  let verifyStub;
  let createUserInDatabaseStub;
  beforeEach(()=>{
    connection = chai.request(app);
    
  });

  afterEach(()=>{
    sandbox.restore()
  });
  describe('Healthcheck', ()=>{
    it('should return ok and satus 200', (done)=>{
      connection.get('/healthcheck')
        .end((err, res)=>{
          res.should.have.status(200)
          done();
        })
    })
  });
  describe('Register User', ()=>{
    it('registering user with proper data', (done) =>{
     
      const data = {
        "username": "revanth",
        "firstname": "revanth",
        "lastname": "m",
        "email": "revanth@gmail.com",
        "password": "pass",
        "userId": "hello-1234-abcedf-93993-dfsdfd"
        }
      connection.post('/user/register')
        .send(data)
        .end((err, res)=>{
          res.should.have.status(201);
          done()
        })
    })
    it('registering user with invalied email',(done) => {
      const data = {
        "username": "revanth",
        "firstname": "revanth",
        "lastname": "m",
        "email": "revanth",
        "password": "pass"
        }
      connection.post('/user/register')
        .send(data)
        .end((err, res)=>{
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.error.should.be.eql('INVALIED_EMAIL')
          done()
        })
    })
    it('registering user with existing email data', (done) =>{
      const data = {
        "username": "revanth",
        "firstname": "revanth",
        "lastname": "m",
        "email": "revanth@gmail.com",
        "password": "pass",
        "userId": "hello-1234-abcedf-93993-dfsdfd"
        }
      connection.post('/user/register')
        .send(data)
        .end((err, res)=>{
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.error.should.be.eql('Email address already in use!')
          done()
        })
    })
  })
  describe('Login User',()=>{
    it('login user with proper crediantial',(done)=>{
      const data = {
        "username": "revanth",
        "firstname": "revanth",
        "lastname": "m",
        "email": "revanth@gmail.com",
        "password": "pass",
        }
      connection.post('/user/login')
        .send(data)
        .end((err, res)=>{
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.user.username.should.be.eql(data.username);
          res.body.user.email.should.be.eql(data.email);
          res.body.should.have.property('token');
          done()
        })
    })
    it('login user with invalied crediantial',(done)=>{
      const data = {
        "email": "revanth@gmail.com",
        "password": "pas",
        }
      connection.post('/user/login')
        .send(data)
        .end((err, res)=>{
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.error.should.be.eql('Invallied password')
          done()
          process.exit()
        })
    })
  })
})
