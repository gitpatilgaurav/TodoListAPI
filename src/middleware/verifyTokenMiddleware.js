const jwt = require("jsonwebtoken");
const secretKey = "secretkey";

function verifyToken(req, res, next) {
  let token = req.headers['authorization'];
  // console.log(token)
  if (token) {
    token = token.split(' ')[1];
  }
  jwt.verify(token, secretKey, (err) => {
    if (err) {
      return res.status(401).send('you are not authorized to access or access refresh-token');
    }
    next();
  });
}
module.exports = verifyToken;