const productService = require('../services/product.service');

exports.list = (req, res, next) => {
  try {
    const { category, q } = req.query;
    const products = productService.getAll({ category, q });
    res.json(products);
  } catch (err) {
    next(err);
  }
};

exports.getById = (req, res, next) => {
  try {
    const id = req.params.id;
    const items = productService.getAll();
    const found = items.find((p) => p.id === id);
    if (!found) return res.status(404).json({ error: 'Product not found' });
    return res.json(found);
  } catch (err) {
    next(err);
  }
};
