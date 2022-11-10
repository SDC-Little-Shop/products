const postgres = require('postgres')

const sql = postgres({
  host: 'localhost',
  port: '5432',
  database: 'products',
  username: '',
  password: ''
});

module.exports.sql = sql;

