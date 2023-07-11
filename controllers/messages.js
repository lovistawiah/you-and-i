const Channel = require("../models/Channel")
const Messages = require("../models/Messages")
const { createChannel } = require("./Channel")

const messageEvents = {
    displaySelectedChannelMessages: "displaySelectedChannelMessages",
    sendMessage: "sendMessage",
    deleteMessage: "deleteMessage",
    offlineOnlineIndicator: "offlineOnlineIndicator",
    displayChannelAllMessages: "displayChannelAllMessages",
    SingleMessage: "SingleMessage"
}

//TODO: 
// GET ALL MESSAGES USING SENDER ID OR LOGGED IN USER ID
// GET SINGLE MESSAGE
// DELETE MESSAGE 
// POST MESSAGE 

const getMessages = (socket) => {
    socket.on(messageEvents.displayChannelAllMessages, async (data) => {
        //using the channelId to retrieve the all the messages in a particular channel
        try {
            const channelId = data
            const { userId } = socket.decoded
            const channelMessages = await Channel.findOne({ _id: channelId }).populate({
                path: 'messages'
            })
            const messages = []
            channelMessages.messages.forEach(messageData => {
                let { isDeleted, message, sender, createdAt } = messageData
                
                if (isDeleted) {
                    message = "this message was deleted"
                }
                messages.push({
                    message,
                    sender,
                    createdAt
                })

            })
            socket.emit(messageEvents.displayChannelAllMessages, messages)
        } catch (error) {
            console.log(error)
        }
    })
}

// const getMessage = (req, res) => {
//     res.status(200).send("get message")

// }

const createMessage = (io, socket) => {
    socket.on(messageEvents.sendMessage, async ({ chatId, message }) => {

        try {
            const { userId } = socket.decoded
            // chatId is the other user's Id
            let members = [userId, chatId]
            const { channelId, channelMembers } = await createChannel(members)

            if (typeof channelId == "string") {
                return
            }

            const messageArr = []
            const messageCreated = await Messages.create({
                channelId,
                sender: userId,
                message
            })

            let { isDeleted, sender, createdAt } = messageCreated

            if (isDeleted) {
                messageCreated.message = "this message was deleted"
            }

            const messageEdited = {
                message: messageCreated.message,
                sender,
                createdAt
            }
            console.log(messageEdited)
            messageArr.push(messageEdited)
            channelMembers.forEach(channelMember => {
                channelMember = channelMember.toString()
                console.log(channelMember)
                // io.to(channelMember).emit(messageEvents.SingleMessage, messageArr)
            })
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
