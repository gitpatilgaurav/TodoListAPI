const express = require('express');
const router = express.Router();
const { getTaskById } = require('../controllers/ShowTaskByIdModel');

router.get('/:id', getTaskById);

module.exports = router;
