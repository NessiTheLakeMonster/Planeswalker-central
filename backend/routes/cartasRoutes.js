const { Router } = require('express')
const CartasController = require('../controllers/CartasController')
const router = Router()

router.get('/:id', CartasController.getCartaById)

router.post('/', CartasController.getCartaByNombreES)

/* router.get('/', CartasController.getCartaByNombreEN) */

module.exports = router