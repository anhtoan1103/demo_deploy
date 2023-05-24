const express = require('express')
const router = express.Router()
const homeController = require('../controller/homeController')

router.get('/', homeController.get)

module.exports = router