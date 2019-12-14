const express = require('express');
//const router = express.Router();
const router = require('express-promise-router')();
const database = require('../controllers/employeesController');
const auth  = require('../middleware/auth')

  // employees route
router.get('/api/v1/employee', auth, database.getAllEmployees)   //GET all employees
router.put('/api/v1/employee/:eid', auth, database.updateEmployee)  // UPDATE an employee info
router.delete('/api/v1/employee/:eid', auth, database.deleteEmployee) // DELETE an employee info

router.post('/api/auth/signin', database.loginEmployee);     // POST or signin: Admin/employee
router.post('/api/auth/create-user', auth, database.signupEmployee)   // POST or create a new employee/signup(Admin only)

// post route


router.get('/', (req, res) => {
    res.send('<h4> Welcome to Employees-social-network Application!</h4>'); 
    //res.send(JSON.stringify({Hello: 'My Employees World!'}))
});



module.exports = router;