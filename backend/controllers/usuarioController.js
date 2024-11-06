// controllers/usuarioController.js
const pool = require('../db/connection');

exports.insertarUsuario = (req, res) => {
    console.log("Datos recibidos en el backend:", req.body); // Verificar datos recibidos

    const { nombre, fecha_nacimiento, correo, contraseña, genero, telefono } = req.body;
    const query = `
        INSERT INTO Usuario (nombre, fecha_nacimiento, correo, contraseña, genero, telefono)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    pool.query(query, [nombre, fecha_nacimiento, correo, contraseña, genero, telefono], (err, results) => {
        if (err) {
            console.error('Error insertando usuario:', err.message);
            return res.status(500).json({ error: 'Error en la inserción' });
        }
        res.json({ message: 'Usuario insertado con éxito', id: results.insertId });
    });
};

// Actualizar un usuario
exports.actualizarUsuario = (req, res) => {
    const { id } = req.params;
    const { nombre, email } = req.body;
    const query = 'UPDATE Usuario SET nombre = ?, email = ? WHERE id = ?';
    pool.query(query, [nombre, email, id], (err, results) => {
        if (err) {
            console.error('Error actualizando usuario:', err.message);
            return res.status(500).json({ error: 'Error en la actualización' });
        }
        res.json({ message: 'Usuario actualizado con éxito' });
    });
};

// Eliminar un usuario
exports.eliminarUsuario = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Usuario WHERE id = ?';
    pool.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error eliminando usuario:', err.message);
            return res.status(500).json({ error: 'Error en la eliminación' });
        }
        res.json({ message: 'Usuario eliminado con éxito' });
    });
};
