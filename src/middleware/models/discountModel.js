const { default: mongoose } = require("mongoose");
const mongoose_delete = require("mongoose-delete")

const discountSchema = new mongoose.Schema({
    idd: String,
    name: String,
    value: Number,
}, {
    timestamps: true
})

discountSchema.plugin(mongoose_delete, { overrideMethods: 'all' })

const Discount = mongoose.model('discount', discountSchema)

module.exports = Discount