const express = require("express");
const router = express.Router();
const { addUser } = require("../controllers/AddUserController");

router.post("/", addUser);

module.exports = router;
