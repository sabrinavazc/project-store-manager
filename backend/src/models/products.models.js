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

const createProduct = async (name) => {
  const [product] = await connection.execute(
    `
    INSERT INTO products (name)
    VALUES (?)
  `, 
    [name],
  );

  return { id: product.insertId, name };
};

const updateProduct = async (productId, name) => {
  await connection.execute(
    `
    UPDATE products 
    SET name = ? 
    WHERE id = ?
    `,
    [name, productId],
  );

  return { id: Number(productId), name };
};

const deleteProduct = async (productId) => {
  await connection.execute(
    `
    DELETE FROM products 
    WHERE id = ?`,
    [productId],
  );
};

module.exports = {
  listAllProducts,
  listProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
};