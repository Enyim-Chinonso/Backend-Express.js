const router = require("express").Router()

router.use("/auth", require(".auth.route"))
router.use("/user", require(".user.route/"))
router.use("/products", require("./auth."))
router.use("/carts", require("./cart.route"))

module.exports = router