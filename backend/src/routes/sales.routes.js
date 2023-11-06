const { Router } = require('express');
const salesController = require('../controllers/sales.controllers');
const { validateInputSale, validateProductExists,
  validateQuantity } = require('../middlewares/sales.middlewares');
const handleErrors = require('../middlewares/get.errors');

const salesRoute = Router();

salesRoute.get('/', salesController.findAll);
salesRoute.get('/:id', salesController.findById);
salesRoute.post(
  '/', 
  validateQuantity,
  validateInputSale,
  validateProductExists,
  handleErrors, 
  salesController.insertSale,
);

module.exports = salesRoute;