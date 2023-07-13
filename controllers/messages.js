const Channel = require("../models/Channel")
const Messages = require("../models/Messages")
const { createChannel, findChannel, } = require("./Channel")

const messageEvents = {
    displaySelectedChannelMessages: "displaySelectedChannelMessages",
    sendMessage: "sendMessage",
    deleteMessage: "deleteMessage",
    offlineOnlineIndicator: "offlineOnlineIndicator",
    displayChannelAllMessages: "displayChannelAllMessages",
    SingleMessage: "SingleMessage",
    newChannelMessage: "newChannelMessage"
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

const createMessage = async (io, socket) => {
    const loggedUserId = socket.decoded.userId
    let messageObj
    let messageReceivers = []
    // channel is the channelId to create the message
    let channel

    socket.on(messageEvents.sendMessage, async ({ message, channelId }) => {
        try {
            console.log("old channel", { message, channelId })
            const channelMembers = await findChannel(channelId)
            if (channelMembers) {
                messageReceivers = addMembers(channelMembers)
            }
            channel = channelId
            messageObj = message
            return
        } catch (err) {
            console.log(err)
        }
    })

    socket.on(messageEvents.newChannelMessage, async ({ userId, message }) => {
        messageObj = message
        //userId is the other user's Id that appears on the page.
        const members = [loggedUserId, userId]
        const { channelId, channelMembers } = await createChannel(members)

        if (channelId && channelMembers) {
            channel = channelId
            messageReceivers = addMembers(channelMembers)
        }
    })
    const messageArr = []
    // const messageCreated = await Messages.create({
    //     channelId: channel,
    //     sender: loggedUserId,
    //     message: messageObj
    // })

    // let { sender, createdAt } = messageCreated

    // const messageEdited = {
    //     message: messageCreated.message,
    //     sender,
    //     createdAt
    // }
    messageReceivers.forEach(receiver => {
        if (socket.userId == receiver) {
            io.to(receiver).volatile.emit(messageEvents.SingleMessage,)
        }
    })

    // await Channel.findByIdAndUpdate(channelId, { $push: { messages: messageCreated._id } })
    // return

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

function addMembers(channelMembers) {
    channelMembers.map(channelMember => {
        const memberId = channelMember._id.toString()
        return memberId
    })
}
module.exports = {
    // getMessage,
    getMessages,
    createMessage,
    deleteMessage,
    searchMessages
}
