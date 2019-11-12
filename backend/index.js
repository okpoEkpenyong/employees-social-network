const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

  // employees route
app.get('/api/v1/employees', db.getAllEmployees)   //GET all employees
app.get('/api/v1/employees/:eid', db.getEmployeeById) // GET an employee
app.post('/api/v1/employees', db.createEmployee)   // POST or create a new employee
app.put('/api/v1/employees/:id', db.updateEmployee)  // UPDATE an employee info
app.delete('/api/v1/employees/:id', db.deleteEmployee) // DELETE an employee info

// post route


// comments route



 module.exports = app;