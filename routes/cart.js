const express = require("express");
const router = express.Router();
const { cartModel, validateCart } = require("../models/cart");
const {validateAdmin, userIsLoggedIn} = require("../middlewares/admin");
const { productModel } = require("../models/product");
const { default: mongoose } = require("mongoose");

router.get("/", userIsLoggedIn, async (req, res) => {
try {
    let cart = await cartModel.findOne({ user: req.session.passport.user }).populate("products");
    console.log(cart);
    let cartDataStructure = {};
    cart.products.forEach(product => {
        let key = product._id.toString();
        if (cartDataStructure[key]){
            cartDataStructure[key].quantity += 1;
        } else {
            cartDataStructure[key] = {
                ...product._doc, // adds everytinhg in product
                quantity: 1,
            }
        }
    });
    let finalArray = Object.values(cartDataStructure);
    let finalprice = cart.totalPrice + 34;
    res.render("cart", { cart: finalArray, finalprice, userid: req.session.passport.user });
} catch (error) {
    res.send("hurrr : " + error.message);
}
});

router.get("/add/:id", userIsLoggedIn, async (req, res) => {
    try {
        let id  = req.params.id;
        console.log(id)
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send("Invalid product ID");
        }
        let cart = await cartModel.findOne({ user: req.session.passport.user });
        let product = await productModel.findOne({ _id: id});
        if (!cart) {
            cart = await cartModel.create({
                user: req.session.passport.user,
                products: [req.params.id],
                totalPrice: Number(product.price),
            });
        }
        else {
            cart.products.push(req.params.id);
            cart.totalPrice = Number(cart.totalPrice) + Number(product.price);
            await cart.save();
        }
        res.redirect(req.get("referer") || "/");
    } catch (error) {
        console.log("aaaa " + error.message);    
    }
})

router.get("/subtract/:id", userIsLoggedIn, async (req, res) => {
    try {
        let id  = req.params.id;
        console.log(id)
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send("Invalid product ID");
        }
        let cart = await cartModel.findOne({ user: req.session.passport.user });
        let product = await productModel.findOne({ _id: id});
        if (!cart) {
            return res.send("There is nothing in the cart.")
        }
        else {
            let prodId = cart.products.indexOf(req.params.id);
            cart.products.splice(prodId, 1);
            cart.totalPrice = Number(cart.totalPrice) - Number(product.price);
            await cart.save();
        }
        res.redirect(req.get("referer") || "/");
    } catch (error) {
        console.log(error.message);    
    }
})

router.get("/remove/:id", userIsLoggedIn, async (req, res) => {
    try {
        let cart = await cartModel.findOne({ user: req.session.passport.user });
        
        if (!cart) res.send("Something went wrong while removing item.");

        let index = cart.products.indexOf(req.params.id);
        if (index !== -1) cart.products.splice(index, 1);
        else return res.send("Item is not in the cart.")
        await cart.save();
        res.redirect(req.get("referer") || "/");
    } catch (error) {
        res.send(error.message);
    }
})

module.exports = router;