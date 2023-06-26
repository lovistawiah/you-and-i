const router = require("express").Router()
const {newFriends} = require("../controllers/newFriends")

router.route('/').get(newFriends)
module.exports = router