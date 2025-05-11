const mongoose = require("mongoose");
const Joi = require("joi");

const adminSchema = new mongoose.Schema({
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
        required: true,
        minlength: 6,
        maxlength: 1024
    },
    role: {
        type: String,
        enum: ["admin", "superadmin", "moderator"],
        default: "admin",
        required: true
    }
}, { timestamps: true });

const adminModel = mongoose.model("admin", adminSchema);

function validateAdmin(data) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(100).required(),
        email: Joi.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required(),
        password: Joi.string().min(6).max(1024).required(),
        role: Joi.string().valid("admin", "superadmin", "moderator").required()
    });

    return schema.validate(data);
}



module.exports = {
    adminModel,
    validateAdmin
};
