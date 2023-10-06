// const task = [
//   {
//     id: 1,
//     task: "wakeup",
//     desc: "wake at 5 am",
//   },
// ];

// module.exports = task;

const { createPool } = require("mysql");
const pool = createPool({
  host: "localhost",
  user: "root",
  password: "gaurav123",
  database: "task",
  connectionLimit: 10,
});
pool.query(`select * from tasks`, (err, res) => {
  if (err) {
    if (err) throw err;
  }
});

module.exports = pool;
