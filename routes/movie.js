const express = require('express')
const router = express.Router()
const movieController = require('../controller/movieController')

router.get('/', movieController.getAll)

router.get('/:id([0-9]{3,})', movieController.getById)

router.post('/', movieController.post)

router.put('/:id', movieController.put)

router.delete('/:id', movieController.delete)

module.exports = router
