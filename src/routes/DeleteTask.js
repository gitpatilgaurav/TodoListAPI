const express = require("express");
const router = express.Router();
const { deleteTaskById } = require("../controllers/DeleteTaskModel");

router.delete("/:id", deleteTaskById);

module.exports = router;
