const DATE = '2023-10-19T20:48:59.000Z';

const salesFromDB = [[
  {
    saleId: 1,
    date: DATE,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: DATE,
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: DATE,
    productId: 3,
    quantity: 15,
  },
]];

const salesFromModel = [
  {
    saleId: 1,
    date: DATE,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: DATE,
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: DATE,
    productId: 3,
    quantity: 15,
  },
]; 

const saleFromDB = [[
  {
    saleId: 1,
    date: DATE,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: DATE,
    productId: 2,
    quantity: 10,
  },
]];

const saleFromModel = [
  {
    saleId: 1,
    date: DATE,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: DATE,
    productId: 2,
    quantity: 10,
  },
];

module.exports = {
  salesFromDB,
  salesFromModel,
  saleFromDB,
  saleFromModel,
};