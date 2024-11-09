// db/connection.js
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
<<<<<<< HEAD
    database: 'nomadland',
//  port: 3308
    port: 3306
=======
    database: 'Nomadland',
    port: 3308
>>>>>>> 59009992d6552b2161e998b58dbf46ed90ff7d3b
});

module.exports = pool;  // Exporta la pool de conexión solo una vez
