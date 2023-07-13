const Channel = require("../models/Channel")
const User = require("../models/Users")

const channelEvents = {
    channelAndLastMessage: "channelAndLastMessage",
    addNewChat: "addNewChat",
    search: "search",
    displayNewChats: "displayNewChats"
}
const userEvents = {
    status: "status"
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
                    if (lastMessageDetails.isDeleted) {
                        lastMessageDetails.message = "this message was deleted"
                    }

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
        const createdChannel = await Channel.find({ members: members })
        if (createdChannel) {
            return {
                channelId: createdChannel._id,
                channelMembers: createdChannel.members
            }
        } else {
            const newChannelCreated = await Channel.create(members)
            if (newChannelCreated) {
                return {
                    channelId: newChannelCreated._id,
                    channelMembers: newChannelCreated.members
                }
            }
        }
    } catch (err) {
        console.log(err)
    }
}

const findChannel = async (channelId) => {
    try {
        const findChannel = await Channel.findById(channelId)
        if (findChannel) {
            return findChannel.members
        } else {
            return null
        }
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

            let users = await User.find({ username: { $regex: searchValue, $options: 'i' } }).populate([{
                path: 'channels'
            }]).select(["username", "channels"])
            users.forEach(user => {
                if (user.channels.length == 0 && user._id != userId) {
                    let newFriend = {
                        userId: user._id,
                        username: user.username
                    }
                    newFriends.push(newFriend)

                } else if (user.channels.length > 0) {
                    user.channels.forEach(channel => {
                        const members = channel.members
                        if (!members.includes(userId) && user._id != userId) {
                            newFriend = {
                                userId: user._id,
                                username: user.username
                            }
                            newFriends.push(newFriend)
                        }
                    })
                }

            })
            socket.emit(channelEvents.displayNewChats, newFriends)
        } catch (err) {
            console.log(err)
        }
    })

}

async function offlineIndicator(io, socket) {
    const otherMembers = []
    let status

    try {
        const { userId } = socket.decoded
        const allChannels = await Channel.find({ members: { $in: userId } })
        allChannels.forEach(channel => {
            channel.members.forEach(member => {
                if (member._id.toString() != userId) otherMembers.push(member._id)
            })
        })
        // TODO: add any avatar api to make users have dp.
        // handling offline
        socket.on("disconnect", async () => {
            console.log(userId, "disconnect")
            socket.leave(userId)
            status = new Date()

            otherMembers.forEach(member => {
                io.volatile.to(member).emit(userEvents.status, { status, userId })
            })
            await User.findByIdAndUpdate(userId, { lastSeen: status })
        })
        //handling online 
        socket.on(userEvents.status, async (data) => {
            status = data

            otherMembers.forEach(member => {
                io.volatile.to(member).emit(userEvents.status, { status, userId })
            })
            await User.findByIdAndUpdate(userId, { lastSeen: status })

        })

    } catch (err) {
        console.log(err)
    }
}



module.exports = {
    getChannel,
    newChannel,
    getChannels,
    createChannel,
    findChannel,
    offlineIndicator
}