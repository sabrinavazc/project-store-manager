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

module.exports = {
  findAllproducts,
  findProductsId,
};
