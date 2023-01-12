// import mysql from env
const env = require('./../../env');

const connection = env.mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'products'
})

module.exports = connection;