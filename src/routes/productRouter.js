const express = require('express')
const { getProductsByRequest, postCreateProduct, putEditProduct } = require("../controllers/productController")
const productRouter = express.Router()

productRouter.get('/', getProductsByRequest)
productRouter.post('/', postCreateProduct)
productRouter.put('/:id', putEditProduct)

module.exports = productRouter 