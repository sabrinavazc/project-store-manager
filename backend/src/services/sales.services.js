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

module.exports = {
  findAllSales,
  findSalesId,
};
