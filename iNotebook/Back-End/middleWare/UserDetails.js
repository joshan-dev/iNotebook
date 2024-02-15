const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
 const secretPassword = process.env.INOTEBOOK_SECRET_PASSWORD;

const fetchUserDetails = (req, res, next) =>  {
  const jwtToken = req.header('auth-token');
  if (!jwtToken) {
    return res.status(401).send({ error: 'No token provided. Please authenticate with a valid token!' });
  }

  try {
    const verifyJwtToken = jwt.verify(jwtToken, secretPassword);
    req.authData = verifyJwtToken.userData.user;
    next();
  } catch (error) {
    console.log(error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).send({ error: 'Token has expired. Please authenticate with a new token.' });
    }
    res.status(401).send({ error: 'Please authenticate with a valid token!' });
  }
};

module.exports = fetchUserDetails;