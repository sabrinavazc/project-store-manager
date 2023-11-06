const Joi = require('joi');

const schemaSale = Joi.object({
  productId: Joi.number()
    .integer()
    .required()
    .label('productId'),
  quantity: Joi.number()
    .integer()
    .min(1)
    .required()
    .label('quantity'),
}).messages({
  'number.required': '{{#label}} is required',
  'number.min': '{{#label}} must be greater than or equal to {{#limit}}',
});

module.exports = {
  schemaSale,
};