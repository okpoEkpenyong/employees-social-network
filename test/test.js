const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const app = require('../app');
const should = require('should');
const request = require('supertest')
const agent = request.agent(server);

chai.use(chaiHttp);
const expect = chai.expect;

const resolvingPromise = new Promise((resolve) =>
  resolve('promise resolved')
);

// first check mocha
const assert = require('assert');
describe('Array', () => {
  describe('#indexOf()', () => {

    it('should return -1 when the value is not present', () => {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

// justify that our app  exists
describe('App basics', () => {
  it('Should exists', () => {
    expect(app).to.be.a('function');
  })
})

describe('Login Sessions', () => {
  it('assertion success', async () => {
    const result = await resolvingPromise;
    expect(result).to.equal('promise resolved');
  });


  it('should return error 500 for invalid password ', (done) => {
    chai
      .request(server)
      .post('/api/auth/signin')
      .send({
        "email": "mayojames@gmail.com", "password": "mayo4"
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(500);
        done();
      });
  });

  it('should return error 500 for invalid email ', (done) => {
    chai
      .request(server)
      .post('/api/auth/signin')
      .send({ "email": "mayojamesE@gmail.com", "password": "mayo"
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(500);
        done();
      });
  })

  it('should return with a error 400, if authorization is not provided', (done) => {

    const firstname = 'Mayo';
    const lastname = 'James';
    const email = 'mayojames@ymail.com';
    const password = 'mayo';
    const gender = 'male';
    const jobrole = 'designer';
    const department = 'UIX';
    const address = '20 Alla Jer Str';
    const createdon = "2014-04-02";

    chai
      .request(app)
      .post('/api/auth/create-user')
      .send({
        firstname, lastname, email, password, gender, jobrole, department, address, createdon
      })
      .end((err, res) => {
       expect(res.status).to.be.equal(401);
       done();
      })
  });

  
  /**
   *   it('Admin only should create an employee', (done) => {
    //  Admin sign in to get session token
    const AdminEmail = 'jamesdean2@example.com';
    const AdminPassword = 'jamesdean2';
    
    chai.
        request(app)
        .post('/api/auth/signin')
        .send({ AdminEmail: AdminEmail, AdminPassword: AdminPassword })
        .end((err, res) => {
         // expect(res.status).to.be.equal(401);
          done();
          //let token = res.body.token
          console.log('token: ', res.body.token)
         })    

    // console.log('token: ', token)
    // create new user properties and value
    const firstname = 'Mayo2';
    const lastname = 'James2';
    const email = 'mayojames2@ymail.com';
    const password = 'mayo2';
    const gender = 'male';
    const jobrole = 'designer';
    const department = 'UIX';
    const address = '20 Alla Jer Str';
    const createdon = "2014-04-02";

    console.log('token2: ', token)
    // Send the request
      chai  
        .request(app)
        .post('/api/v1/auth/create-user')
        .set('Admin', token)
        .send({
          firstname, lastname, email, password, gender, jobrole, department, address, createdon
        })
        .end((err, res) => {
         expect(res.status).to.be.equal(401);
         done();
        })
    expect(res.status).to.equal(201);
});
   */


});

