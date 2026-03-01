const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');

router.get('/', productsController.list);
router.get('/:id', productsController.getById);

module.exports = router;
