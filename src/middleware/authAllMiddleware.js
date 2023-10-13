// function AuthAll(req, res, next) {
//    let all_roles  = ["admin", "user", " specattor"]
//     let role = req.headers["authorization"]; 
//     let userRole =role.split(" ")[2] ;
//     if(userRole in "admin" ||userRole == "user" ||userRole == "spectator"){
//       next(); 
//     }else{
//        return res.status(401).json({Message:"You are not authorized"})
//     }
//    }
//    module.exports = AuthAll;

const jwt = require('jsonwebtoken');
function AuthAll(req, res, next) {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, 'secretkey');
      const userRole = decodedToken.urole;
      // console.log(token)
      let auth_roles = ["admin", "user", "spectator"];
      if (auth_roles.indexOf(userRole) !== -1) {
         next();
      } else {
         return res.status(401).json({ Message: "You are not authorized" });
      }
   }
   module.exports = AuthAll;
   
