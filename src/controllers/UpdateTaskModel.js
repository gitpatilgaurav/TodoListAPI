const pool = require("../models/Task");

exports.updateTaskById = (req, res) => {
  const taskId = parseInt(req.params.id);
  const ttitle = req.body.ttitle;
  const tdesc = req.body.tdesc;

  pool.query(
    "update tasks set ttitle = ?, tdesc = ? where tid = ?",
    [ttitle, tdesc, taskId],
    (err, result) => {
      if (err) {
        res.status(500).send(err.sqlMessage);
        // console.log(err);
      } else {
        res.status(200).send("Task Updated");
      }
    }
  );
};