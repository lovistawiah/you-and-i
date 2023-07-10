const Channel = require("../models/Channel")
const User = require("../models/Users")

const channelEvents = {
    channelAndLastMessage: "channelAndLastMessage",
    addNewChat: "addNewChat",
    search: "search",
    displayNewChats: "displayNewChats"
}
const userEvents = {
    offline: "offline",
    online: "online"
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
        const userInfo = await User.findOne({ _id: userId }).populate([{
            path: 'channels',
            populate: {
                path: 'members',
                model: 'user'
            }
        }, {
            path: 'channels',
            populate: {
                path: 'messages',
                model: 'message'
            }
        }]).select(["channels"]).lean()

        const userNameAndLastMessage = []

        const channels = userInfo.channels
        channels.forEach(channel => {

            if (channel.length == 0) {

                return
            }


            // ? future: check for members length or check group channel name
            const memberArr = channel.members.filter(member => {
                // return the other user if a particular user is logged in
                return member._id.toString() != userId
            })
            //getting the last message of the channel whether private or public
            // check for undefined in client
            let lastMessage = channel.messages.pop()
            //modifying the last message
            lastMessage = {
                channelId: lastMessage.channelId,
                message: lastMessage.message,
                createdAt: lastMessage.createdAt,
                isDeleted: lastMessage.isDeleted,
                sender: lastMessage.sender
            }

            const userInfoArr = memberArr.map(member => {
                return {
                    userId: member._id,
                    username: member.username
                }
            })
            const userInfo = userInfoArr[0]
            const channelsInfo = {
                userInfo,
                lastMessage
            }
            userNameAndLastMessage.push(channelsInfo)
            socket.emit(channelEvents.channelAndLastMessage, userNameAndLastMessage)
        })


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
        if (members.length == 2) {
            const channel = await Channel.findOne({ members: { $in: members } })
            if (channel) {
                return {
                    channelId: channel._id,
                    channelMembers: channel.members
                }
            } else {
                const channel = await Channel.create({ members })
                members.forEach(async memberId => {
                    await User.findByIdAndUpdate(memberId, { $push: { channels: channel._id } })

                })
                return {
                    channelId: channel._id,
                    channelMembers: channel.members
                }
            }
        }
    } catch (err) {
        console.log(err)
    }
}
// DEBUG: 

// return a list of new users who are not added to a channel for the user logged in
const newChannel = (socket) => {
    socket.on(channelEvents.search, async (searchValue) => {
        const { userId } = socket.decoded
        const newFriends = []
        let newFriend
        try {
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
    // FIXME: fix the offline indicator function
    socket.on("disconnect", async () => {
        const { userId } = socket.decoded
        console.log(userId, "disconnect")

        const allChannels = await Channel.find({ members: { $in: userId } })
        allChannels.forEach(channel => {
            channel.members.forEach(member => {
                if (member._id.toString() != userId) otherMembers.push(member._id)
            })
        })
// TODO: add any avatar api to make users have dp.
        socket.leave(userId)

        otherMembers.forEach(member => {
            io.to(member).emit(userEvents.offline, `${userId} is offline`)
        })
    })

}

async function onlineIndicator(socket, io) {
    const otherMembers = []
    if (socket.connected) {
        const { userId,username } = socket.decoded
        const allChannels = await Channel.find({ members: { $in: userId } })
        allChannels.forEach(channel => {
            channel.members.forEach(member => {
                console.log(member._id.toString())
                if (member._id.toString() != userId) otherMembers.push(member._id.toString())
            })
        })
        console.log(otherMembers)
        otherMembers.forEach(member => {
            io.to(member).emit(userEvents.online, `${username} is online`)
        })
    }
}

module.exports = {
    getChannel,
    newChannel,
    getChannels,
    createChannel,
    onlineIndicator,
    offlineIndicator
}