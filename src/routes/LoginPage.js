const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(express.urlencoded({extended: true}));
const { login } = require("../controllers/LoginController");
const { loginLogic } = require("../controllers/LoginLogicController");

router.get("/", login);
router.post("/",loginLogic);

module.exports = router;
