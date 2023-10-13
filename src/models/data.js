const { createPool } = require("mysql");

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "gaurav123",
  database: "users",
  connectionLimit: 10,
});

// let authRoles = [];

// pool.query("select urole from users", (err, results) => {
//   if (err) {
//     console.log(err.sqlMessage);
//   } else {
//     for (const row of results) {
//       authRoles.push(row.urole);
//     }
//     console.log(authRoles); 
//   }
// });






module.exports = pool

