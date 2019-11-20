const pool = require('./config');
const {Pool} = require('pg');
 
 //3: POST route
 const createAnArticle = (req, res) => {
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
      const query = 'INSERT INTO Post(username,firstname, lastname, email, password,gender,jobrole, department, address, emailverified, createdon, lastlogin) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *';
      const values = [data.username,data.firstname, data.lastname, data.email, data.password, data.gender, data.jobrole, data.department, data.address, data.emailverified, data.createdon, data.lastlogin];
      
   
      client.query(query, values, (error, result) => {
        done();
       // let result = result.rows[0];
        if (error) {
         throw error
        }
        res.status(201).send({
          status: 'Successful',
          message: `New Post inserted `,
          data: result.rows[0],
        });
      });
    });
   };


   module.exports = {
    getAGifs,
    getAnArticle,
    deleteAGifs,
    deleteAnArticle,
    createAGifs,
    createAnArticle,
    EditAPost, // or Update
    EditAnArticle,
    PostAGif,
    PostAnArticle
    
  };