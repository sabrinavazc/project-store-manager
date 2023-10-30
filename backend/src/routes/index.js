const { Router } = require('express');
const productsRouter = require('./products.routes');
const salesRouter = require('./sales.routes');

const routes = Router();
routes.use('/products', productsRouter);
routes.use('/sales', salesRouter);

module.exports = routes;