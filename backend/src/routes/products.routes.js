const { Router } = require('express');
const productsController = require('../controllers/products.controllers');

const productsRoute = Router();

productsRoute.get('/', productsController.findAll);
productsRoute.get('/:id', productsController.findById);
productsRoute.post('/', productsController.createProduct);

module.exports = productsRoute;