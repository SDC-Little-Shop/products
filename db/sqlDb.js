require('dotenv').config();
const postgres = require('postgres');

// const sql = postgres({
//   host: 'localhost',
//   port: '5432',
//   database: 'products',
//   username: '',
//   password: ''
// });

const sql = postgres({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  pasword: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

module.exports.sql = sql;

