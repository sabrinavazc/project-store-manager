const snakeize = require('snakeize');

const formattedColumnNames = (data) => 
  Object.keys(snakeize(data)).join(', ');

const formattedPlaceHolders = (data) => 
  Object.keys(snakeize(data)).map(() => '?').join(', ');

const formattedUpdateColumns = (object) => 
  Object.keys(snakeize(object)).map((key) => `${key} = ?`).join(', ');

module.exports = {
  formattedColumnNames,
  formattedPlaceHolders,
  formattedUpdateColumns,
};
