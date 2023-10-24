const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: process.env.MYSQL_HOSTNAME || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'StoreManager',
  port: process.env.MYSQL_PORT || 3306,
});

module.exports = connection;
