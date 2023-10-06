const pool = require("../models/Task");
exports.showTask =(req, res) => {
    pool.query(`select * from tasks`, (err, result) => {
      if (err) {
        res.status(500).render(err.message);
      } else if (result == 0) {
        res.status(404).render("Error");
      } else {
        res.status(200).render("index", { tasks: result });
      }
    });
}