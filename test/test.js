const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const app = require('../app')
const request = require('supertest')

chai.use(chaiHttp);
const expect  = chai.expect;

const userCredentials = {
  email: 'jamesd2.dean@example.com', 
  password: 'jamesdean2'
}

// first check mocha
const assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});

// first justify that our app  exists
describe('App basics', () => {
  it('Should exists', () => {
    expect(app).to.be.a('function');
  })
})  


// Using request.agent() is the key
var agent = request.agent(server);

const resolvingPromise = new Promise( (resolve) => {
  resolve('promise resolved!');
});
