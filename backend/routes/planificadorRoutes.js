const { Router } = require('express');
const PlanificadorMazosController = require('../controllers/PlanificadorMazosController');
const { check } = require('express-validator');
const router = Router();

router.post('/recomendacion', PlanificadorMazosController.recomendacionMazo);
router.post('/tipo', PlanificadorMazosController.getCartasPorTipo);

router.post('/crearMazo',
    [
        check('nombre', 'El nombre del mazo es obligatorio').not().isEmpty(),
        check('color', 'El color del mazo es obligatorio').not().isEmpty(),
        check('tipo', 'El tipo del mazo es obligatorio').not().isEmpty(),
        check('id_usuario', 'El id del usuario es obligatorio').not().isEmpty(),
    ],
    PlanificadorMazosController.crearMazo);

router.post('/agregarCartaAMazo', PlanificadorMazosController.agregarCartaAMazo);

module.exports = router;