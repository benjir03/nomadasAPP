const jwt = require('jsonwebtoken');
const pool = require('../db/connection');

exports.registrar = (req, res) => {
    const ID_user = req.userId; // ID del usuario autenticado, extraído del token
    const { transporte, duracion, compañia, turistico, pets, vegano, pet_friendly, capacidades_diferentes, mayoria_edad, ID_estacion, ID_categoria,
    } = req.body || {};

    console.log("Valores recibidos en el backend:", req.body);
    
    // Query para insertar en la tabla PREFERENCIAS
    const query = `
        INSERT INTO PREFERENCIAS (
            ID_user, ID_categoria, ID_estacion, duracion, compañia, turistico, pets, vegano, capacidades_diferentes
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    // Valores en el mismo orden que las columnas
    const valores = [ ID_user, ID_categoria, ID_estacion, duracion, compañia, turistico, pets, vegano, capacidades_diferentes,];

    // Ejecutar la consulta
    pool.query(query, valores, (err, results) => {
        if (err) {
            console.error('Error en la inserción:', err);
            return res.status(500).json({ error: 'Error en la inserción' });
        }

        res.json({ message: 'Preferencias guardadas exitosamente', results });
        console.log({ message: 'Preferencias insertadas', results });
    });
};


exports.modificar = (req, res) =>{

}

exports.gustos = (req, res) =>{
    const userId = req.userId;
    // Obtiene todos los campos del usuario
    pool.query('SELECT * FROM PREFERENCIAS as p INNER JOIN CATEGORIAS as c on p.ID_categoria = c.ID_categoria inner join ESTACION as e on p.ID_estacion = e.ID_estacion WHERE p.ID_user = ?', [userId], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ error: 'Preferencias de usuario no encontrado' });
        }
        res.json(results[0]); // Envía todos los campos de la base de datos
        console.log(userId, results[0]);
    });
}