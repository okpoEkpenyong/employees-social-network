// this middlware will be applied to the posts and comments Routes and not the employeeRoutes

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const eid = decodedToken.eid;
    if (req.body.eid && req.body.eid !== eid) {
      throw 'Invalid employee ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: 'Invalid request!. Valid Authorization Required!'
    });
  }
};