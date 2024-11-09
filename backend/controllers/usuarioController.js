// controllers/usuarioController.js
const jwt = require('jsonwebtoken');
const pool = require('../db/connection');

exports.insertarUsuario = (req, res) => {
    const { nombre, fecha_nacimiento, correo, contraseña, genero, telefono } = req.body;

    pool.query(
        'INSERT INTO Usuario (nombre, fecha_nacimiento, email, password_user, genero, telefono) VALUES (?, ?, ?, ?, ?, ?)',
        [nombre, fecha_nacimiento, correo, contraseña, genero, telefono],
        (err, results) => {
            if (err) {
                console.error('Error en la inserción:', err);
                return res.status(500).json({ error: 'Error en la inserción' });
            }

            const userId = results.insertId;
            const token = jwt.sign({ id_usuario: userId }, 'tu_secreto', { expiresIn: '1h' });

            // Envía el token en una cookie y en la respuesta JSON
            res.cookie('sessionToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600000 // 1 hora
            });

            res.json({ message: 'Usuario registrado y autenticado', id: userId, token });
        }
    );
};


// Proteger la ruta
const verificarToken = require('../middlewares/verificarToken');

    // Rutas protegida
router.get('../../src/views/ModificarPerfil.jsx', verificarToken, (req, res) => {
    res.json({ message: 'Para acceder a esta página inicia sesión' });
});
router.get('../../src/views/Perfil.jsx', verificarToken, (req, res) => {
    res.json({ message: 'Para acceder a esta página inicia sesión' });
});
router.get('../../src/views/Datosdelusuario.jsx', verificarToken, (req, res) => {
    res.json({ message: 'Para acceder a esta página inicia sesión' });
});
