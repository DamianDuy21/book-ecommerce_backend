const Receipt = require("../middleware/models/receiptModel")
const aqp = require("api-query-params")
const postCreateReceipt = async (req, res) => {
    const newReceipt = {
        products: req.body.products,
        receiveInfo: req.body.receiveInfo,
        userId: req.body.userId,
        discount: req.body.discount,
        totalPay: req.body.totalPay,
        shipPay: req.body.shipPay,
        status: req.body.status,
        quantity: req.body.quantity
    }
    const response = await Receipt.create(newReceipt)
    if (response) {
        return res.status(200).json({
            ec: 200,
            data: response
        })
    }
    else {
        return res.stauts(500).json({
            ec: 500,
            message: "Some thing went wrong while paying"
        })
    }
}

const putEditReceipt = async (req, res) => {
    const newReceipt = {
        products: req.body.products,
        receiveInfo: req.body.receiveInfo,
        userId: req.body.userId,
        discount: req.body.discount,
        totalPay: req.body.totalPay,
        shipPay: req.body.shipPay,
        status: req.body.status,
        quantity: req.body.quantity
    }
    const response = await Receipt.findOneAndUpdate({ _id: req.params.id }, newReceipt)
    if (response) {
        return res.status(200).json({
            ec: 200,
            data: response
        })
    }
    else {
        return res.stauts(500).json({
            ec: 500,
            message: "Some thing went wrong while confirming"
        })
    }
}
const getReceipts = async (req, res) => {
    const { filter, skip, limit, sort, projection, population } = aqp(req.query);
    let response = null
    response = await Receipt.find(filter).sort(sort)
    if (response) {
        return res.status(200).json({
            ec: 200,
            data: response
        })
    }
    else {
        return res.stauts(500).json({
            ec: 500,
            message: "Some thing went wrong while getting receipts"
        })
    }
}


module.exports = {
    postCreateReceipt, getReceipts, putEditReceipt
}