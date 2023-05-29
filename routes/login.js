const express = require('express')
const router = express.Router()
const loginController = require('../controller/loginController')

router.get('/', loginController.get)
router.post('/', loginController.post)
router.post('/refresh', loginController.refreshToken)
router.post('/isauth', loginController.isAuth)

module.exports = router
