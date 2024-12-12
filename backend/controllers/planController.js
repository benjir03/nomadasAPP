const pool = require('../db/connection');

exports.insertarLugar = (req, res) => {
    const { nombre_actividad, imagen_actividad } = req.body;

    // Verificar si el registro ya existe
    const checkQuery = `SELECT ID_actividad FROM Actividad WHERE nombre_actividad = ?`;
    pool.query(checkQuery, [nombre_actividad], (err, results) => {
        if (err) {
            console.error('Error al verificar existencia:', err);
            return res.status(500).json({ error: 'Error al verificar existencia' });
        }

        if (results.length > 0) {
            // Si ya existe, devolver el ID existente
            return res.json({
                message: 'Lugar ya existente',
                id: results[0].ID_actividad,
            });
        }

        // Si no existe, insertar nuevo registro
        const insertQuery = `INSERT INTO ACTIVIDAD (nombre_actividad, imagen_actividad) VALUES (?, ?)`;
        pool.query(insertQuery, [nombre_actividad, imagen_actividad], (err, results) => {
            if (err) {
                console.error('Error en la inserción de actividad:', err);
                return res.status(500).json({ error: 'Error en la inserción' });
            }

            // Obtener el ID insertado
            const lastInsertedId = results.insertId;

            // Insertar en PLAN_ACTIVIDADES usando el ID recién generado
            const planactividadQuery = `INSERT INTO PLAN_ACTIVIDADES (ID_actividad) VALUES (?)`;
            pool.query(planactividadQuery, [lastInsertedId], (err, planResults) => {
                if (err) {
                    console.error('Error al insertar en PLAN_ACTIVIDADES:', err);
                    return res.status(500).json({ error: 'Error al insertar en PLAN_ACTIVIDADES' });
                }

                // Insertar en PLAN con el ID del usuario y el ID del plan de actividades
                const userId = req.userId;
                const lasID = planResults.insertId; // ID del plan_actividades
                const planQuery = `INSERT INTO PLAN (ID_user, ID_plan_actividades) VALUES (?, ?)`;

                pool.query(planQuery, [userId, lasID], (err, planres) => {
                    if (err) {
                        console.error('Error en la creación de plan:', err);
                        return res.status(500).json({ error: 'Error al insertar en PLAN' });
                    }

                    // Respuesta final
                    res.json({
                        message: 'Lugar registrado, actividad asociada al plan y plan creado',
                        id: lastInsertedId,
                    });
                });
            });
        });
    });
};

exports.obtenerPlan = (req, res) => {
    const userId = req.userId;
    // Obtiene todos los campos del usuario
    pool.query('SELECT * FROM PLAN as p INNER JOIN PLAN_ACTIVIDADES as pa on p.ID_plan_actividades = pa.ID_plan_actividades INNER JOIN ACTIVIDAD as a on pa.ID_actividad = a.ID_actividad WHERE p.ID_user = ?', [userId], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ error: 'Plan para usuario no encontrado' });
        }
        res.json(results); // Envía todos los campos de la base de datos
    });
};

exports.deleteActividad = (req, res) => {
    const userId = req.userId;
    const { nombre_actividad } = req.body;
    // Obtiene todos los campos del usuario
    pool.query(`
            DELETE pa, p
            FROM PLAN_ACTIVIDADES AS pa
            INNER JOIN PLAN AS p ON pa.ID_plan_actividades = p.ID_plan_actividades
            INNER JOIN ACTIVIDAD AS a ON a.ID_actividad = pa.ID_actividad
            WHERE p.ID_user = ? AND a.nombre_actividad = ?`, 
            [userId, nombre_actividad], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Plan para usuario no encontrado' });
        }
        res.json({ message: 'Actividad eliminada exitosamente' })
    });
};