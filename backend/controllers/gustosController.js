const jwt = require('jsonwebtoken');
const pool = require('../db/connection');

// Función para obtener el perfil de usuario completo
exports.getGustos = (req, res) => {
    const userId = req.userId;
    // Obtiene todos los campos del usuario
    pool.query('SELECT * FROM PREFERENCIAS WHERE ID_user = ?', [userId], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(results[0]); // Envía todos los campos de la base de datos
        //console.log(userId, results[0]);
    });
};

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


exports.modificar = (req, res) => {
    const userId = req.userId;
    const { 
        ID_categoria, ID_estacion, duracion, compañia, turistico, 
        pets, vegano, capacidades_diferentes, valor_de_preferencia 
    } = req.body;

    const query = `
        UPDATE PREFERENCIAS 
        SET 
            ID_categoria = ?, 
            ID_estacion = ?, 
            duracion = ?, 
            compañia = ?, 
            turistico = ?, 
            pets = ?, 
            vegano = ?, 
            capacidades_diferentes = ?, 
            valor_de_preferencia = ?
        WHERE 
            ID_user = ?
    `;

    const valores = [
        Array.isArray(ID_categoria) ? ID_categoria[0] : ID_categoria, // Asegurar que sea un único valor
        ID_estacion, duracion, compañia, turistico,
        pets, vegano, capacidades_diferentes, valor_de_preferencia,
        userId
    ];

    pool.query(query, valores, (err, results) => {
        if (err) {
            console.error('Error al modificar preferencias:', err);
            return res.status(500).json({ error: 'Error al modificar preferencias' });
        }

        res.json({ message: 'Preferencias actualizadas exitosamente' });
    });
};


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

exports.gustos = (req, res) => {
    const userId = req.userId;

    const query = `
        SELECT 
            ID_preferencia,
            ID_user,
            ID_categoria,
            ID_estacion,
            duracion,
            compañia,
            turistico,
            pets,
            vegano,
            capacidades_diferentes,
            valor_de_preferencia
        FROM 
            PREFERENCIAS
        WHERE 
            ID_user = ?
    `;

    pool.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error al obtener preferencias:', err);
            return res.status(500).json({ error: 'Error al obtener preferencias' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'No se encontraron preferencias para el usuario' });
        }

        const preferencias = results[0];
        res.json({
            ...preferencias,
            ID_categoria: preferencias.ID_categoria ? [preferencias.ID_categoria] : [] // Convertir a array si es necesario
        });
    });
};
