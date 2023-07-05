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

// const getMessage = (req, res) => {
//     res.status(200).send("get message")

// }

const createMessage = async (req, res) => {
    let message = ""
    try {
        let { channelId } = req.params
        //returning the actual text
        channelId = channelId.split(":")[1]
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
const searchMessages = async (req, res) => {
    // ? search for messages that only belongs to the user logged in or member of a channel
    try {
        let { searchValue } = req.params
        //removing `:` attached to the searchValue text
        searchValue = searchValue.split(":")[1]
        console.log("messages", searchValue)

        const searchResult = await Messages.find({ message: { $regex: searchValue, $options: 'i' } }).sort({ dateCreated: 1 })
        res.status(200).json({ searchResult })

    } catch (err) {
        console.log(err)
    }

}
module.exports = {
    // getMessage,
    getMessages,
    createMessage,
    deleteMessage,
    searchMessages
}
