const Channel = require("../models/Channel")
const Messages = require("../models/Messages")
const { createChannel } = require("./Channel")

const messageEvents = {
    displaySelectedChannelMessages: "displaySelectedChannelMessages",
    sendMessage: "sendMessage",
    deleteMessage: "deleteMessage",
    offlineOnlineIndicator: "offlineOnlineIndicator",
    receiveMessage: "receiveMessage"
}

//TODO: 
// GET ALL MESSAGES USING SENDER ID OR LOGGED IN USER ID
// GET SINGLE MESSAGE
// DELETE MESSAGE 
// POST MESSAGE 

const getMessages = async () => {

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

const createMessage = (socket) => {
    socket.on(messageEvents.sendMessage, async ({ chatId, message }) => {

        try {
            const { userId } = socket.decoded
            // chatId is the other user's Id
            let members = [userId, chatId]
            const channelId = await createChannel(members)
            console.log(channelId)

            if (typeof channelId == "string") {
                console.log(channelId)
                return
            }
            const messageCreated = await Messages.create({
                channelId,
                sender: userId,
                message
            })

            if (messageCreated) {
                console.log(messageCreated)
            }
            await Channel.findByIdAndUpdate(channelId, { $push: { messages: messageCreated._id } })
            return
        } catch (err) {
            console.log(err)
        }
    })

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
