const express = require('express');
const router = express.Router();

const database = require('../controllers/employeesController');


  // employees route
router.get('/api/v1/employee', database.getAllEmployees)   //GET all employees
router.get('/api/v1/employee/:email', database.getEmployeeByEmail) // GET an employee/sign in
router.post('/api/v1/employee', database.createEmployee)   // POST or create a new employee/signup
router.put('/api/v1/employee/:eid', database.updateEmployee)  // UPDATE an employee info
router.delete('/api/v1/employee/:eid', database.deleteEmployee) // DELETE an employee info

router.post('/api/v1/employee/signup', database.signupEmployee);
router.post('/api/v1/employee/login', database.loginEmployee);

// post route

// comments route

// application -------------------------------------------------------------
router.get('/', (req, res) => {

    res.render('employeesRoutes', {title: 'TeamWork-ISNetwork App'}); 
});

module.exports = router;