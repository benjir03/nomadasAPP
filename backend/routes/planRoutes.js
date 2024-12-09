// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const planController = require('../controllers/planController');

router.post('/insertarLugar', planController.insertarLugar);

module.exports = router;