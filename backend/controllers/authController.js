// controllers/authController.js
const jwt = require('jsonwebtoken');
const pool = require('../db/connection');

// Función para iniciar sesión
exports.login = (req, res) => {
    const { correo, contraseña } = req.body;

    // Verifica credenciales en la base de datos
    pool.query('SELECT * FROM Usuario WHERE correo = ? AND contraseña = ?', [correo, contraseña], (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        // Genera el token de sesión
        const token = jwt.sign({ id_usuario: results[0].id_usuario }, 'tu_secreto', { expiresIn: '1h' });

        // Establece la cookie con el token
        res.cookie('sessionToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000 // 1 hora
        });

        res.json({ message: 'Inicio de sesión exitoso' });
    });
};

// Función para cerrar sesión
exports.logout = (req, res) => {
    res.clearCookie('sessionToken');
    res.json({ message: 'Sesión cerrada exitosamente' });
};

// Función para obtener perfil de usuario
exports.getPerfil = (req, res) => {
    const userId = req.userId; // Obtenido del middleware `verifyToken`
    
    pool.query('SELECT nombre FROM Usuario WHERE id_usuario = ?', [userId], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json({ nombre: results[0].nombre });
    });
};
