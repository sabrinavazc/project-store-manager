const convertArrayString = (data) => {
  const newData = data;
  
  for (let index = 1; index < data.length; index += 1) {
    newData[index] = newData[index].charAt(0).toUpperCase() + newData[index].slice(1);
  }
  return newData.map((item) => item.trim()).join('');
};
  
const parser = (data) => {
  const splittedDataSnakeCase = data.split('_');
  const splittedDataSpace = data.split(' ').filter((item) => item !== '');
  const splittedDataBabelCase = data.split('-');
  
  if (splittedDataSpace.length >= 2) {
    return convertArrayString(splittedDataSpace);
  }
  
  if (splittedDataSnakeCase.length >= 2) {
    return convertArrayString(splittedDataSnakeCase);
  }
  
  if (splittedDataBabelCase.length >= 2) {
    return convertArrayString(splittedDataBabelCase);
  }
  
  return data.trim();
};
  
const camelcase = (data) => {
  if (typeof data === 'object' && !Array.isArray(data)) {
    return Object.entries(data).reduce((acc, [key, value]) => {
      const newKey = parser(key);
      return { ...acc, [newKey]: value };
    }, {});
  }
};
  
module.exports = camelcase;