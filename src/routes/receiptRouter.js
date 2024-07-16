const express = require("express");
const {
  postCreateReceipt,
  getReceipts,
  putEditReceipt,
} = require("../controllers/receiptController");
const jwtMiddleWare = require("../middleware/jwt/jwtMiddleWare");

const receiptRouter = express.Router();

receiptRouter.post("/", jwtMiddleWare, postCreateReceipt);
receiptRouter.get("/", jwtMiddleWare, getReceipts);
receiptRouter.put("/:id", jwtMiddleWare, putEditReceipt);

module.exports = receiptRouter;
