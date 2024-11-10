//  routes/opinionesRoutes
const express = require('express');
const router = express.Router();
const opinionesController = require('../controllers/opinionesController');

router.get('/:id_actividad', opinionesController.getOpiniones);
router.post('/', opinionesController.postOpinion);

module.exports = router;
