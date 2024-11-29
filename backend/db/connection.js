// db/connection.js
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Nomadland',
    //port: 3308
    port: 3306
});

module.exports = pool;  // Exporta la pool de conexión solo una vez
