const express = require('express');
const router = express.Router();
const { updateTaskById } = require('../controllers/UpdateTaskModel');

router.put('/:id', updateTaskById);

module.exports = router;
