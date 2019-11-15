const chai = require('chai');
//const should = chai.should();
const chaiHttp = require('chai-http');
const app = require('../server');
const should = require('should');
//import 'chai/register-should';

//import chatHttp from 'chai-http';
//import app from '../server';

chai.use(chaiHttp);
const { expect } = chai;

describe('Testing the Employees endpoints', () => {
      it('It should create an employee with a success message', (done) => {
      const employee = {
        username: 'employyim',
        lastname: 'employyhim',
        firstname: 'new1',
        password: 'n123ew',
        email: 'new.employ@example.com',
        gender: 'male',
        jobrole: 'designer',
        department: 'UIX',
        address: '1 hewet street, cali',
        emailverified: true,
        createdon: ' 2015-11-12',
        lastlogin: ' 2019-11-11'
      };
      chai.request(app)
        .post('/api/v1/employee')
        .set('Accept', 'application/json')
        .send(employee)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.data).to.include({
            username: employee.username,
            firstname: employee.firstname,
            lastname: employee.lastname,
            email: employee.email,
            password: employee.password,
            gender: employee.gender,
            jobrole: employee.jobrole,
            department: employee.department,
            address: employee.address,
            emailverified: employee.emailverified,
            createdon: employee.createdon,
            lastlogin: employee.lastlogin
            
          });
          done();
        });
      });

    
      it('It should get all employees', (done) => {
        chai.request(app)
          .get('/api/v1/employee')
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.status).to.equal(200);
            res.body.data[0].should.have.property('eid');
            res.body.data[0].should.have.property('username');
            res.body.data[0].should.have.property('firstname');
            res.body.data[0].should.have.property('lastname');
            res.body.data[0].should.have.property('password');
            res.body.data[0].should.have.property('email');
            res.body.data[0].should.have.property('gender');
            res.body.data[0].should.have.property('jobrole');
            res.body.data[0].should.have.property('department');
            res.body.data[0].should.have.property('address');
            res.body.data[0].should.have.property('emailverified');
            res.body.data[0].should.have.property('createdon');
            res.body.data[0].should.have.property('lastlogin');
            
            done();
          });
      });
    
      it('should respond with a single user', (done) => {
        chai.request(app)
        .get('/api/v1/employee/4')
        .end((err, res) => {
          // there should be no errors
          should.not.exist(err);
          // there should be a 200 status code
          res.status.should.equal(200);
          // the response should be JSON
          res.type.should.equal('application/json');
          // the JSON response body should have a
          // key-value pair of {"status": "success"}
          res.body.status.should.eql('success');
          // the JSON response body should have a
          // key-value pair of {"data": 1 user object}
          
          done();
        });
      });
    
      it('It should delete a employee', (done) => {
        const employeeId = 1;
        chai.request(app)
          .delete(`/api/v1/employee/${employeeId}`)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.data).to.include({});
            done();
          });
      });
    

    });
    