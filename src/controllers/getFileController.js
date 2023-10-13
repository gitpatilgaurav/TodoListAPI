// const fs = require('fs');
// const pool = require('../models/Task')
// const multer = require('multer');
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         return cb(null, "src/upload");
//     },
//     filename: function(req, file, cb) {
//         return cb(null, "taskData.txt");
//     }
// });

// const upload = multer({ storage });

// const getData = (req, res) => {
//     const filePath = req.file.path;
//     const fileContent = fs.readFileSync(filePath, "utf8");
//     const jsonData = JSON.parse(fileContent);
//     jsonData.forEach((task) => {
//         const ttitle = task.ttitle;
//         const tdesc = task.tdesc;
//         pool.query(`insert into tasks(ttitle,tdesc) values(?,?)`,[ttitle,tdesc],(err,result)=>{
//             if(err){
//                console.log(err.sqlMessage)
//                 res.send("error")
//             }else{
//                 res.send("data Pushed to mysql database succesfully")
//             }
//         })
//     })
// };

// module.exports = { upload, storage, getData };

// const fs = require("fs");
// const pool = require("../models/Task");
// const multer = require("multer");
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     return cb(null, "src/upload");
//   },
//   filename: function (req, file, cb) {
//     return cb(null, "taskData.txt");
//   },
// });

// const upload = multer({ storage });

// const getData = async (req, res) => {
//   try {
//     const filePath = req.file.path;
//     const fileContent = fs.readFileSync(filePath, "utf8");
//     const jsonData = JSON.parse(fileContent);
//     for (const task of jsonData) {
//       const ttitle = task.ttitle;
//       const tdesc = task.tdesc;
//       await new Promise((resolve, reject) => {
//         pool.query(
//           `insert into tasks(ttitle,tdesc) values(?,?)`,
//           [ttitle, tdesc],
//           (err, result) => {
//             if (err) {
//               console.log(err.sqlMessage);
//               reject(err);
//             } else {
//               resolve(result);
//             }
//           }
//         );
//       });
//     }
//     res.status(200).send("Data Pushed to MySQL database successfully");
//   } catch (error) {
//     res.status(500).send("An error occurred");
//   }
// };

// module.exports = { upload, storage, getData };

const fs = require("fs");
const pool = require("../models/Task");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "src/upload");
  },
  filename: function (req, file, cb) {
    return cb(null, "taskData.txt");
  },
});
const upload = multer({ storage });

const getData = async (req, res) => {
  // const filePath = req.file.path;
  const fileContent = fs.readFileSync(filePath, "utf8");
  const jsonData = JSON.parse(fileContent);

  await pool.getConnection(async (err, connection) => {
    if (err) {
      throw err;  
    }
    try {
      await connection.beginTransaction();
      jsonData.map( async(task)=>{
        const ttitle = task.ttitle;
        const tdesc = task.tdesc;

        await new Promise((resolve, reject) => {
          connection.query(
            `insert into tasks (ttitle, tdesc) values (?, ?)`,
            [ttitle, tdesc],
            (err, result) => {
              if (err) {
                console.log(err.sqlMessage);
                reject(err);
              } else {
                resolve(result);
              }
            }
          );
        });
      })
      // for (const task of jsonData) {
        
      // }
      await connection.commit();
      res.status(200).send("Data Pushed to MySQL database successfully");
    } catch (error) {
        connection.query('truncate table tasks')
      await connection.rollback();
      res.status(500).send(error.sqlMessage);
    } finally {
      connection.release();
    }
  });
};
module.exports = { upload, storage, getData };