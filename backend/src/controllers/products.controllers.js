const productsServices = require('../services/products.services');
const statusCode = require('../utils/getStatusHttp');

const findAll = async (_req, res) => {
  const allProducts = await productsServices.findAllproducts();

  res.status(statusCode(allProducts.code)).json(allProducts.data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const productID = await productsServices.findProductsId(id);

  res.status(statusCode(productID.code)).json(productID.data);
};

const createProduct = async (req, res) => {
  const { name } = req.body;

  const product = await productsServices.createProduct(name);

  res.status(statusCode(product.code)).json(product.data);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  
  const product = await productsServices.updateProduct(id, name);
  
  res.status(statusCode(product.code)).json(product.data);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const productDelete = await productsServices.deleteProduct(id);

  res.status(statusCode(productDelete.code)).json(productDelete.data);
};

const searchProducts = async (req, res) => {
  const { q } = req.query;

  const products = await productsServices.searchProducts(q);

  res.status(statusCode(products.code)).json(products.data);
};

module.exports = {
  findAll,
  findById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
};
