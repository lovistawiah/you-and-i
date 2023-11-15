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

const getMessages = (socket) => {
    socket.on(messageEvents.displayChannelAllMessages, async (arg,callback) => {
        //using the channelId to retrieve the all the messages in a particular channel
        try {
            const channelId = arg
            console.log(channelId)
            const channelMessages = await Channel.findOne({ _id: channelId }).populate({
                path: 'messages'
            })
            const messages = []
            channelMessages.messages.forEach(messageData => {
                let { isDeleted, message, sender, createdAt,_id } = messageData

                if (isDeleted) {
                    message = "this message was deleted"
                }
                messages.push({
                    _id,
                    message,
                    sender,
                    createdAt
                })

            })
            callback(messages)
        } catch (error) {
            console.log(error)
        }
    })
}


const createMessage = async (io, socket) => {
    const loggedUserId = socket.decoded.userId
    let messageReceivers = []
    socket.on(messageEvents.sendMessage, async ({ message, channelId }) => {
        try {
            const channelMembers = await findChannel(channelId)
            if (!channelMembers) return
            messageReceivers = addMembers(channelMembers)
            addMessage(channelId, loggedUserId, message, messageReceivers, socket, io)
            return
        } catch (err) {
            console.log(err)
        }
    })

}

function createNewChannelMessage(socket, io) {
    const loggedUserId = socket.decoded.userId
    let messageReceivers = []
    socket.on(messageEvents.newChannelMessage, async ({ userId, message }) => {
        // userId is the other user's Id that appears on the page.
        const members = [loggedUserId, userId]

        const { channelId, channelMembers } = await createChannel(members)
        if (!channelId || !channelMembers) {
            return
        }
        messageReceivers = addMembers(channelMembers)
        addNewMessage(channelId, loggedUserId, message, messageReceivers, socket, io)
        return
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

function addMembers(channelMembers) {
    const members = channelMembers.map(channelMember => {
        const memberId = channelMember._id.toString()
        return memberId
    })
    return members
}


async function addMessage(channelId, loggedUserId, message, messageReceivers,  io) {

    const messageCreated = await Messages.create({
        channelId,
        sender: loggedUserId,
        message
    })

    let { sender, createdAt } = messageCreated

    const messageEdited = {
        message: messageCreated.message,
        sender,
        createdAt,
        channelId
    }
    messageReceivers.forEach(receiver => {
        io.to(receiver).emit(messageEvents.SingleMessage, messageEdited)

    })
    await Channel.findByIdAndUpdate(channelId, { $push: { messages: messageCreated._id } })
}

async function addNewMessage(channelId, loggedUserId, message, messageReceivers, socket, io) {
    let receiver

    messageReceivers.forEach(msgReceiver => {
        if (msgReceiver != loggedUserId) {
            receiver = msgReceiver
        }
    })

    const messageCreated = await Messages.create({
        channelId,
        sender: loggedUserId,
        message
    })

    let { sender, createdAt } = messageCreated

    const messageEdited = {
        message: messageCreated.message,
        sender,
        createdAt,
        channelId,
        receiver
    }

    messageReceivers.forEach(receiver => {
        io.to(receiver).emit(messageEvents.newChannelMessage, messageEdited)
    })
    await Channel.findByIdAndUpdate(channelId, { $push: { messages: messageCreated._id } })
}
module.exports = {
    // getMessage,
    getMessages,
    createMessage,
    deleteMessage,
    searchMessages,
    createNewChannelMessage
}
