const Category = require("../middleware/models/categoryModel")

const getCategories = async (req, res) => {
    const response = await Category.find()
    if (response) {
        res.status(200).json({
            ec: 200,
            data: response
        })
    }
    else {
        res.status(500).json({
            ec: 500,
            message: "Some thing went wrong while getting categories"
        })
    }
}
const postCreateCategory = async (req, res) => {
    const newCategory = {
        name: req.body.name
    }
    const response = await Category.create(newCategory)
    if (response) {
        res.status(200).json({
            ec: 200,
            data: response
        })
    }
    else {
        res.status(500).json({
            ec: 500,
            message: "Some thing went wrong while creating categories"
        })
    }
}

module.exports = {
    getCategories,
    postCreateCategory
}