const mongoose = require("mongoose");
const Joi = require("joi");

const deliverySchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "order",
        required: true
    },
    deliveryBoy: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
        trim: true
    },
    status: {
        type: String,
        enum: ["pending", "picked", "on the way", "delivered", "cancelled"],
        default: "pending",
        required: true
    },
    trackingUrl: {
        type: String,
        trim: true,
    },
    estimatedDeliveryTime: {
        type: Number, // in minutes or timestamp?
        min: 0
    }
}, { timestamps: true });

const deliveryModel = mongoose.model("delivery", deliverySchema);

function validateDelivery(data) {
    const schema = Joi.object({
        order: Joi.string().required(),
        deliveryBoy: Joi.string().min(2).max(100).required(),
        status: Joi.string().valid("pending", "picked", "on the way", "delivered", "cancelled").required(),
        trackingUrl: Joi.string().uri().optional().allow(""),
        estimatedDeliveryTime: Joi.number().min(0).optional()
    });

    return schema.validate(data);
}

module.exports = {
    deliveryModel,
    validateDelivery
};
