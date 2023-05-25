const express = require('express')
const router = express.Router()
const registerController = require('../controller/registerController')

router.get('/', registerController.get)
router.post('/', registerController.post)

module.exports = router
