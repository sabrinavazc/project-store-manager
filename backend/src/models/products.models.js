const connection = require('./connection.model');

const listAllProducts = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products ORDER BY id',
  );
  return products;
};

const listProductsById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?', 
    [productId],
  );
  return product;
};

module.exports = {
  listAllProducts,
  listProductsById,
};