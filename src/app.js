const express = require("express");
const path = require("path");
const verifyToken = require("./middleware/verifyTokenMiddleware");
const verifyAllToken = require('./middleware/authRefreshTokenMiddleware')
const authPermissions = require("./middleware/AcessControlMiddleware");


const app = express();
const port = 3000;
app.use(express.json());

//set path to find index.ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Home page
app.get("/", (req, res) => {
  res.render("HomePage");
});

//add User
const addUserRouter = require("./routes/AddUser");
app.use("/adduser", verifyToken, addUserRouter);

//login
const loginRouter = require("./routes/LoginPage");
app.use("/login",  loginRouter);

//show all tasks
const homePageRouter = require("./routes/ShowTasks");
app.use("/tasks",authPermissions,verifyToken, homePageRouter);

//show task by ID
const showTaskById = require("./routes/showTaskById");
app.use("/show", authPermissions,verifyToken, showTaskById);

//Add tasks
const postTaskRouter = require("./routes/PostTask");
app.use("/create",authPermissions,verifyToken, postTaskRouter);

//update tasks
const updateTaskRouter = require("./routes/UpdateTask");
app.use("/update",authPermissions, verifyToken, updateTaskRouter);

//delete tasks
const deleteTaskRouter = require("./routes/DeleteTask");
app.use("/delete",authPermissions, verifyToken, deleteTaskRouter);

//get file endpoint
const getFileRouter = require('./routes/GetFile');
app.use('/get-file',authPermissions,getFileRouter)

//refresh token endpoint
const refreshTokenRouter = require('./routes/RefreshToken');
app.use('/refresh-token',verifyAllToken,refreshTokenRouter)

//Error Page
app.get("*", function (req, res) {
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is on : ${port}`);
});
