const express = require('express')
const { postCreateUser, getAllUsers, putEditUser, deleteUser, postUploadAvatar, postUploadAvatars, getAuthenUser } = require('../controllers/userController')
const { initializeApp } = require('firebase/app');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const multer = require('multer');
const firebaseConfig = require('../config/firebase');
const userRouter = express.Router()

initializeApp(firebaseConfig);
const storage = getStorage();
const upload = multer({ storage: multer.memoryStorage() });

const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
}
//get authen user
userRouter.get("/authen", getAuthenUser)


//custome user
userRouter.get("/", getAllUsers)
userRouter.post("/", postCreateUser)
userRouter.put("/:id", putEditUser)
userRouter.delete("/", deleteUser)

//upload avatar
userRouter.post("/avatar", postUploadAvatar)
// userRouter.post("/avatar", upload.single("image"), async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).send({ error: "No file uploaded" });
//         }

//         console.log("File received:", req.file.originalname);

//         const dateTime = giveCurrentDateTime();
//         const storageRef = ref(storage, `files/${req.file.originalname + " " + dateTime}`);
//         const metadata = { contentType: req.file.mimetype };

//         console.log("Uploading file to Firebase storage...");
//         const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

//         console.log("Upload snapshot:", snapshot);
//         const downloadURL = await getDownloadURL(snapshot.ref);

//         console.log('File successfully uploaded. Download URL:', downloadURL);
//         return res.send({
//             message: 'File uploaded to Firebase storage',
//             name: req.file.originalname,
//             type: req.file.mimetype,
//             downloadURL: downloadURL
//         });
//     } catch (error) {
//         console.error("Error uploading file:", error);
//         return res.status(400).send({ error: error.message });
//     }
// });

// userRouter.post("/admin", async (req, res) => {
//     const admin = {
//         email: "admin",
//         password: 123456,
//         username: "Admin",
//         phone: ""
//         avatar: "",
//         role: "ADMIN",
//         lastAccess: Date.now(),
//         status: "offline",
//         receiptsQuantity: 0,
//         totalPay: 0,
//         description: "",
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