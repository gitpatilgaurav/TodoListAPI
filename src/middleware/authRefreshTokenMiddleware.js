const jwt = require("jsonwebtoken");
const secretKey = "secretkey";
const refreshSecretKey = "refreshsecretkey";

function verifyAllToken(req, res, next) {
  let token = req.headers["authorization"];
  let refreshToken = req.headers["authorization"]; 
   
  if (token) {
    token = token.split(" ")[1];
  }

  if (refreshToken) {
    refreshToken = refreshToken.split(" ")[3]; 
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      jwt.verify(refreshToken, refreshSecretKey, (referr, refdecoded) => {
        if (referr) {
          res.status(401).json({ message: "Log in again" }); 
        } else {
          next();
        }
      });
    } else {
      next();
    }
  });
}

module.exports = verifyAllToken;