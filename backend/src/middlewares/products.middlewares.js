const productSchema = require('../schemas/product');
const statusCode = require('../utils/getStatusHttp');
const productsServices = require('../services/products.services');
const productsModel = require('../models/products.models');

const validateProductName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json(
      { message: '"name" is required' },
    ); 
  }
  const { error } = productSchema.validate({ name });
  if (error) {
    return res.status(422).json({ message: error.details[0].message });
  }
  next();
};

const validateProductExists = async (req, res, next) => {
  const { id } = req.params;
  const foundProduct = await productsModel.listProductsById(id);
  const { status, data } = await productsServices.findProductsId(id);
  
  if (!foundProduct) {
    return res.status(404).json({ message: data.message });
  } 
  if (data.message) {
    return res.status(statusCode(status)).json({ message: data.message });
  }
  
  return next();
};

module.exports = {
  validateProductName,
  validateProductExists,
};