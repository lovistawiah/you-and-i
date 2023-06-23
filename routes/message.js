const router = require("express").Router()
const { getMessage, getMessages, createMessage, deleteMessage } = require("../controllers/messages")

//channelId - retrieving all message belonging to a specific channel
router.route('/:channelId').get(getMessages).post(createMessage)
router.route('/:Id').get(getMessage).delete(deleteMessage)


module.exports = router