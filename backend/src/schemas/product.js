const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(5).messages({
    'any.required': '"name" is required', 
    'string.min': '"name" length must be at least 5 characters long',
  }),
});

module.exports = productSchema;
