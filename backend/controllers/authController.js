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

// Función para obtener el perfil de usuario completo
exports.getPerfil = (req, res) => {
    const userId = req.userId;

    // Obtiene todos los campos del usuario
    pool.query('SELECT ID_user, nombre, fecha_nacimiento, email, genero, telefono FROM USUARIO WHERE ID_user = ?', [userId], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json(results[0]); // Envía todos los campos de la base de datos
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
    const userId = req.userId; // ID del usuario obtenido del token de sesión
    const { nombre, apellido, fecha_nacimiento, genero, correo, telefono } = req.body;
    // Actualiza el perfil del usuario en la base de datos
    pool.query(
        'UPDATE USUARIO SET nombre = ?, apellido = ?, fecha_nacimiento = ?, email = ?, telefono = ? WHERE ID_user = ?',
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

<<<<<<< HEAD

//Función para restingit el acceso de usuario no registrado
const verificarToken = require('../middlewares/authMiddleware');

// Ruta protegida: Obtener el perfil del usuario
exports.getPerfil = [verificarToken, (req, res) => {
    const userId = req.userId; // ID del usuario obtenido del token

    // Lógica para obtener el perfil del usuario
    pool.query(
        'SELECT nombre, fecha_nacimiento, correo, genero, telefono FROM Usuario WHERE id_usuario = ?',
        [userId],
        (err, results) => {
            if (err || results.length === 0) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            res.json(results[0]); // Envía los datos del perfil del usuario
        }
    );
}];
=======
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
>>>>>>> 59009992d6552b2161e998b58dbf46ed90ff7d3b
