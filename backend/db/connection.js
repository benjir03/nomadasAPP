// db/connection.js
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nomadland',
    port: 3308
});

module.exports = pool;  // Exporta la pool de conexión solo una vez
