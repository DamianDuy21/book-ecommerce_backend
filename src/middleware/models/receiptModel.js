const { default: mongoose } = require("mongoose");
const mongoose_delete = require("mongoose-delete")
const receiptSchema = new mongoose.Schema({
    products: Array,
    receiveInfo: Object,
    userId: String,
    discount: Array,
    totalPay: Number,
    shipPay: Number,
    status: String,
    quantity: Number,
}, {
    timestamps: true
})

receiptSchema.plugin(mongoose_delete, { overrideMethods: "all" })
const Receipt = mongoose.model("receipts", receiptSchema)
module.exports = Receipt
