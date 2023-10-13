const pool = require("../models/Task");
exports.deleteTaskById = (req, res) => {
  const taskId = parseInt(req.params.id);
  // console.log(taskId);
  pool.query("select tid from tasks where tid = ?", [taskId], (err, result) => {
    if (err) {
      res.status(500).send(err.sqlMessage);
    } else {
      if (result.length === 0) {
        res.status(404).send("Task not found.");
      } else {
        pool.query(
          "delete from tasks where tid = ?",
          [taskId],
          (err, result) => {
            if (err) {
              res.status(500).send(err.sqlMessage);
            } else {
              res.status(200).send("Task Deleted");
            }
          }
        );
      }
    }
  });
};
