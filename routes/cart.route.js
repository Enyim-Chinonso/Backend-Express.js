const { auth } = require("../middleware/auth.middleware")
const { addToCart } = require("../controller/cart.controller")
const router = require("express").Router()

router.post("/add-cart", auth, addToCart)