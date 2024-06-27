const { default: mongoose } = require("mongoose");
const mongoose_delete = require("mongoose-delete")
const categorySchema = new mongoose.Schema({
    name: String

}, {
    timestamps: true
})

categorySchema.plugin(mongoose_delete, { overrideMethods: "all" })
const Category = mongoose.model("categories", categorySchema)
module.exports = Category
