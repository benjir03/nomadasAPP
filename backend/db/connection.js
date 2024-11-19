// db/connection.js
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Nomadland',
    port: 3308
});

module.exports = pool;  // Exporta la pool de conexión solo una vez
