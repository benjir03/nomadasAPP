const express = require('express');
const router = express.Router();
const verifyToken = require('./authMiddleware');

// Ruta pública
router.get('/publica', (req, res) => {
    res.send('Página pública');
});

// Ruta protegida
router.get('/perfil', verifyToken, (req, res) => {
    res.send('Página de perfil del usuario');
});

module.exports = router;
