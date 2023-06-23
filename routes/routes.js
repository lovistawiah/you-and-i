const router = require("express").Router()
const { checkUserToken } = require("../Middleware/userAuth")
const { signup, login, getAllUsers, } = require("../controllers/userAccount")

router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/users').get(getAllUsers)
router.route('/check-token').get(checkUserToken)
module.exports = router