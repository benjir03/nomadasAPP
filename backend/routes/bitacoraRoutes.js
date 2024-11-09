//  routes/bitacoraRoutes
const express = require('express');
const router = express.Router();
const bitacoraController = require('../controllers/bitacoraController');

router.get('/', bitacoraController.getActividades);

module.exports = router;
