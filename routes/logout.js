const express = require('express')
const router = express.Router()
const LogoutController = require('../controller/logoutController')

router.get('/', LogoutController.get)

module.exports = router