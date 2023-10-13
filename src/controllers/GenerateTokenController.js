const jwt = require("jsonwebtoken");
const refreshSecretKey = "refreshsecretkey";
const secretKey = "secretkey";

exports.generateToken = (req, res) => {
  let token = req.headers["authorization"];
  let refreshToken = req.headers["authorization"];
  if (refreshToken) {
    refreshToken = token.split(" ")[3];
  }
  if (token) {
    accessToken = token.split(" ")[1];
  }
  jwt.verify(accessToken, secretKey, (err, decoded) => {
    if (err) {
      jwt.verify(refreshToken, refreshSecretKey, (referr, refdecoded) => {
        if (referr) {
          res.status(401).json({ message: "You must log in again" });
        } else {
          jwt.sign({}, secretKey,{ expiresIn:"40s"},(err, accessToken) => {
            if (err) {
              res.status(500).send(err.message);
            } else {
              res.header("Authorization", `Bearer ${accessToken}`);
              res.json({
                token: accessToken,
              });
            }
          });
        }
      });
    } else {
        res.status(200).json({ message: "access token is still valid" });
    }
  });
};

//   jwt.verify(refreshToken,refreshSecretKey,(refErr,refDecode)=>{
//     if(refErr){
//         res.status(500).json({Message:"You must log in"})
//     }else{
//         jwt.sign(refreshToken,secretKey,(err,accessToken)=>{
//             if(err){
//                 res.status(500).send(err.message);
//             }else{
//                 res.header("Authorization", `Bearer ${accessToken}`);
//                 res.json({
//                     token: accessToken,
//                   });
//             }
//         })
//     }
//   })
// };

// jwt.verify(accessToken, secretKey, (accessTokenError, decodedaccessToken) => {
//     if (accessTokenError) {
//       if (refreshToken) {
//         jwt.verify(refreshToken, refreshSecretKey, (refTokenError, decodedRefToken) => {
//           if (refTokenError) {
//             res.send(refTokenError);
//           } else {
//             res.status(200).json({ refreshToken });
//           }
//         });
//       } else {
//         res.status(401).json({ Message: "Access token is expired and no refresh token is provided" });
//       }
//     } else {
//       res.status(200).json({ Message: "Access token is still valid" });
//     }
//   });
