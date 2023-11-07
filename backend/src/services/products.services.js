const productsModel = require('../models/products.models');

const findAllproducts = async () => {
  const products = await productsModel.listAllProducts();
  
  return { code: 'SUCCESS', data: products };
};

const findProductsId = async (id) => {
  const product = await productsModel.listProductsById(id);

  if (!product) {
    return { code: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  return { code: 'SUCCESS', data: product };
};

const createProduct = async (name) => {
  if (!name) {
    return { code: 'UNPROCESSABLE', data: { message: '"name" is required' } };
  }

  const product = await productsModel.createProduct(name);

  return { code: 'CREATED', data: product };
};

const updateProduct = async (productId, name) => {
  const product = await productsModel.updateProduct(productId, name);

  return { code: 'SUCCESS', data: product };
};

module.exports = {
  findAllproducts,
  findProductsId,
  createProduct,
  updateProduct,
};
