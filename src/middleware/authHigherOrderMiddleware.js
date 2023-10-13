const jwt = require("jsonwebtoken");
function AuthHigherOrder(req, res, next) {
  const auth_roles = ["admin"];
  // const token = req.headers.authorization.split(' ')[1];

  const token1 = req.headers["authorization"];
  if (!token1 || token1.length==0) {
    res.send("Error parsing Token");
  } // console.log(toke)
  let token = token1.split(' ')[1]
  const decodedToken = jwt.verify(token, "secretkey");
  const userRole = decodedToken.urole;

  if (auth_roles.indexOf(userRole) !== -1) {
    next();
  } else {
    res.status(401).json({ Message: "You are not authorized.." });
  }
}
module.exports = AuthHigherOrder;
