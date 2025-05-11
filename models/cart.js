const mongoose = require("mongoose");
const Joi = require("joi");

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
            required: true
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    address: {
        type: String,
        minlength: 5,
        maxlength: 255
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
        default: "pending",
        required: true
    },
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "payment",
    },
    delivery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "delivery",
    }
}, { timestamps: true });

const cartModel = mongoose.model("cart", cartSchema);

function validateCart(data) {
    const schema = Joi.object({
        user: Joi.string().required(),
        products: Joi.array().items(Joi.string().required()).min(1).required(),
        totalPrice: Joi.number().min(0).required(),
        address: Joi.string().min(5).max(255),
        status: Joi.string().valid("pending", "confirmed", "shipped", "delivered", "cancelled").required(),
        payment: Joi.string(),
        delivery: Joi.string(),
    });

    return schema.validate(data);
}

module.exports = {
    cartModel,
    validateCart
};
