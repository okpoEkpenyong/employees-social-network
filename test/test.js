const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const app = require('../app');
const should = require('should');
const request = require('supertest')
const agent = request.agent(server);

chai.use(chaiHttp);
const expect  = chai.expect;

const resolvingPromise = new Promise((resolve) =>
  resolve('promise resolved')
);
const rejectingPromise = new Promise((resolve, reject) =>
  reject(new Error('promise rejected'))
);
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
    it('assertion success', async () => {
      const result = await resolvingPromise;
      expect(result).to.equal('promise resolved');
    });

    it('Authenticated Admin/Employee should sign in', async () =>{
      const result = await chai.request(server)
         .post('/api/auth/signin') 
         .send({ email: 'ubong.emma2@example.com', password: 'ubongemma122' });
         expect(result.status).to.equal(200);   


    });

});
