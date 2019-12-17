const {pool} = require('./config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const security = {
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  },

  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },

  tokenize_(lastname) {
    const token = jwt.sign({
      payload: lastname
    },
      process.env.SECRET, { expiresIn: '14d' }
    );
    return token;
  },

};


/**
 * 1: GET all route
 */
const getAllEmployees = async (request, response) => {
 try {
  const client = await pool.connect()
  const result = await client.query({
    text: 'SELECT * FROM employee ORDER BY eid ASC ', 
  })
  await client.end()
  response.status(200).send({status: 'success',message: 'All Employees data retrieved,successfully!',data: result.rows,
  });
 } 
 catch (error) {response.status(400).send({ error: error})
 }
 
}


/** 
 *2: POST route
 *signup function
 */

const signupEmployee = async (req, res) => {
  
  const hash = security.hashPassword(req.body.password);
  const {firstname,lastname,email,gender,jobrole,department,address,createdon} = req.body

  try {
    const client = await pool.connect()
    const result = await client.query({
      text: 'INSERT INTO employee(firstname, lastname, email, password,gender,jobrole, department, address, createdon) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *', 
      values:  [firstname, lastname, email, hash, gender, jobrole, department, address, createdon],
    })
    console.log('data:' , result.rows)
    await client.end()
    res.status(200).send({status: 'success', message: `New employee Added! `, data: result.rows, });
   } 
    catch (error) { res.status(400).send({error: error.detail })
   }
};

/** 
 * 3: POST route
 * login/sign-in function
 */
const loginEmployee = async (request, response,done) => {
  const email =  request.body.email
  const client = await pool.connect()
  
  client.query('SELECT * FROM employee WHERE email = $1', [email], (error, results) => {
  
    console.log('data: ', results.rows)
    if (results.rowCount < 1) {
      return response.status(400).send({ status: "failure", message: `Employee with e-mail:${email}, not found!`
      })
    }
    
    bcrypt.compare(request.body.password, results.rows[0].password ).then(
      (valid) => {
        if (!valid) {
          return response.status(401).send({ error: 'Incorrect passwords!', })
        }

        response.status(200).send({
          userId: results.rows[0].eid,token: security.tokenize_(results.rows[0].lastname),
          status: 'success', message: `Employee with email: ${email}, sign-in successfully!`, data: results.rows,
        
        })
      }).catch( (error) => { response.status(500).send({ error: error })
        }
      )
      console.log(response.token)

  })
 // await client.end()
};

/**
 *  PUT route
 */
const updateEmployee = (request, response) => {
  const id = parseInt(request.params.eid)
  const { username, firstname, lastname, email, password, gender, jobrole, department, address, createdon, lastlogin } = request.body;

  pool.query(`UPDATE employee SET username  = $1, firstname = $2 , lastname = $3, email = $4, password = $5, gender = $6, 
         jobrole = $7, department = $8, address = $9, createdon = $10, lastlogin = $11 WHERE eid = $12`,
    [username, firstname, lastname, email, password, gender,
      jobrole, department, address, createdon, lastlogin, id],
    (error, results) => {

      if (error) {
        return response.status(400).send({ error: error.detail});
      }
      response.status(200).send({
        status: 'success',
        message: `Employee with Id, ${id} modified `,
        data: results.rows[0],
      })
    }
  )
};

/** 
 * DELETE route
*/
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
  loginEmployee,
  security
}

