const pool = require("../models/data");
const jwt = require("jsonwebtoken");
const secretKey = "secretkey";
const refreshSecretKey = "refreshsecretkey";
const { homePage } = require("./ShowTasksModel");

exports.loginLogic = (req, res) => {
  const uname = req.body.login;
  const urole = req.body.role;
  const upassword = req.body.password;

  pool.query(
    `select * from users where uname = ? and urole = ? and upassword = ?`,
    [uname,urole, upassword ],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else if (result.length === 0) {
        res.render("Error");
      } else {
        jwt.sign(
          { uname, upassword,urole },
          secretKey,
          { expiresIn: "4h" },
          (err, accessToken) => {
            if (err) {
              res.status(500).send(err.message);
            } else {
              jwt.sign(
                {},
                refreshSecretKey,
                { expiresIn: "7d" },
                (err, refreshToken) => {
                  if (err) {
                    res.status(500).send(err.message);
                  } else {
                    res.header(
                      "Authorization",
                      `Bearer ${accessToken} Bearer ${refreshToken}`
                    );
                    res.json({
                      token: accessToken,
                      refreshToken: refreshToken,
                    });
                  }
                }
              );
            }
          }
        );
        // console.log("error")
      }
    }
  );
};
