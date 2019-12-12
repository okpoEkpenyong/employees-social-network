const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const app = require('../app');
const should = require('should');
const request = require('supertest')
const agent = request.agent(server);

chai.use(chaiHttp);
const expect  = chai.expect;

const userCredentials = {
  email: 'jamesd2.dean@example.com', 
  password: 'jamesdean2'
}

// first check mocha
const assert = require('assert');
describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
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
  it('Authenticated Admin/Employee should sign in', (done) => {
    agent.post('/api/auth/signin')
    .send({ email: 'ubong.emma2@example.com', password: 'ubongemma122' })
    .end((err, res) => {
      expect(
        res.status).to.equal(200);
      done();
    });
  })
})
