const productSchema = require('../schemas/product');

const validateProductName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json(
      { message: '"name" is required' },
    ); 
  }
  const { error } = productSchema.validate({ name });
  if (error) {
    return res.status(422).json({ message: error.details[0].message });
  }
  next();
};

module.exports = validateProductName;