const { Router } = require('express');
const PlanificadorMazosController = require('../controllers/PlanificadorMazosController');
const router = Router();

router.post('/recomendacion', PlanificadorMazosController.recomendacionMazo);

router.post('/tipo', PlanificadorMazosController.getCartasPorTipo);

module.exports = router;