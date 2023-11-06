const productsModels = require('../models/products.models');
const saleSchema = require('../schemas/sales');

const validateInputSale = (req, res, next) => {
  const saleData = req.body;

  for (let index = 0; index < saleData.length; index += 1) {
    const { error } = saleSchema.schemaSale.validate(saleData[index]);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
  }

  next();
};

const validateProductExists = async (req, _res, next) => {
  const saleData = req.body;
  const productPromises = saleData.map(async (item) => {
    const product = await productsModels.listProductsById(item.productId);
    if (!product) {
      const error = new Error('Product not found');
      error.status = 404;
      throw error;
    }
    return product;
  });

  try {
    await Promise.all(productPromises);
    next();
  } catch (error) {
    next(error);
  }
};

const validateQuantity = (req, res, next) => {
  const saleData = req.body;
  const quantityErrors = [];

  saleData.forEach((data) => {
    if (data.quantity <= 0) {
      quantityErrors.push('"quantity" must be greater than or equal to 1');
    } else if (!data.quantity) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
  });

  if (quantityErrors.length > 0) {
    return res.status(422).json({ message: quantityErrors.join(', ') });
  }

  next();
};

module.exports = {
  validateInputSale,
  validateProductExists,
  validateQuantity,
};

// uhuhul