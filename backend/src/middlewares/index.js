const { validateProductName, validateProductExists } = require('./products.middlewares');
const validateSales = require('./sales.middlewares');

module.exports = {
  validateProductName,
  validateSales,
  validateProductExists,
};