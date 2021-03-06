const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const employeeroutes = require('./routes/employeesRoutes');
const postsroutes = require('./routes/postsRoutes');
const path = require('path');
const cloudinaryConfig = require('./middleware/cloudinaryConfig').cloudinaryConfig;

// takes care of CORS errors. This should be placed before the routes 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//app.use('/', express.static(path.join(__dirname, 'gifs')));
app.use('*', cloudinaryConfig);
app.use(express.static(path.join(__dirname, 'public/gifs')));
app.use('/', employeeroutes); //front end app wil use this..../auth/api/v1/employee
app.use('/', postsroutes);

 module.exports = app;