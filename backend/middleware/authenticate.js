var jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header('auth-token').replace('Bearer ', '');
    if (!token) return res.status(401).send('Access denied. No token provided.'); 
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      console.log(decoded);
      next();
    } catch (ex) {
      res.status(400).send('Invalid token.');
    }
  };
  
module.exports = authenticate;