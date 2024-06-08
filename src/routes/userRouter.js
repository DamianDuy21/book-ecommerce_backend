const express = require('express')
const { postCreateUser, getAllUsers, putEditUser, deleteUser, postUploadAvatar, postUploadAvatars, getAuthenUser } = require('../controllers/userController')
const User = require('../middleware/models/userModel')
const userRouter = express.Router()



//get authen user
userRouter.get("/authen", getAuthenUser)


//custome user
userRouter.get("/", getAllUsers)
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
//         phone: ""
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