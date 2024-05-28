const { Router } = require('express')
const CartasController = require('../controllers/CartasController')
const router = Router()
const checkJWT = require('../middlewares/validarJWT')

router.get('/:id', CartasController.getCartaById)

router.post('/', CartasController.getCartaByNombreES)

router.post('/guardar', CartasController.guardarCarta)

module.exports = router