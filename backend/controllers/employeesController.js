const pool = require('./config');
const {Pool} = require('pg');

//1: GET all route
 const getAllEmployees = (request, response) => {
   pool.query('SELECT * FROM employee ORDER BY eid ASC ', (error, results) => {
     if (error) {
       throw error
     }
       response.status(200).send({
       status: 'success',
       message: 'All Employees data retrieved',
       data: results.rows,
       });   
   })
 }
 
//2: GET route
 const getEmployeeById = (request, response,next) => {
   const id = parseInt(request.params.eid)
 
   pool.query('SELECT * FROM employee WHERE eid = $1', [id], (error, results) => {
     if (error) {
       throw error
     }
       response.status(200).send({
       status: 'success',
       message: `Employees data with Id ${id}, retrieved`,
       data: results.rows,
       })
     })

  };
 

 //3: POST route
const createEmployee = (req, res) => {
 //const id = parseInt(req.params.eid)
 const data = {
   username : req.body.username,
   firstname : req.body.firstname,
   lastname : req.body.lastname,
   email : req.body.email,
   password : req.body.password,
   gender : req.body.gender,
   jobrole : req.body.jobrole,
   department : req.body.department,
   address : req.body.address,
   emailverified : req.body.emailverified,
   createdon : req.body.createdon,
   lastlogin : req.body.lastlogin,
   
 }

 pool.connect((err, client, done) => {
   const query = 'INSERT INTO employee(username,firstname, lastname, email, password,gender,jobrole, department, address, emailverified, createdon, lastlogin) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *';
   const values = [data.username,data.firstname, data.lastname, data.email, data.password, data.gender, data.jobrole, data.department, data.address, data.emailverified, data.createdon, data.lastlogin];
   

   client.query(query, values, (error, result) => {
     done();
    // let result = result.rows[0];
     if (error) {
      throw error
     }
     res.status(201).send({
       status: 'Successful',
       message: `New employee inserted `,
       data: result.rows[0],
     });
   });
 });
};

 //4: PUT route
 const updateEmployee = (request, response) => {
   const id = parseInt(request.params.eid)
   const { username,firstname, lastname, email, password,gender, jobrole, department, address, emailverified, createdon, lastlogin } = request.body;
 
       pool.query(`UPDATE employee SET username  = $1, firstname = $2 , lastname = $3, email = $4, password = $5, gender = $6, 
         jobrole = $7, department = $8, address = $9, emailverified = $10, createdon = $11, lastlogin = $12 WHERE eid = $13`,
          [username,firstname, lastname, email, password,gender, 
           jobrole, department, address, emailverified, createdon, lastlogin, id],
            (error, results) => {
       if (error) {
         throw error
       }
       response.status(200).json({
         status: 'success',
         message: `Employee with Id, ${id} modified `,
          data: results.rows[0],
       })
     }
   )
 };

 //5: DELETE route
 const deleteEmployee = (request, response) => {
   const id = parseInt(request.params.eid);
 
   pool.query('DELETE FROM employee WHERE eid = $1', [id], (error, results) => {
     if (error) {
       throw error
     }
     response.status(200).send({
       status: 'Success',
       message: `Employee with eid ${id}, deleted`,
    //  data: results.rows[0],
     });
     
   })
 }
 
 module.exports = {
   getAllEmployees,
   getEmployeeById,
   createEmployee,
   updateEmployee,
   deleteEmployee,
 }
 
 