const pool = require("../models/Task");

exports.updateTaskById = (req, res) => {
  const taskId = parseInt(req.params.id);
  const ttitle = req.body.ttitle;
  const tdesc = req.body.tdesc;

  // console.log(taskId);
  pool.query("select tid from tasks where tid = ?", [taskId], (err, result) => {
    if (err) {
      res.status(500).send(err.sqlMessage);
    } else {
      if (result.length === 0) {
        res.status(404).send("Task not found.");
      } else {
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
      }
    }
  });
 
};






