const Product = require("../middleware/models/productModel")
const aqp = require("api-query-params")

const getProductsByRequest = async (req, res) => {
    const { filter, skip, limit, sort, projection, population } = aqp(req.query);
    let response = null

    if (limit && filter.page) {
        let skip = (filter.page - 1) * limit
        delete filter.page
        if (filter.name) {
            response = await Product.find({ name: { $regex: new RegExp(filter.name, 'i') } }).limit(limit).skip(skip)
        }
        else if (filter.price_gte && filter.price_lte) {
            if (filter.category) {
                response = await Product.find({ category: filter.category, price: { $gte: filter.price_gte, $lte: filter.price_lte } }).limit(limit).skip(skip)
            }
            else response = await Product.find({ price: { $gte: filter.price_gte, $lte: filter.price_lte } }).limit(limit).skip(skip)

        }

        else response = await Product.find(filter).limit(limit).skip(skip).sort(sort)
    }

    else {
        if (filter._id) {
            response = await Product.find({ _id: filter._id })
        }
        else if (filter.name) {
            response = await Product.find({ name: { $regex: new RegExp(filter.name, 'i') } })
        }
        else if (filter.price_gte && filter.price_lte) {
            if (filter.category) {
                response = await Product.find({ category: filter.category, price: { $gte: filter.price_gte, $lte: filter.price_lte } })
            }
            else response = await Product.find({ price: { $gte: filter.price_gte, $lte: filter.price_lte } })

        }

        else response = await Product.find(filter).sort(sort)
        // response = await Product.find(filter)
    }
    if (response) {
        return res.status(200).json({
            ec: 0,
            data: response
        })
    }
    else {
        return res.status(500).json({
            ec: 500,
            message: "Something went wrong while getting products by request!"
        })
    }
}

const getProductsRelated = async (req, res) => {
    const { filter, skip, limit, sort, projection, population } = aqp(req.query);
    let response = null

    if (filter.category) {
        response = await Product.find({ category: filter.category })
    }
    if (response) {
        return res.status(200).json({
            ec: 0,
            data: response
        })
    }
    else {
        return res.status(500).json({
            ec: 500,
            message: "Something went wrong while getting products by request!"
        })
    }
}

const postCreateProduct = async (req, res) => {
    const newProduct = {
        name: req.body.name,
        postedBy: req.body.postedBy,
        price: req.body.price,
        thumbnail: req.body.thumbnail,
        image: req.body.image,
        description: req.body.description,
        discount: req.body.discount,
        category: req.body.category,
        author: req.body.author,
        sold: req.body.sold
    }
    const response = await Product.create(newProduct)
    if (response) {
        return res.status(200).json({
            ec: 200,
            data: response
        })
    }
    else {
        return res.stauts(500).json({
            ec: 500,
            message: "Some thing went wrong while createing product"
        })
    }
}



module.exports = {
    getProductsByRequest, postCreateProduct, getProductsRelated
}