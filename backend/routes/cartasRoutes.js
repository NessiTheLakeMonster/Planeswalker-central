const { Router } = require('express')
const CartasController = require('../controllers/CartasController')
const router = Router()

router.get('/:id', CartasController.getCartaById)

router.get('/', CartasController.getCartaByNombreES)

module.exports = router