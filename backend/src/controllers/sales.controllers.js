const salesServices = require('../services/sales.services');
const statusCode = require('../utils/getStatusHttp');

const findAll = async (_req, res) => {
  const allSales = await salesServices.findAllSales();

  res.status(statusCode(allSales.code)).json(allSales.data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const saleID = await salesServices.findSalesId(id);

  res.status(statusCode(saleID.code)).json(saleID.data);
};

const insertSale = async (req, res) => {
  const saleProducts = req.body;
  
  const { status, data } = await salesServices.insertSale(saleProducts);
  return res.status(statusCode(status)).json(data);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const saleDelete = await salesServices.deleteSale(id);
  
  res.status(statusCode(saleDelete.code)).json(saleDelete.data);
};

module.exports = {
  findAll,
  findById,
  insertSale,
  deleteSale,
};
