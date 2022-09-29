const mysql = require('mysql');
const connection = mysql.createConnection( {
  host : '127.0.0.1',
  port : '3306',
  user : USER,
  password : PWD,
  database : 'express_study_server'
});

module.exports = connection;