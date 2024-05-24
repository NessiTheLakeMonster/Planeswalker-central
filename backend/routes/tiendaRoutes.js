const { Router } = require('express')
const TiendaController = require('../controllers/TiendaController')
const router = Router()

router.get('/', TiendaController.getTienda)

router.post('/', TiendaController.postTienda)

module.exports = router