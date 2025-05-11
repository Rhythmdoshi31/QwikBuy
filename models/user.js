const mongoose = require("mongoose");
const Joi = require("joi");

const addressSchema = new mongoose.Schema({
    state: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    zip: {
        type: Number,
        required: true,
        min: 100000,
        max: 999999,
    },
    city: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    address: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    }
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 1024
    },
    phone: {
        type: Number,
        match: /^[6-9]\d{9}$/
    },
    addresses: {
        type: [addressSchema],
        default: []
    }
}, { timestamps: true });

const userModel = mongoose.model("user", userSchema);

function validateUser(data) {
    const joiAddressSchema = Joi.object({
        state: Joi.string().min(2).max(50).required(),
        zip: Joi.number().min(100000).max(999999).required(),
        city: Joi.string().min(2).max(50).required(),
        address: Joi.string().min(5).max(255).required()
    });

    const schema = Joi.object({
        name: Joi.string().min(2).max(100).required(),
        email: Joi.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required(),
        password: Joi.string().min(6).max(1024).required(),
        phone: Joi.string().pattern(/^[6-9]\d{9}$/),
        addresses: Joi.array().items(joiAddressSchema)
    });

    return schema.validate(data);
}

module.exports = {
    userModel,
    validateUser
};
