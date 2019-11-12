 const pool = require('./dbConfig');

  const getAllEmployees = (request, response) => {
    pool.query('SELECT * FROM employees ORDER BY eid ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json({
        status: 'success',
        message: 'All data retrieved!',
        data: results.rows
      })
     
    })
  }
  
  
  const getEmployeeById = (request, response) => {
    const id = parseInt(request.params.eid)
  
    pool.query('SELECT * FROM employees WHERE eid = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json({
        status: 'success',
        message: 'Data retrieved!',
        data: results.rows
      })
      
    })
  }
  
  const createEmployee = (request, response) => {
    const { name, email } = request.body
  
    pool.query('INSERT INTO employees (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).json({
        status: 'success',
        message: `User added with ID: ${results.insertId}`,
        data: results.insertId
      })
     
    })
  }
  
  const updateEmployee = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
  
    pool.query(
      'UPDATE employees SET name = $1, email = $2 WHERE id = $3',
      [name, email, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json({
          status: 'success',
          message: `User modified with Id: ${id}`,
          data: id
        })
      }
    )
  }
  
  const deleteEmployee = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM employees WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json({
        status: 'success',
        message: `User deleted with Id: ${id}`,
        data: id
      })
      
    })
  }
  
  module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
  }
  
  