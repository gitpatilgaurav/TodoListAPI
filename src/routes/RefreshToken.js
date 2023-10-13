const express = require('express');
const { generateToken } = require('../controllers/GenerateTokenController');
const router = express.Router();

router.get('/', generateToken);

module.exports = router;
