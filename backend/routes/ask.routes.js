const express = require('express');
const router = express.Router();
const askController = require('../controllers/ask.controller');

router.post('/', askController.ask);

module.exports = router;
