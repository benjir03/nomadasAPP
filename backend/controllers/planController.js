const pool = require('../db/connection');

exports.insertarLugar = (req, res) => {
    const { nombre_actividad, imagen_actividad, ID_google, controlador } = req.body;
    const userId = req.userId;

    // Verificar si el registro ya existe
    const checkQuery = `SELECT ID_actividad FROM Actividad WHERE nombre_actividad = ?`;
    pool.query(checkQuery, [nombre_actividad], (err, results) => {
        if (err) {
            console.error('Error al verificar existencia:', err);
            return res.status(500).json({ error: 'Error al verificar existencia' });
        }

        if (results.length > 0) {
            // Si ya existe, llama a nuevoPlan con el ID existente
            return this.nuevoPlan(
                { ...req, body: { actividadId: results[0].ID_actividad } },
                res
            );
        }

        // Si no existe, insertar nuevo registro
        const insertQuery = `INSERT INTO ACTIVIDAD (nombre_actividad, imagen_actividad, ID_google) VALUES (?, ?, ?)`;
        pool.query(insertQuery, [nombre_actividad, imagen_actividad, ID_google], (err, results) => {
            if (err) {
                console.error('Error en la inserción de actividad:', err);
                return res.status(500).json({ error: 'Error en la inserción' });
            }

            // Llama a nuevoPlan con el ID recién generado
            const lastInsertedId = results.insertId;
            this.nuevoPlan(
                { ...req, body: { actividadId: lastInsertedId } },
                res
            );
        });
    });
};

// Función para crear un nuevo plan
exports.nuevoPlan = (req, res) => {
    const { actividadId } = req.body; // ID de la actividad que viene del cliente o de insertarLugar
    const userId = req.userId;

    // Insertar en PLAN_ACTIVIDADES
    const planactividadQuery = `INSERT INTO PLAN_ACTIVIDADES (ID_actividad) VALUES (?)`;
    pool.query(planactividadQuery, [actividadId], (err, planResults) => {
        if (err) {
            console.error('Error al insertar en PLAN_ACTIVIDADES:', err);
            return res.status(500).json({ error: 'Error al insertar en PLAN_ACTIVIDADES' });
        }

        // Obtener el ID recién generado de PLAN_ACTIVIDADES
        const planActividadId = planResults.insertId;

        // Insertar en PLAN con el ID del usuario y el ID de PLAN_ACTIVIDADES
        const planQuery = `INSERT INTO PLAN (ID_user, ID_plan_actividades) VALUES (?, ?)`;
        pool.query(planQuery, [userId, planActividadId], (err, planres) => {
            if (err) {
                console.error('Error en la creación de plan:', err);
                return res.status(500).json({ error: 'Error al insertar en PLAN' });
            }

            // Respuesta final
            res.json({
                message: 'Plan creado exitosamente',
                planId: planres.insertId,
            });
        });
    });
};

exports.insertarPlan = (req, res) =>{
    const { actividadId } = req.body; // ID de la actividad que viene del cliente o de insertarLugar
    const userId = req.userId;

    const lastPlanQuery = `SELECT MAX(ID_plan) AS ultimoID FROM PLAN`;
    pool.query(lastPlanQuery, (err, results) => {
        if (err) {
            console.error('Error al obtener el último ID de PLAN:', err);
            return res.status(500).json({ error: 'Error al obtener el último ID' });
        }

        const ultimoID = results[0].ultimoID; // Último ID en la tabla
        console.log(`El último ID de PLAN es: ${ultimoID}`);
    });

    // Insertar en PLAN_ACTIVIDADES
    const planactividadQuery = `INSERT INTO PLAN_ACTIVIDADES (ID_actividad) VALUES (?)`;
    pool.query(planactividadQuery, [actividadId], (err, planResults) => {
        if (err) {
            console.error('Error al insertar en PLAN_ACTIVIDADES:', err);
            return res.status(500).json({ error: 'Error al insertar en PLAN_ACTIVIDADES' });
        }

        // Obtener el ID recién generado de PLAN_ACTIVIDADES
        const planActividadId = planResults.insertId;

        // Insertar en PLAN con el ID del usuario y el ID de PLAN_ACTIVIDADES
        const planQuery = `INSERT INTO PLAN (ID_user, ID_plan_actividades) VALUES (?, ?)`;
        pool.query(planQuery, [userId, planActividadId], (err, planres) => {
            if (err) {
                console.error('Error en la creación de plan:', err);
                return res.status(500).json({ error: 'Error al insertar en PLAN' });
            }

            // Respuesta final
            res.json({
                message: 'Plan creado exitosamente',
                planId: planres.insertId,
            });
        });
    });
}

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