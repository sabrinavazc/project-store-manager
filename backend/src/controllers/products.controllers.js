const productsServices = require('../services/products.services');
const statusCode = require('../utils/getStatusHttp');

const findAll = async (_req, res) => {
  const allProducts = await productsServices.findAllproducts;

  res.status(statusCode(allProducts.code)).json(allProducts.data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const productID = await productsServices.findProductsId(id);

  res.status(statusCode(productID.code)).json(productID.data);
};

module.exports = {
  findAll,
  findById,
};
