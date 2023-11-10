const snakeize = require('snakeize');

const getFormattedColumnNames = (data) => 
  Object.keys(snakeize(data)).join(', ');

const getFormattedPlaceHolders = (data) => 
  Object.keys(snakeize(data)).map(() => '?').join(', ');

const getFormattedUpdateColumns = (object) => 
  Object.keys(snakeize(object)).map((key) => `${key} = ?`).join(', ');

module.exports = {
  getFormattedColumnNames,
  getFormattedPlaceHolders,
  getFormattedUpdateColumns,
};
