//abstraccion que representa una  tablaa de base de datos
import db from "../database/db.js";
//importacion Sequelize
import { DataTypes } from "sequelize";

const BlogModel = db.define('Usuario',{
    nombre: {type: DataTypes.STRING},
    correo: {type: DataTypes.STRING}
})

export default BlogModel