const { Router } = require('express');
const productsController = require('../controllers/products.controllers');
const { validateProductName } = require('../middlewares/products.middlewares');
const { validateProductExists } = require('../middlewares/products.middlewares');

const productsRoute = Router();

productsRoute.get('/', productsController.findAll);
productsRoute.get('/:id', productsController.findById);
productsRoute.post('/', validateProductName, productsController.createProduct);
productsRoute.put(
  '/:id', 
  validateProductName, 
  validateProductExists,
  productsController.updateProduct,
);

module.exports = productsRoute;