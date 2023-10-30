// const camelize = require('camelize');
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
  //   return camelize(sales);
  return sales;
};

const listSalesById = async (saleId) => {
  const [[sale]] = await connection.execute(`
     SELECT
        product_id,
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
        sale_id ASC, product_id ASC`, [saleId]);
  //   return camelize(sale);
  return sale;
};

module.exports = {
  listAllSales,
  listSalesById,
};