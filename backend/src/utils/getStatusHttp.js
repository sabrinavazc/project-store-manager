const HTTP_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  UNPROCESSABLE: 422,
};
  
const getStatusHttp = (code) => HTTP_STATUS[code] || 500;
  
module.exports = getStatusHttp;