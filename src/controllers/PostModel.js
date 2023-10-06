const pool = require("../models/Task");

exports.createTask = (req, res) => {
  const tid = req.body.tid;
  const ttitle = req.body.ttitle.toLowerCase();
  const tdesc = req.body.tdesc;
//duplicate entry logic
  pool.query(
    "select * from tasks where ttitle = ?",
    [ttitle],
    (err, result) => {
      if (err) {
        res.status(500).send(err.sqlMessage);
      } else {
        if (result.length > 0) {
          res.status(409).send("Task title already exists.");
        } else {
          //insertion logic
          pool.query(
            "insert into tasks values (?, ?, ?)",
            [tid, ttitle, tdesc],
            (err, result) => {
              if (err) {
                res.status(500).send(err.sqlMessage);
              } else {
                res.status(200).send("Task Added");
                console.log(result)
              }
            }
          );
        }
      }
    }
  );
};
