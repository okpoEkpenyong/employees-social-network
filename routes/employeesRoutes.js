const express = require('express');
const router = express.Router();

const database = require('../controllers/employeesController');
const auth  = require('../middleware/auth')

  // employees route
router.get('/api/v1/employee', auth, database.getAllEmployees)   //GET all employees
router.put('/api/v1/employee/:eid', auth, database.updateEmployee)  // UPDATE an employee info
router.delete('/api/v1/employee/:eid', auth, database.deleteEmployee) // DELETE an employee info

router.post('/api/auth/signin', database.loginEmployee);     // POST or signin: Admin/employee
router.post('/api/auth/create-user', database.signupEmployee)   // POST or create a new employee/signup

// post route

// comments route

// application -------------------------------------------------------------
router.get('/', (req, res) => {

    res.render('employeesRoutes', {title: 'TeamWork-ISNetwork App'}); 
});

module.exports = router;