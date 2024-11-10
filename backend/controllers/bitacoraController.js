// controllers/bitacoraController.js
const pool = require('../db/connection');

exports.getActividades = (req, res) => {
    const { categoria, userId } = req.query;
    let query = 'SELECT * FROM ACTIVIDAD';
    const params = [];

    if (categoria) {
        query += ' WHERE ID_categoria = ?';
        params.push(categoria);
    }

    if (userId) {
        query = `SELECT A.* FROM ACTIVIDAD A
                 JOIN FAVORITOS F ON A.ID_actividad = F.ID_actividad
                 WHERE F.ID_user = ?`;
        params.push(userId);
    }

    pool.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener las actividades' });
        }
        res.json(results);
    });
};
