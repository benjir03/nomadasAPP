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

        switch (controlador) {
            case 1:
                if (results.length > 0) {
                    // Si ya existe, llama a insertarPlan con el ID existente
                    return this.insertarPlan(
                        { ...req, body: { actividadId: results[0].ID_actividad } },
                        res
                    );
                }
                break;
            case 2:
                if (results.length > 0) {
                    // Si ya existe, llama a nuevoPlan con el ID existente
                    return this.nuevoPlan(
                        { ...req, body: { actividadId: results[0].ID_actividad } },
                        res
                    );
                }
                break;
        
            case 3:
                if (results.length > 0) {
                    // Si ya existe, llama a nuevoPlan con el ID existente
                    return this.registrarFavorita(
                        { ...req, body: { actividadId: results[0].ID_actividad } },
                        res
                    );
                }
                break;
        }        

        // Si no existe, insertar nuevo registro
        const insertQuery = `INSERT INTO ACTIVIDAD (nombre_actividad, imagen_actividad, ID_google) VALUES (?, ?, ?)`;
        pool.query(insertQuery, [nombre_actividad, imagen_actividad, ID_google], (err, results) => {
            if (err) {
                console.error('Error en la inserción de actividad:', err);
                return res.status(500).json({ error: 'Error en la inserción' });
            }
            const lastInsertedId = results.insertId; // Extraer el ID antes del switch

            switch (controlador) {
                case 1:
                    if (results.length > 0) {
                        // Si ya existe, llama a insertarPlan con el ID existente
                        return this.insertarPlan(
                            { ...req, body: { actividadId: lastInsertedId } },
                            res
                        );
                    }
                    break;
                case 2:
                    // Llama a nuevoPlan con el ID recién generado
                    return this.nuevoPlan(
                        { ...req, body: { actividadId: lastInsertedId } },
                        res
                    );
                    break;
                
                case 3:
                    return this.registrarFavorita(
                        { ... req, body:{actividadId: lastInsertedId}},
                        res
                    );
                    break;
            }

        });
    });
};

// Función para crear un nuevo plan
exports.nuevoPlan = (req, res) => {
    const { actividadId } = req.body; // ID de la actividad
    const userId = req.userId;

    // Insertar en la tabla PLAN
    const planQuery = `INSERT INTO PLAN (ID_user) VALUES (?)`;
    pool.query(planQuery, [userId], (err, planResult) => {
        if (err) {
            console.error('Error al insertar en PLAN:', err);
            return res.status(500).json({ error: 'Error al insertar en PLAN' });
        }

        const planId = planResult.insertId; // ID del plan recién creado
        console.log(`Nuevo ID de PLAN: ${planId}`);

        // Insertar en la tabla PLAN_ACTIVIDADES
        const planactividadQuery = `INSERT INTO PLAN_ACTIVIDADES (ID_actividad, ID_plan) VALUES (?, ?)`;
        pool.query(planactividadQuery, [actividadId, planId], (err) => {
            if (err) {
                console.error('Error al insertar en PLAN_ACTIVIDADES:', err);
                return res.status(500).json({ error: 'Error al insertar en PLAN_ACTIVIDADES' });
            }

            res.json({
                message: 'Plan creado exitosamente',
                planId: planId,
            });
        });
    });
};

exports.insertarPlan = (req, res) => {
    const { actividadId } = req.body;
    const userId = req.userId;

    // Obtener el último ID del plan para el usuario
    const lastPlanQuery = `SELECT MAX(ID_plan) AS ultimoID FROM PLAN WHERE ID_user = ?`;
    pool.query(lastPlanQuery, [userId], (err, results) => {
        if (err) {
            console.error('Error al obtener el último ID de PLAN:', err);
            return res.status(500).json({ error: 'Error al obtener el último ID' });
        }

        const ultimoID = results[0]?.ultimoID;
        if (!ultimoID) {
            return res.status(400).json({ error: 'No se encontró ningún plan para este usuario' });
        }

        // Insertar en PLAN_ACTIVIDADES
        const planactividadQuery = `INSERT INTO PLAN_ACTIVIDADES (ID_actividad, ID_plan) VALUES (?, ?)`;
        pool.query(planactividadQuery, [actividadId, ultimoID], (err) => {
            if (err) {
                console.error('Error al insertar en PLAN_ACTIVIDADES:', err);
                return res.status(500).json({ error: 'Error al insertar en PLAN_ACTIVIDADES' });
            }

            res.json({
                message: 'Actividad agregada al plan exitosamente',
                planId: ultimoID,
            });
        });
    });
};

exports.obtenerPlan = (req, res) => {
    const userId = req.userId;
    const lastPlanQuery = `SELECT MAX(ID_plan) AS ultimoID FROM PLAN WHERE ID_user = ?`;
    pool.query(lastPlanQuery, [userId], (err, results) => {
        if (err) {
            console.error('Error al obtener el último ID de PLAN:', err);
            return res.status(500).json({ error: 'Error al obtener el último ID' });
        }

        const ultimoID = results[0]?.ultimoID || 0; // Si no hay resultados, asignar 0 por defecto
        console.log(`El último ID de PLAN es: ${ultimoID}`);
            // Obtiene todos los campos del usuario
    pool.query('SELECT * FROM PLAN as p INNER JOIN PLAN_ACTIVIDADES as pa on p.ID_plan = pa.ID_plan INNER JOIN ACTIVIDAD as a on pa.ID_actividad = a.ID_actividad WHERE p.ID_user = ? and p.ID_plan = ?', [userId, ultimoID], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ error: 'Plan para usuario no encontrado' });
        }
        res.json(results); // Envía todos los campos de la base de datos
    });
    });
};

exports.verPlanes = (req, res) => {
    const userId = req.userId;
    const lastPlanQuery = `SELECT *  FROM PLAN WHERE ID_user = ?`;
    pool.query(lastPlanQuery, [userId], (err, results) => {
        if (err) {
            console.error('Error al obtener el último ID de PLAN:', err);
            return res.status(500).json({ error: 'Error al obtener el último ID' });
        }
        res.json(results); // Envía todos los campos de la base de datos
    });
};

exports.deleteActividad = (req, res) => {
    const userId = req.userId;
    const { ID_actividad } = req.body;
    // Obtiene todos los campos del usuario
    console.log('datos recibidos al back ', req.body);
    
    pool.query(`
            DELETE pa, p
            FROM PLAN_ACTIVIDADES AS pa
            INNER JOIN PLAN AS p ON pa.ID_plan = p.ID_plan
            INNER JOIN ACTIVIDAD AS a ON a.ID_actividad = pa.ID_actividad
            WHERE p.ID_user = ? AND a.ID_actividad = ?`, 
            [userId, ID_actividad], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Plan para usuario no encontrado' });
        }
        res.json({ message: 'Actividad eliminada exitosamente' })
    });
};

exports.registrarFavorita = (req, res) => {
    const { actividadId } = req.body; // Datos del cliente
    const userId = req.userId; // ID del usuario autenticado
    console.log("Valores recibidos en el backend:", req.body);

    // Verificar si el registro ya existe en la tabla FAVORITOS
    const checkQuery = `SELECT ID_Favoritos FROM FAVORITOS WHERE ID_user = ? AND ID_actividad = ?`;
    pool.query(checkQuery, [userId, actividadId], (err, results) => {
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
        pool.query(insertQuery, [userId, actividadId], (err, results) => {
            if (err) {
                console.error('Error al insertar en FAVORITOS:', err);
                return res.status(500).json({ error: 'Error al guardar en favoritos' });
            }

            res.json({ message: 'Actividad guardada en favoritos exitosamente' });
        });
    });
};

exports.obtenerFavorita = (req, res) => {
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

exports.eliminarFavorita = (req, res) => {
    const ID_user = req.userId;
    const { actividadId } = req.body;

    const query = `
        DELETE FROM FAVORITOS
        WHERE ID_user = ? AND ID_actividad = ?
    `;

    pool.query(query, [ID_user, actividadId], (err, results) => {
        if (err) {
            console.error('Error al eliminar favorito:', err);
            return res.status(500).json({ error: 'Error al eliminar favorito' });
        }

        res.json({ message: 'Favorito eliminado exitosamente' });
    });
};