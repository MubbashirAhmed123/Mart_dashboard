// authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config()


const authMiddleware = (req, res, next) => {
  // Check for token in headers, query parameters, or cookies
  const authHeader = req.headers['authorization'];

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ msg: "Unauthorized access." });
        }
        req.user = user.email; 
        next();
    });
} else {
    res.status(401).json({ msg: "Unauthorized access." });
}
};

module.exports = authMiddleware;
