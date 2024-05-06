const {Router} = require('express')
const AuthController = require('../controllers/AuthController')
const router = Router()

router.get('/login', AuthController.login)

module.exports = router