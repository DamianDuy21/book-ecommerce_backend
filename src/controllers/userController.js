const User = require("../middleware/models/userModel")
const aqp = require("api-query-params")
const { uploadSingleFile, uploadMultipleFile } = require("../services/filesService")

const getUser = (req, res) => {
    res.send("a user")
}
const getAllUsers = async (req, res) => {

    const { filter, skip, limit, sort, projection, population } = aqp(req.query);
    let response = null


    if (limit && filter.page) {
        let skip = (filter.page - 1) * limit
        delete filter.page
        console.log(filter)
        response = await User.find({ filter }).limit(limit).skip(skip).exec()
    }
    else {
        response = await User.find({})
    }

    if (response) {
        res.status(200).json({
            ec: 200,
            data: response
        })
    }
    else {
        res.status(500).json({
            ec: 500,
            data: "Something went wrong!"
        })
    }

}
const getAuthenUser = async (req, res) => {
    const type = req.body.type
    if (type == 1) {
        const email = req.body.email
        const password = req.body.password
        const response = await User.find({ email: email, password: password })
    }
    else if (type == 2) {
        const email = req.body.email
        const response = await User.find({ email: email })
    }

}
const postCreateUser = async (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        avatar: "",
        role: "NORMAL_USER",
        lastAccess: Date.now(),
    }
    const response = await User.create(newUser)
    if (response) {
        res.status(200).json({
            ec: 200,
            data: response
        })
    }
    else {
        res.status(500).json({
            ec: 500,
            data: "Something went wrong!"
        })
    }
}
const putEditUser = async (req, res) => {
    try {
        const newUser = {
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
            role: "NORMAL_USER",
            lastAccess: Date.now(),
        }
        let avatarURL = ""
        if (!req.files || Object.keys(req.files).length === 0) {

        }
        else {
            let response = await uploadSingleFile(req.files.image)
            if (response.status == "success") {
                avatarURL = response.path
            }
        }
        const response = await User.findOneAndUpdate({ _id: req.body._id },
            {
                email: newUser.email,
                password: newUser.password,
                username: newUser.username,
                lastAccess: newUser.lastAccess,
                avatar: avatarURL
            })
        res.status(200).json({
            ec: 200,
            data: response
        })
    } catch (err) {
        res.status(500).json({
            ec: 500,
            message: err
        })
    }
}

const deleteUser = async (req, res) => {
    const response = await User.delete({ _id: req.body._id })
    if (response) {
        res.status(200).json({
            ec: 200,
            data: response
        })
    }
    else {
        res.status(500).json({
            ec: 500,
            data: "Something went wrong!"
        })
    }
}

const postUploadAvatar = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    else {
        const response = await uploadSingleFile(req.files.image)
        return res.send(response)
    }

}
const postUploadAvatars = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    if (Array.isArray(req.files.image)) {
        const response = await uploadMultipleFile(req.files.image)
        return res.status(200).json({
            ec: 0,
            data: response
        })
    }
    else {
        const response = await uploadSingleFile(req.files.image)
        return res.status(200).json({
            ec: 0,
            data: response
        })
    }

}


module.exports = {
    getUser, postCreateUser, getAllUsers, putEditUser, deleteUser, postUploadAvatar, postUploadAvatars
}