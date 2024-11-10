const jwt = require('jsonwebtoken');

// Middleware para verificar el token de sesión
const verificarToken = (req, res, next) => {
    const token = req.cookies.sessionToken;

    if (!token) {
        // Si no existe el token, redirige al usuario a la página de inicio de sesión
        return res.redirect('../../src/views/InicioSesion.jsx'); 
    }

    try {
        // Verifica el token
        const decoded = jwt.verify(token, 'tu_secreto');
        req.userId = decoded.id_usuario;
        next(); // Continúa a la siguiente función de la ruta
    } catch (err) {
        // Si el token no es válido, redirige al usuario a la página de inicio de sesión
        return res.redirect('../../src/views/InicioSesion.jsx');
    }
};

module.exports = verificarToken;