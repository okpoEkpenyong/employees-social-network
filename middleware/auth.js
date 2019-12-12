const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const admin = decodedToken.payload;

    if (admin !== 'dean2') {
      throw 'Unauthorized action. Only admin is allowed!';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: 'Invalid request!. Valid Authorization Required!'
    });
  }
};