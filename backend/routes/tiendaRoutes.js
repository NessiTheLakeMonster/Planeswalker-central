const { Router } = require('express')
const TiendaController = require('../controllers/TiendaController')
const router = Router()

router.post('/', TiendaController.postTienda)

module.exports = router