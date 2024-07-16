const express = require("express");
const {
  getCategories,
  postCreateCategory,
} = require("../controllers/categoryController");
const jwtMiddleWare = require("../middleware/jwt/jwtMiddleWare");

const categoryRouter = express.Router();

categoryRouter.get("/", getCategories);
categoryRouter.post("/", jwtMiddleWare, postCreateCategory);

module.exports = categoryRouter;
