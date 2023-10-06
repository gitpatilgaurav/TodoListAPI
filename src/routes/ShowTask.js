const express = require("express");
const { showTask } = require("../controllers/ShowTaskModel");
const router = express.Router();
router.get("/", showTask);

module.exports = router;
