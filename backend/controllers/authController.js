// controllers/authController.js
const jwt = require('jsonwebtoken');
const pool = require('../db/connection');

// Función para iniciar sesión
exports.login = (req, res) => {
    const { correo, contraseña } = req.body;

    // Verifica credenciales en la base de datos
    pool.query('SELECT * FROM USUARIO WHERE email = ? AND password_user = ?', [correo, contraseña], (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }
        // Obtiene el userId del resultado de la consulta
        const userId = results[0].ID_user; // Ajusta esto al nombre correcto del campo de tu base de datos
        // Genera el token de sesión
        const token = jwt.sign({ id_usuario: userId }, 'tu_secreto', { expiresIn: '1h' });
        // Establece la cookie con el token
        res.cookie('sessionToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000 // 1 hora
        });
        res.json({ message: 'Inicio de sesión exitoso' });
        console.log({ id: userId, token });
        console.log(results);
    });
};

// Función para cerrar sesión
exports.logout = (req, res) => {
    res.clearCookie('sessionToken');
    res.json({ message: 'Sesión cerrada exitosamente' });
    console.log(res);
};

// Función para obtener el perfil de usuario completo
exports.getPerfil = (req, res) => {
    const userId = req.userId;
    // Obtiene todos los campos del usuario
    pool.query('SELECT * FROM USUARIO WHERE ID_user = ?', [userId], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(results[0]); // Envía todos los campos de la base de datos
        console.log(userId);
        console.log(results[0]);
    });
};

exports.eliminarCuenta = (req, res) => {
    const userId = req.userId;
    pool.query('DELETE FROM USUARIO WHERE ID_user = ?', [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar la cuenta' });
        }
        res.clearCookie('sessionToken'); // Elimina la cookie de sesión
        res.json({ message: 'Cuenta eliminada exitosamente' });
    });
};

// Función para modificar el perfil del usuario
exports.modificarPerfil = (req, res) => {
    const userId = req.userId;
    const { nombre, apellido, fecha_nacimiento, genero, correo, telefono } = req.body;
    // Actualiza el perfil del usuario en la base de datos
    pool.query(
        'UPDATE USUARIO SET nombre = ?, apellido = ?, fecha_nacimiento = ?, genero = ?, email = ?, telefono = ? WHERE ID_user = ?',
        [nombre, apellido, fecha_nacimiento, genero, correo, telefono, userId],
        (err, results) => {
            if (err) {
                console.error('Error al actualizar el perfil:', err);
                return res.status(500).json({ error: 'Error al actualizar el perfil' });
            }

            res.json({ message: 'Perfil actualizado exitosamente' });
        }
    );
};

exports.verificar = (req, res) => {
    const userId = req.userId; // ID del usuario obtenido del token de sesión
    const { verificacion } = req.body;
    // Actualiza el verificado del usuario en la base de datos
    pool.query(
        'UPDATE USUARIO SET verificado = ? WHERE ID_user = ?', [verificacion, userId], (err, results) => {
            if (err) {
                console.error('Error al verificado el perfil:', err);
                res.json({message: 'Información enviada', id: userId });
                return res.status(500).json({ error: 'Error al verificado el perfil' });
            }
            res.json({ message: 'Perfil verificado exitosamente' });
        }
    );
};