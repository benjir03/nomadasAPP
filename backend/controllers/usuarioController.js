// controllers/usuarioController.js
const jwt = require('jsonwebtoken');
const pool = require('../db/connection');

exports.insertarUsuario = (req, res) => {
    const { nombre, fecha_nacimiento, correo, contraseña, genero, telefono } = req.body;

    // Insertar nuevo usuario en la base de datos
    pool.query(
        'INSERT INTO Usuario (nombre, fecha_nacimiento, correo, contraseña, genero, telefono) VALUES (?, ?, ?, ?, ?, ?)',
        [nombre, fecha_nacimiento, correo, contraseña, genero, telefono],
        (err, results) => {
            if (err) {
                console.error('Error en la inserción:', err);
                return res.status(500).json({ error: 'Error en la inserción' });
            }

            // Genera el token de sesión
            const userId = results.insertId;
            const token = jwt.sign({ id_usuario: userId }, 'tu_secreto', { expiresIn: '1h' });

            // Establece la cookie con el token
            res.cookie('sessionToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600000 // 1 hora
            });

            res.json({ message: 'Usuario registrado y autenticado', id: userId });
        }
    );
};
