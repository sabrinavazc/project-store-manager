const salesModel = require('../models/sales.models');

const findAllSales = async () => {
  const sales = await salesModel.listAllSales();
  
  return { code: 'SUCCESS', data: sales };
};

const findSalesId = async (id) => {
  const sale = await salesModel.listSalesById(id);

  if (!sale || sale.length === 0) {
    return { code: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }

  return { code: 'SUCCESS', data: sale };
};

const insertSale = async (productSale) => {
  const sale = await salesModel.insertSale(productSale);

  return { status: 'CREATED', data: sale };
};

const deleteSale = async (id) => {
  const sale = await salesModel.listSalesById(id);
  if (sale.length === 0) {
    return { code: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }
  
  await salesModel.deleteSale(id);
  
  return { code: 'NO_CONTENT' };
};

module.exports = {
  findAllSales,
  findSalesId,
  insertSale,
  deleteSale,
};
