// controllers/opinionesController.js
const pool = require('../db/connection');

exports.getOpiniones = (req, res) => {
    const { id_actividad } = req.params;

    pool.query('SELECT * FROM OPINIONES WHERE ID_actividad = ?', [id_actividad], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener las opiniones' });
        }
        res.json(results);
    });
};

exports.postOpinion = (req, res) => {
    const { id_user, id_actividad, valoracion, comentario } = req.body;

    pool.query(
        'INSERT INTO OPINIONES (ID_user, ID_actividad, valoracion, comentario, fecha_opinion) VALUES (?, ?, ?, ?, NOW())',
        [id_user, id_actividad, valoracion, comentario],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error al subir la opinión' });
            }
            res.json({ message: 'Opinión subida exitosamente', id_opinion: results.insertId });
        }
    );
};
