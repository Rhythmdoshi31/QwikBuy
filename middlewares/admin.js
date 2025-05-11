const jwt = require("jsonwebtoken");
const { use } = require("passport");
require("dotenv").config;

async function validateAdmin (req, res, next) {
    try {
        let token = req.cookies.token;
        if (!token) return res.send("You need to Login First");
        let data = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = data;
        next();
    } catch (error) {
        res.send(error.message);
    }
}

async function userIsLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/users/login");
}

module.exports = {validateAdmin, userIsLoggedIn};