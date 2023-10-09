const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
app.use(express.json());

//set path to find index.ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//show all tasks
const showAllTaskROuter = require("./routes/ShowTask");
app.use("/", showAllTaskROuter);

//show task by ID
const showTaskById = require("./routes/showTaskById");
app.use("/show", showTaskById);

//Add tasks
const postTaskRouter = require("./routes/PostTask");
app.use("/create", postTaskRouter);

// app.get('/json',(req,res)=>{
// res.json({name:"gaurav"})
// })

//update tasks
const updateTaskRouter = require("./routes/UpdateTask");
app.use("/update", updateTaskRouter);

//delete tasks
const deleteTaskRouter = require("./routes/DeleteTask");
app.use("/delete", deleteTaskRouter);

app.get("*", function (req, res) {
  res.send("what???", 404);
});

app.listen(port, () => {
  console.log(`Server is on : ${port}`);
});
