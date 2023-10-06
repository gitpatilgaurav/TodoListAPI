const pool = require("../models/Task");

exports.getTaskById = (req, res) => {
  const taskId = parseInt(req.params.id);

  pool.query(`select * from tasks where tid=${taskId}`, (err, result) => {
    if (err) {
      res.status(500).send("task not available");
    } else if (result.length == 0) {
      res.status(404).render("Error");
    } else {
      res.status(200).render("index",{tasks:result});
    }
  });
};
