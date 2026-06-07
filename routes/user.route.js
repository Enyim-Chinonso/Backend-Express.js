const router = require("express").Router();

const {auth} = require("../middleware/auth.middleware")
const { requestAccountDeletion, confirmAccountDeletion, } = require("../controller/user.controller");





router.post("/delete-account/request", auth, requestAccountDeletion)
router.post("/delete-account/confirm", auth, confirmAccountDeletion)
module.exports = router