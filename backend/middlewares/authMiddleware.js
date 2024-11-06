// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.cookies.sessionToken;
    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado. No hay token.' });
    }

    jwt.verify(token, 'tu_secreto', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido o expirado.' });
        }
        req.userId = decoded.id_usuario;
        next();
    });
};