const express = require('express');
const router = express.Router();

const db = require('../queries');


  // employees route
router.get('/api/v1/employee', db.getAllEmployees)   //GET all employees
router.get('/api/v1/employee/:eid', db.getEmployeeById) // GET an employee
router.post('/api/v1/employee', db.createEmployee)   // POST or create a new employee
router.put('/api/v1/employee/:eid', db.updateEmployee)  // UPDATE an employee info
router.delete('/api/v1/employee/:eid', db.deleteEmployee) // DELETE an employee info

// post route

// comments route

// application -------------------------------------------------------------
router.get('/', (req, res) => {

    res.render('teamRoutes', {title: 'TeamWork-ISNetwork App'}); 
});

module.exports = router;