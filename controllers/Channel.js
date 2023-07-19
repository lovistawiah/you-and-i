const Channel = require("../models/Channel")
const User = require("../models/Users")

const channelEvents = {
    channelAndLastMessage: "channelAndLastMessage",
    addNewChat: "addNewChat",
    search: "search",
    displayNewChats: "displayNewChats",
}
const userEvents = {
    status: "status",
    typing: "typing"
}

//TODO:
// GET CHANNEL AND LAST MESSAGE
//GET SINGLE CHANNEL
// POST CHANNEL, THUS ADD FRIEND OR CREATE GROUP
// DELETE GROUP



const getChannels = async (socket) => {
    let message = ""
    try {
        //userId comes the middleware userAuth.js
        const { userId } = socket.decoded
        const userChannels = await Channel.find({ members: { $in: userId } }).populate([{
            path: 'members',
            model: 'user'
        }, {
            path: 'messages',
            model: 'message'
        }]).select(["members", "messages"])

        if (userChannels.length == 0) return
        const channelAndLastMessage = []
        userChannels.forEach(channel => {
            const { members, messages } = channel
            members.forEach(member => {
                if (member._id.toString() != userId) {

                    const userInfo = {
                        userId: member._id,
                        username: member.username,
                    }

                    const channelInfo = {
                        channelId: channel._id
                    }

                    const lastMessageDetails = messages.pop()
                    // if (lastMessageDetails.isDeleted) {
                    //     lastMessageDetails.message = "this message was deleted"
                    // }

                    const messageInfo = {
                        // the content of the last message of the channel
                        lastMessage: lastMessageDetails.message,
                        sender: lastMessageDetails.sender,
                        createdAt: lastMessageDetails.createdAt
                    }

                    channelAndLastMessage.push({
                        channelInfo,
                        userInfo,
                        messageInfo
                    })

                }
            })
        })
        socket.emit(channelEvents.channelAndLastMessage, channelAndLastMessage)

    } catch (err) {
        message = err.message
        console.log(message)
    }
}

const getChannel = async (req, res) => {
    res.status(200).send("oneChannel")
}


const createChannel = async (members) => {
    try {
        const createdChannel = await Channel.findOne({ members: members })
        if (createdChannel) {
            return {
                channelId: createdChannel._id,
                channelMembers: createdChannel.members
            }
        }

        const newChannelCreated = await Channel.create({ members })
        if (!newChannelCreated) return

        newChannelCreated.members.forEach(async member => {
            await User.findByIdAndUpdate(member._id, { $push: { channels: newChannelCreated._id } })
        })

        return {
            channelId: newChannelCreated._id,
            channelMembers: newChannelCreated.members
        }

    } catch (err) {
        console.log(err)
    }
}

const findChannel = async (channelId) => {
    try {
        const findChannel = await Channel.findById(channelId)
        if (!findChannel) return

        return findChannel.members
    } catch (err) {
        console.log(err)
    }
}



// return a list of new users who are not added to a channel for the user logged in
const newChannel = (socket) => {
    socket.on(channelEvents.search, async (searchValue) => {
        const { userId } = socket.decoded
        const newFriends = []
        let newFriend
        try {

            if (searchValue.includes("+") || searchValue.includes("-") || searchValue.includes("|") || searchValue.includes("\\") || searchValue.includes("=")) {
                return
            }
            const loggedUser = await User.findById(userId).populate({
                path: 'channels',
                populate: { path: 'members', model: 'user' }
            }).select("channels")

            const loggedInUserMembers = new Set()
            loggedUser.channels.forEach(channel => {
                channel.members.forEach(member => loggedInUserMembers.add(member._id.toString()))
            })
            // query the user searched for 
            const userNotMembersInChannels = await User.find({
                // username:{$regex:{}}
                _id: { $ne: userId },
                _id: { $nin: Array.from(loggedInUserMembers) }
            })
            console.log(userNotMembersInChannels)
            socket.emit(channelEvents.displayNewChats, newFriends)
        } catch (err) {
            console.log(err)
        }
    })

}

async function offlineIndicator(io, socket) {
    try {
        const { userId } = socket.decoded
        socket.on("disconnect", async () => {
            const status = new Date()
            await User.findByIdAndUpdate(userId, { lastSeen: status })
            const channels = await Channel.find({ members: { $in: userId } })
            channels.forEach(channel => {
                const members = channel.members
                members.forEach(member => {
                    const memberId = member._id.toString()
                    if (memberId != userId) {
                        io.to(memberId).emit(userEvents.status, { userId, status })
                    }
                })
            })
        })
    } catch (err) {
        console.log(err)
    }
}

const onlineIndicator = async (socket, io) => {
    try {
        const status = "online"
        const { userId } = socket.decoded
        await User.findByIdAndUpdate(userId, { lastSeen: status })
    } catch (err) {
        console.log(err)
    }
}

const askUserStatus = (socket) => {
    socket.on(userEvents.status, async (data) => {
        const userId = data
        const userFound = await User.findById(userId)
        if (!userFound) return

        const status = userFound.lastSeen
        socket.emit(userEvents.status, { status, userId })
    })
}

const typing = (socket) => {
    socket.on(userEvents.typing, async (data) => {
        try {
            let receiver
            const channelId = data
            const channelMembers = await findChannel(channelId)
            if (!channelMembers) return

            channelMembers.forEach(member => {
                if (member._id.toString() != socket.userId) {
                    receiver = member._id.toString()
                }
            })
            const message = "typing..."
            socket.to(receiver).emit(userEvents.typing, { message, channelId })
        } catch (err) {
            console.log(err)
        }
    })

}



module.exports = {
    getChannel,
    newChannel,
    getChannels,
    createChannel,
    findChannel,
    offlineIndicator,
    onlineIndicator,
    askUserStatus,
    typing
}