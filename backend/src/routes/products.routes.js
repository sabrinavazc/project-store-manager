const { Router } = require('express');
const productsController = require('../controllers/products.controllers');
const { validateProductName } = require('../middlewares/products.middlewares');
const { validateProductExists } = require('../middlewares/products.middlewares');

const productsRoute = Router();

productsRoute.get('/search', productsController.searchProducts);
productsRoute.get('/', productsController.findAll);
productsRoute.get('/:id', productsController.findById);
productsRoute.post('/', validateProductName, productsController.createProduct);
productsRoute.put(
  '/:id', 
  validateProductName, 
  validateProductExists,
  productsController.updateProduct,
);
productsRoute.delete('/:id', validateProductExists, productsController.deleteProduct);

module.exports = productsRoute;