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

module.exports = {
  findAll,
  findById,
};
