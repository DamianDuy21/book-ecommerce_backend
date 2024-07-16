const express = require("express");
const {
  getProductsByRequest,
  postCreateProduct,
  putEditProduct,
} = require("../controllers/productController");
const jwtMiddleWare = require("../middleware/jwt/jwtMiddleWare");
const productRouter = express.Router();

productRouter.get("/", getProductsByRequest);
productRouter.post("/", jwtMiddleWare, postCreateProduct);
productRouter.put("/:id", jwtMiddleWare, putEditProduct);

module.exports = productRouter;
