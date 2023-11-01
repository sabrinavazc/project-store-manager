const camelcase = require('../utils/camelcase');
const connection = require('./connection.model');
// const { getFormattedColumnNames, getFormattedPlaceHolders } = require('../utils/snakeize');

const listAllSales = async () => {
  const [sales] = await connection.execute(
    `SELECT 
        sale_id, 
        product_id,
        quantity,
        date 
     FROM 
        sales 
     INNER JOIN 
        sales_products 
     ON 
        sale_id = id 
     ORDER BY 
        sale_id ASC`,
  );
  return sales.map(camelcase);
};

const listSalesById = async (id = undefined) => {
  if (id) {
    const [sale] = await connection.execute(`
     SELECT    product_id,
        quantity,
        date
     FROM
        sales
     INNER JOIN
        sales_products
     ON
        sale_id = id
     WHERE 
        sale_id = ?
     ORDER BY 
        sale_id ASC, product_id ASC`, [id]);
    return sale.map(camelcase);
  }
};

// const insertSale = async (sales) => {
//   const [{ insertId }] = await connection.execute(`
//    INSERT INTO sales VALUES ();
//    `);
//   const createPromisses = sales.map(async ({ productId, quantity }) => {
//     const saleProduct = { saleId: insertId, productId, quantity };

//     const column = getFormattedColumnNames(saleProduct);
//     const placeHolder = getFormattedPlaceHolders(saleProduct);
    
//     const query = `
//     INSERT INTO sales_products (${column}) VALUES (${placeHolder})
//     `;

//     return connection.execute(query, [...Object.values(saleProduct)]);
//   });

//   const result = await Promise.all(createPromisses);
//   const isCreated = result.every(([{ affectedRows }]) => affectedRows === 1);
//   if (isCreated) return { id: insertId, itemsSold: sales };
// };

const insertSale = async (product) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales () VALUES ()',
  );
  product.map(async (item) => {
    await connection.execute(
      'INSERT INTO sales_products (product_id, sale_id, quantity) VALUES (?, ?, ?)',
      [item.productId, insertId, item.quantity],
    );
  });
  return { id: insertId, itemsSold: product };
};

module.exports = {
  listAllSales,
  listSalesById,
  insertSale,
};