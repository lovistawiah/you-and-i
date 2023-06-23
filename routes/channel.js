const router = require("express").Router()
const { getChannel, getChannels, createChannel, deleteChannel, updateChannel } = require("../controllers/Channel")


router.route('/').post(createChannel).get(getChannels)
router.route('/channel/:Id').get(getChannel).delete(deleteChannel).patch(updateChannel)

module.exports = router