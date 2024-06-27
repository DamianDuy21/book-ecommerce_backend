const express = require('express')
const { getProductsByRequest, postCreateProduct } = require("../controllers/productController")
const productRouter = express.Router()

productRouter.get('/', getProductsByRequest)
productRouter.post('/', postCreateProduct)

module.exports = productRouter 