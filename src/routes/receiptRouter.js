const express = require("express")
const { postCreateReceipt, getReceipts, putEditReceipt } = require("../controllers/receiptController")

const receiptRouter = express.Router()

receiptRouter.post("/", postCreateReceipt)
receiptRouter.get("/", getReceipts)
receiptRouter.put("/:id", putEditReceipt)


module.exports = receiptRouter