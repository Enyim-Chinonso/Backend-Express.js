const express = require("express")
const {register, loginUser, allUsers, myProfile, requestPasswordReset, resetPassword} = require("../controller/auth.controller")
const {auth, adminOnly} = require("../middleware/auth.middleware")
const router = express.Router()

router.post("/register", register)
router.post("/login", loginUser)
router.post("/request-password-reset", requestPasswordReset)
router.post("/reset-password", resetPassword)
// router.get("/all-users", auth, adminOnly, allUsers)
// router.get("/user/", auth, myProfile)



module.exports = router