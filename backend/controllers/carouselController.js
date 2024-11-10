const pool = require('../db/connection');

exports.datos = (req, res) => {
    // Obtiene todos los campos de CAROUSEL
    pool.query('SELECT imagen, titulo, descripcion, direccion FROM CAROUSEL', (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ error: 'Carousel no encontrado' });
        }
        res.json(results); // Envía todos los campos de la base de datos
    });
};