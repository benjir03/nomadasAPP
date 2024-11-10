// routes/carouselRoutes.js
const express = require('express');
const router = express.Router();
const carouselController = require('../controllers/carouselController');

// Ruta para datos de sesión (login)
router.get('/datos', carouselController.datos);

module.exports = router;