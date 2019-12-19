const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const server = require('../server');
const should = require('should');
const request = require('supertest')
const agent = request.agent(app);

chai.use(chaiHttp);
const expect = chai.expect;

const AdminParams = {
  email: 'jamesd2.dean@example.com',
  password: 'jamesdean2',
};

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
describe('app basics', () => {
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
      .request(app)
      .post('/api/v1/auth/signin')
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
      .request(app)
      .post('/api/v1/auth/signin')
      .send({
        "email": "mayojamesE@gmail.com", "password": "mayo"
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
      .post('/api/v1/auth/create-user')
      .send({
        firstname, lastname, email, password, gender, jobrole, department, address, createdon
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(401);
        done();
      })
  });

});

describe("Signup Sessions", () => {

  it('should return error 401 if employee exists', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({ email: AdminParams.email, password: AdminParams.password })
      .end((err, res) => {
        should.not.exist(err);  ///api/v1/auth/create-user
    chai.request(app)
      .post('/api/v1/auth/create-user')
      .set("Authorization", `Bearer ${res.body.token}`)
      .send({
        firstname: 'Mayo2',
        lastname: 'James2',
        email: 'mayojames2@gmail.com',
        password: 'mayo2',
        gender: 'male',
        jobrole: 'designer',
        department: 'UIX',
        address: '20 Alla Jer Str',
        createdon:  '2014-04-02'
      })
      .end((err, res) => {
        expect(res).to.have.status(401); // employee exists
        done();
      });
    });
  });

})