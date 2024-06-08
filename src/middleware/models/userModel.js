const mongoose = require("mongoose")
const mongoose_delete = require("mongoose-delete")

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    username: String,
    phone: String,
    role: String,
    avatar: String,
    lastAccess: String,
}, {
    timestamps: true
})
userSchema.plugin(mongoose_delete, { overrideMethods: "all" })

const User = mongoose.model("users", userSchema)

module.exports = User