const express = require("express");
const router = express.Router();
const { upload, getData } = require('../controllers/getFileController');

router.post("/", upload.single('tasksData'),getData)

module.exports = router;
