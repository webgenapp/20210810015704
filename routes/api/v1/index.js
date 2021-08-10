const express = require('express')
const router = express.Router()

const productsRouter = require('./products')
router.use('/products', productsRouter)

const usersRouter = require('./users')
router.use('/users', usersRouter)

module.exports = router
