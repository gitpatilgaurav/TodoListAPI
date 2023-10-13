const express = require("express");
const { tasks } = require("../controllers/ShowTasksModel");
const router = express.Router();
router.get("/",tasks);
module.exports = router;
