const Channel = require("../models/Channel")
const Messages = require("../models/Messages")
//TODO: 
// GET ALL MESSAGES USING SENDER ID OR LOGGED IN USER ID
// GET SINGLE MESSAGE
// DELETE MESSAGE 
// POST MESSAGE 

const getMessages = async (req, res) => {

    //using the channelId to retrieve the all the messages in a particular channel
    try {
        const { channelId } = req.params
        const ChannelMessages = await Channel.findOne({ _id: channelId }).populate({
            path: 'messages'
        })
        res.status(200).send(ChannelMessages)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const getMessage = (req, res) => {
    res.status(200).send("get message")

}

const createMessage = async (req, res) => {
    let message = ""
    try {
        const { channelId } = req.params
        //UserId from the userAuth.js
        const { userId } = req.user
        const { message } = req.body
        //check if channel Id exist
        const channelData = await Channel.findById(channelId)
        if (!channelData) {
            res.status(200).send("channel does not exist")
            return
        }
        console.log(channelData)
        const messageCreated = await Messages.create({
            sender: userId,
            channelId,
            message,
        })
        const id = channelId
        const updateChannelData = await Channel.findByIdAndUpdate(id, { $push: { messages: messageCreated._id } }, { new: true })
        console.log(updateChannelData, messageCreated)
        res.status(200).send(messageCreated)
        return
    } catch (err) {
        message = err.message
        res.status(500).send(message)
    }

}

const deleteMessage = (req, res) => {
    res.status(200).send("delete messages")

}
module.exports = {
    getMessage,
    getMessages,
    createMessage,
    deleteMessage
}
