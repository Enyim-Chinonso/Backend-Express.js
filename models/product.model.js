const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: string,
        require: [true, "product name is required"]
    },
    price: {
        type: Number,
        require: [true, "product description is required"]
    },
    description: {
        type: String,
        require: [true, "product description is required"]
    },
    category: {
        type: Number,
        require: [true, "product category is required"]
    },
    inStock: {
        type: Number,
        require: [true, "product category is required"]
    },
    image: {
        type: String,
        require: [true, "product image is required "]
    }
}, {timestamps: true})

module.exports = mongoose.model("Product", productSchema)