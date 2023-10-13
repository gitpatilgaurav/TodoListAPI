const jwt = require("jsonwebtoken");
function authPermissions(req, res, next) {
  const accessMatrix = {
    admin: {
      "/create": true,
      "/delete": true,
      "/update": true,
      "/tasks": true,
      "/get-file": true,
      "/show": true,
    },
    user: {
      "/create": false,
      "/delete": true,
      "/update": false,
      "/tasks": true,
      "/get-file": false,
      "/show": true,
    },
    spectator: {
      "/create": false,
      "/delete": false,
      "/update": false,
      "/tasks": true,
      "/get-file": false,
      "/show": false,
    },
  };
  let token = req.headers["authorization"];
  if (!token || token.length == 0) {
    res.send("Error parsing Token");
  }
  token = token.split(" ")[1];
  const decodedToken = jwt.verify(token, "secretkey");
  const userRole = decodedToken.urole;
  const route = req.originalUrl.replace(/\/\d+$/, "");
  console.log(route);
  if (accessMatrix[userRole] && accessMatrix[userRole][route]) {
    next();
  } else {
    res.status(403).send("Access denied");
  }
}

module.exports = authPermissions;
