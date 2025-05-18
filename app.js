const express = require('express');
const app = express();
const expressSession = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");
const passport = require("passport");

require("dotenv").config();
require("./config/google-oauth-config");
require("./config/db");

app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
}))
app.use(passport.initialize());
app.use(passport.session());

const indexRouter = require("./routes");
const authRouter = require("./routes/auth");
const adminRouter = require("./routes/admin");
const productRouter = require("./routes/products");
const categoryRouter = require("./routes/categories");
const userRouter = require("./routes/user");
const cartRouter = require("./routes/cart");
const paymentRouter = require("./routes/payment");
const orderRouter = require("./routes/order")

console.log(process.env.GOOGLE_CALLBACK_URL)

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/users", userRouter);
app.use("/cart", cartRouter)
app.use("/payment", paymentRouter)
app.use("/order", orderRouter)

app.listen(3000);