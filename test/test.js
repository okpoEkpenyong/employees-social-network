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

    it('should return -1 when the value is not present', () => {
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
    it('should signin non-admin user successfully', (done) => {
      chai
          .request(app)
          .post('/api/auth/signin')
          .send({
            "email": "mayojames@gmail.com",
            "password": "mayo"
          })
          .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res.body.status).to.equal('success');
              expect(res.body).to.have.property('status');
              expect(res.body).to.have.property('data');
              done();
          });
  });

});

