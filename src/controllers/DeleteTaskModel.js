const pool = require("../models/Task");

exports.deleteTaskById = (req, res) => {
  const taskId = parseInt(req.params.id);
//   console.log(req.params.id)
  pool.query("delete from tasks where tid = ?", [taskId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err.sqlMessage);
      // console.log(err);
    } else {
      res.status(200).send("Task Deleted");
    }
  });
};
