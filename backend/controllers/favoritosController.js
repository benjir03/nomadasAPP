const pool = require('../db/connection');

exports.registrar = (req, res) => {
    const { ID_actividad } = req.body; // Datos del cliente
    const userId = req.userId; // ID del usuario autenticado
    console.log("Valores recibidos en el backend:", req.body);

    // Verificar si el registro ya existe en la tabla FAVORITOS
    const checkQuery = `SELECT ID_Favoritos FROM FAVORITOS WHERE ID_user = ? AND ID_actividad = ?`;
    pool.query(checkQuery, [userId, ID_actividad], (err, results) => {
        if (err) {
            console.error('Error al verificar existencia en FAVORITOS:', err);
            return res.status(500).json({ error: 'Error al verificar existencia en favoritos' });
        }

        if (results.length > 0) {
            // Si ya existe, responde con un mensaje indicando que ya está en favoritos
            return res.status(200).json({ message: 'La actividad ya está en favoritos' });
        }

        // Insertar en la tabla FAVORITOS
        const insertQuery = `
            INSERT INTO FAVORITOS (ID_user, ID_actividad)
            VALUES (?, ?)
        `;
        pool.query(insertQuery, [userId, ID_actividad], (err, results) => {
            if (err) {
                console.error('Error al insertar en FAVORITOS:', err);
                return res.status(500).json({ error: 'Error al guardar en favoritos' });
            }

            res.json({ message: 'Actividad guardada en favoritos exitosamente' });
        });
    });
};

exports.obtener = (req, res) => {
    const ID_user = req.userId;

    const query = `
        SELECT * FROM FAVORITOS AS f
        INNER JOIN ACTIVIDAD AS a ON f.ID_actividad = a.ID_actividad
        WHERE f.ID_user = ?
    `;

    pool.query(query, [ID_user], (err, results) => {
        if (err) {
            console.error('Error al obtener favoritos:', err);
            return res.status(500).json({ error: 'Error al obtener favoritos' });
        }

        res.json(results);
    });
};

exports.eliminar = (req, res) => {
    const ID_user = req.userId;
    const { ID_actividad } = req.body;

    const query = `
        DELETE FROM FAVORITOS
        WHERE ID_user = ? AND ID_actividad = ?
    `;

    pool.query(query, [ID_user, ID_actividad], (err, results) => {
        if (err) {
            console.error('Error al eliminar favorito:', err);
            return res.status(500).json({ error: 'Error al eliminar favorito' });
        }

        res.json({ message: 'Favorito eliminado exitosamente' });
    });
};
