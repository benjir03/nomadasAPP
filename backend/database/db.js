//Conexion a la base de datos
import { Sequelize } from "sequelize";

const db = new Sequelize('nomadland', 'root', '',{
    host: 'localhost',
    dialect: 'mysql'
});

export default db