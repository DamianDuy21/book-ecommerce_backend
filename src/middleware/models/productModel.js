const { default: mongoose } = require("mongoose");
const mongoose_delete = require("mongoose-delete")

const productSchema = new mongoose.Schema({
    name: String,
    postedBy: String,
    price: Number,
    thumbnail: String,
    image: Array,
    description: String,
    discount: Number,
    category: Array,
    author: String,
    sold: Number
}, {
    timestamps: true
})

productSchema.plugin(mongoose_delete, { overrideMethods: "all" })
const Product = mongoose.model('products', productSchema)

module.exports = Product