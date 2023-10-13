// const pool = require("../models/Task");
const pool = require('../models/data')

exports.addUser = (req, res) => {
  const uid = req.body.tid;
  const uname = req.body.uname.toLowerCase();
  const upassword = req.body.upassword;
//duplicate entry logic

  pool.query(
    "select * from users where uname = ?",
    [uname],
    (err, result) => {
      if (err) {
        res.status(500).send(err.sqlMessage);
      } else {
        if (result.length > 0) {
          // console.log(result)
          res.status(409).send("username already exists.");
        } else {
          //insertion logic
          pool.query(
            "insert into users values (?, ?, ?)",
            [uid, uname, upassword],
            (err, result) => {
              if (err) {
                res.status(500).send(err.sqlMessage);
              } else {
                res.status(200).send("user Added");
                // console.log(result)
              }
            }
          );
        }
      }
    }
  );
};
