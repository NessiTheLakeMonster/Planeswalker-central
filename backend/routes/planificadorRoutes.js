const { Router } = require('express');
const PlanificadorMazosController = require('../controllers/PlanificadorMazosController');
const { check } = require('express-validator');
const router = Router();
const checkJWT = require('../middlewares/validarJWT')

router.post('/recomendacion', PlanificadorMazosController.recomendacionMazo);
router.post('/tipo', PlanificadorMazosController.getCartasPorTipo);

router.post('/crearMazo',
    [
        check('nombre', 'El nombre del mazo es obligatorio').not().isEmpty(),
        check('color', 'El color del mazo es obligatorio').not().isEmpty(),
        check('tipo', 'El tipo del mazo es obligatorio').not().isEmpty(),
        check('id_usuario', 'El id del usuario es obligatorio').not().isEmpty(),
    ],
    checkJWT.validarJWT, PlanificadorMazosController.crearMazo);

router.post('/agregarCartaAMazo', checkJWT.validarJWT, PlanificadorMazosController.agregarCartaAMazo);

module.exports = router;