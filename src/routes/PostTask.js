const express = require("express");
const router = express.Router();
const { createTask } = require("../controllers/PostModel");

router.post("/", createTask);
module.exports = router;