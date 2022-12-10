const mysql = require('mysql');
require('dotenv').config();

const password=process.env.DB_PASSWORD;
const host='127.0.0.1';
const username=process.env.DB_USER;

module.exports = {
    connection: mysql.createConnection({
        host: host,
        user: username,
        password: password,
        database: '2022_web_project',
    }),
}