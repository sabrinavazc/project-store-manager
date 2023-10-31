const { Router } = require('express');
const productsController = require('../controllers/products.controllers');
const validateProductName = require('../middlewares/index');

const productsRoute = Router();

productsRoute.get('/', productsController.findAll);
productsRoute.get('/:id', productsController.findById);
productsRoute.post('/', validateProductName, productsController.createProduct);

module.exports = productsRoute;