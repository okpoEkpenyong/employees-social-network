const pool = require('./config');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const security = {
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  },

  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },

  generateToken(id) {
    const token = jwt.sign({
      userId: id
    },
      process.env.SECRET, { expiresIn: '7d' }
    );
    return token;
  }


};


//1: GET all route
const getAllEmployees = (request, response) => {
  pool.query('SELECT * FROM employee ORDER BY eid ASC ', (error, results) => {
    if (error) {
      return response.status(400).send({
        error: error
      });
    }
    response.status(200).send({
      status: 'success',
      message: 'All Employees data retrieved',
      data: results.rows,
    });
  })
}


//2: POST route
//signup function
const signupEmployee = (req, res) => {
  //const id = parseInt(req.params.eid)
  const hash = security.hashPassword(req.body.password);
  const data = {
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: hash,
    gender: req.body.gender,
    jobrole: req.body.jobrole,
    department: req.body.department,
    address: req.body.address,
    createdon: req.body.createdon,
    lastlogin: req.body.lastlogin,
  }

  pool.connect((err, client, done) => {
    const query = 'INSERT INTO employee(username,firstname, lastname, email, password,gender,jobrole, department, address, createdon, lastlogin) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *';
    const values = [data.username, data.firstname, data.lastname, data.email, data.password, data.gender, data.jobrole, data.department, data.address, data.createdon, data.lastlogin];

    client.query(query, values, (error, result) => {
      done();
      // let result = result.rows[0];
      if (error) {
        return res.status(400).json({
          type: error.name,
          status: "Failure",
          error: error.detail,
          message: "Please check the error message and try again!"
        });
      }
      //signup successful
      res.status(201).send({
        password: req.body.password,
        hash: hash,
        status: 'Successful',
        message: `New employee Added! `,
        data: result.rows[0],
      });
    });
  });
};

//3: GET route
// login/sign-in function
const loginEmployee = (request, response) => {

  const id = parseInt(request.params.eid)
  const email = request.body.email
  //const hash = security.hashPassword(request.body.password)

  pool.query('SELECT * FROM employee WHERE email = $1', [email], (error, results) => {

    if (results.rows < 1) {
      return response.status(400).json({
        status: "Failure",
        message: `Employee with e-mail:${email}, not found!`
      });
    }
    const id = results.rows[0].eid
    const hash = results.rows[0].password // hashed pass in the db

    //results.rows[0].password: hashed password in db
    bcrypt.compare(request.body.password, hash).then(
      (valid) => {
        if (!valid) {
          return response.status(401).json({
            error: 'Incorrect password!',
          });
        }

        const token = jwt.sign(
          { payload: id },
          'RANDOM_TOKEN_SECRET',
          { expiresIn: '24h' });

        response.status(200).json({
          password: request.body.password, // in the db as hash
          hash: hash,
          userId: id,
          token: token,
          status: 'success',
          message: `Employee with email: ${email}, sign-in successfully!`,
          data: results.rows,
        })
      }).catch(
        (error) => {
          response.status(500).json({
            error: error
          });
        }
      );

  })
};


//4: PUT route
const updateEmployee = (request, response) => {
  const id = parseInt(request.params.eid)
  const { username, firstname, lastname, email, password, gender, jobrole, department, address, createdon, lastlogin } = request.body;

  pool.query(`UPDATE employee SET username  = $1, firstname = $2 , lastname = $3, email = $4, password = $5, gender = $6, 
         jobrole = $7, department = $8, address = $9, createdon = $10, lastlogin = $11 WHERE eid = $12`,
    [username, firstname, lastname, email, password, gender,
      jobrole, department, address, createdon, lastlogin, id],
    (error, results) => {
      if (error) {
        return response.status(400).json({
          error: error.detail
        });
      }
      response.status(200).send({
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
      return res.status(400).send({
        error: error
      });
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
  updateEmployee,
  deleteEmployee,
  signupEmployee,
  loginEmployee

}

