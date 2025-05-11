const mongoose = require("mongoose");
const Joi = require("joi");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true
    },
    stock: {
        type: Number,
        default: true
    },
    description: {
        type: String,
        maxlength: 1000,
        trim: true
    },
    image: {
        type: Buffer,
    }
}, { timestamps: true });

const productModel = mongoose.model("product", productSchema);

function validateProduct(data) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(100).required(),
        price: Joi.number().min(0).required(),
        category: Joi.string().min(2).max(50).required(),
        stock: Joi.number().optional(),
        description: Joi.string().max(1000).optional().allow(""),
        image: Joi.string().optional(),
    });

    return schema.validate(data);
}

module.exports = {
    productModel,
    validateProduct
};
