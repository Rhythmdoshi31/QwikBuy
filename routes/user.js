const express = require("express");
const router = express.Router();
const { userModel, validateUser } = require("../models/user");

router.get("/login", async function (req, res) {
    res.render("user_login");
});

router.get("/profile", async function (req, res) {
    res.send("profile page");
});

router.get("/logout", async function (req, res) {
    req.logout(function(err) {
        if (err) return next(err);
        req.session.destroy((err) => {
            if (err) return next(err);
            res.clearCookie("connect.sid");
            res.redirect("/users/login");
        });      
    });

});

module.exports = router;