const express = require('express')
const { getUser, postCreateUser, getAllUsers, putEditUser, deleteUser, postUploadAvatar, postUploadAvatars } = require('../controllers/userController')
const User = require('../middleware/models/userModel')
const userRouter = express.Router()

//get all users
userRouter.get("/all", getAllUsers)

//custome user
userRouter.get("/", getUser)
userRouter.post("/", postCreateUser)
userRouter.put("/", putEditUser)
userRouter.delete("/", deleteUser)

//upload avatar
userRouter.post("/avatar", postUploadAvatar)

// userRouter.post("/admin", async (req, res) => {
//     const admin = {
//         email: "admin",
//         password: 123456,
//         username: "Admin",
//         avatar: "",
//         role: "ADMIN",
//         lastAccess: Date.now(),
//     }
//     const response = await User.create(admin)
//     if (response) {
//         res.status(200).json({
//             ec: 200,
//             data: response
//         })
//     }
//     else {
//         res.status(500).json({
//             ec: 500,
//             data: "Something went wrong!"
//         })
//     }
// })


module.exports = userRouter