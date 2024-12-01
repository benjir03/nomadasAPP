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
    const userId = req.userId;
    const { transporte, duracion, compañia, turistico, pets, vegano, pet_friendly, capacidades_diferentes, mayoria_edad, ID_estacion, ID_categoria,
    } = req.body || {};
    // Actualiza el perfil del usuario en la base de datos
    pool.query(
        'UPDATE USUARIO SET nombre = ?, apellido = ?, fecha_nacimiento = ?, genero = ?, telefono = ? WHERE ID_user = ?',
        [nombre, apellido, fecha_nacimiento, genero, telefono, userId],
        (err, results) => {
            if (err) {
                console.error('Error al actualizar el perfil:', err);
                return res.status(500).json({ error: 'Error al actualizar el perfil' });
            }

            res.json({ message: 'Perfil actualizado exitosamente' }); // Envía todos los campos de la base de datos
            console.log(userId, results[0]);
        }
    );
}

exports.eliminar = (req, res) =>{
    const userId = req.userId;
    pool.query('DELETE FROM PREFERENCIAS WHERE ID_user = ?', [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar Preferencias' });
        }else{
            res.clearCookie('sessionToken'); // Elimina la cookie de sesión
            res.json({ message: 'Preferencias eliminadas exitosamente' });
        } 
    });
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