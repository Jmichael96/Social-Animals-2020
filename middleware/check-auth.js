const config = require('../services/keys');
const jwt = require('jsonwebtoken');

module.exports = async function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    await jwt.verify(token, process.env.SECRET || config.SECRET, (error, decoded)=>{
      if(error){
        res.status(401).json({ msg: 'Token is not valid' });
      }
      else{
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error('something wrong with auth middleware')
    res.status(500).json({ msg: 'Server Error' });
  }
// console.log(req.body);
// try {
//     const token = req.headers.authorization.split(" ")[1];
//     const decodedToken = jwt.verify(token, process.env.SECRET || config.SECRET);
//     console.log(decodedToken + ' decoded token');
//     req.userData = { username: decodedToken.username, userId: decodedToken.userId };
//     next();
//   } catch (error) {
//       console.log(error);
//     res.status(401).json({ message: "You are not authenticated!" });
//   }
};