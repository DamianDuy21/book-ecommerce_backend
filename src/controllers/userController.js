const User = require("../middleware/models/userModel")
const aqp = require("api-query-params")
const { uploadSingleFile, uploadMultipleFile } = require("../services/filesService")

const getAllUsers = async (req, res) => {
    const { filter, skip, limit, sort, projection, population } = aqp(req.query);
    let response = null
    console.log(filter)
    if (limit && filter.page) {
        let skip = (filter.page - 1) * limit
        delete filter.page
        response = await User.find(filter).limit(limit).skip(skip).sort(sort).exec()
    }
    else {
        response = await User.find(filter).sort(sort)
    }

    if (response) {
        return res.status(200).json({
            ec: 200,
            data: response
        })
    }
    else {
        return res.status(500).json({
            ec: 500,
            data: "Something went wrong while getting users!"
        })
    }

}
const getAuthenUser = async (req, res) => {
    const { filter } = aqp(req.query);
    if (filter.type == 1) {
        const email = filter.email
        const password = filter.password
        const response = await User.find({ email: email, password: password })
        if (response) {
            return res.status(200).json({
                ec: 200,
                data: response
            })
        }
        else {
            return res.status(500).json({
                ec: 500,
                message: "Something went wrong!"
            })
        }

    }
    else if (filter.type == 2) {
        const email = filter.email
        const response = await User.find({ email: email })
        if (response) {
            return res.status(200).json({
                ec: 200,
                data: response
            })
        }
        else {
            return res.status(500).json({
                ec: 500,
                message: "This email is already registered!"
            })
        }

    }

}
const postCreateUser = async (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        phone: req.body.phone,
        avatar: req.body.avatar,
        role: "NORMAL_USER",
        lastAccess: "",
        status: req.body.status,
        receiptsQuantity: 0,
        totalPay: 0,
        description: ""
    }
    const response = await User.create(newUser)
    if (response) {
        return res.status(200).json({
            ec: 200,
            data: response
        })
    }
    else {
        return res.status(500).json({
            ec: 500,
            message: "Something went wrong!"
        })
    }
}
const putEditUser = async (req, res) => {
    try {
        const response = await User.findOneAndUpdate({ _id: req.params.id },
            {
                email: req.body.email,
                password: req.body.password,
                username: req.body.username,
                phone: req.body.phone,
                avatar: req.body.avatar,
                lastAccess: Date.now(),
                status: req.body.status,
                receiptsQuantity: req.body.receiptsQuantity,
                totalPay: req.body.totalPay,
                description: req.body.description
            })
        return res.status(200).json({
            ec: 200,
            data: response
        })
    } catch (err) {
        return res.status(500).json({
            ec: 500,
            message: err
        })
    }
}

const deleteUser = async (req, res) => {
    const response = await User.delete({ _id: req.body._id })
    if (response) {
        return res.status(200).json({
            ec: 200,
            data: response
        })
    }
    else {
        return res.status(500).json({
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
    postCreateUser, getAllUsers, putEditUser, deleteUser, postUploadAvatar, postUploadAvatars,
    getAuthenUser
}