const pool = require('../db/connection');

exports.insertarLugar = (req, res) => {
    const { nombre_actividad } = req.body;

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
        const insertQuery = `INSERT INTO ACTIVIDAD (nombre_actividad) VALUES (?)`;
        pool.query(insertQuery, [nombre_actividad], (err, results) => {
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
