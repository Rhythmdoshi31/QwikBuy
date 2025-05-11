const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }), async function() {
    
});

router.get("/google/callback", passport.authenticate("google", { successRedirect: "/products", failureRedirect: "/" }), function() {

})

router.get("/logout", function(req, res, next) {
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
})

module.exports = router;