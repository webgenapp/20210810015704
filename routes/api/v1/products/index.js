const express = require('express')
const router = express.Router()
const { Product } = require('../../../../models')
const { auth } = require('../../../../middlewares/auth')

router.get('/', auth, async function (req, res, next) {
  const products = await Product.findAll()

  res.send(products)
})

router.get('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  const product = await Product.findOne({ where: { id } })

  res.send(product)
})

router.post('/', auth, async function (req, res, next) {
  const product = await Product.build({
    ...req.body,
  }).save()

  res.status(201)
  res.send(product)
})

router.delete('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  await Product.destroy({ where: { id } })

  res.status(204)
  res.send()
})

router.put('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  const product = await Product.findOne({ where: { id } })

  product.price = req.body.price

  product.save()

  res.send(product)
})

module.exports = router
