const { Router } = require('express');
const salesController = require('../controllers/sales.controllers');

const salesRoute = Router();

salesRoute.get('/', salesController.findAll);
salesRoute.get('/:id', salesController.findById);

module.exports = salesRoute;