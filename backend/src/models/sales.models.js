const camelcase = require('../utils/camelcase');
const connection = require('./connection.model');

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

module.exports = {
  listAllSales,
  listSalesById,
};