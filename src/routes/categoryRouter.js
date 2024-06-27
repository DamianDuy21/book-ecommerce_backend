const express = require("express")
const { getCategories, postCreateCategory } = require("../controllers/categoryController")

const categoryRouter = express.Router()

categoryRouter.get("/", getCategories)
categoryRouter.post("/", postCreateCategory)

module.exports = categoryRouter