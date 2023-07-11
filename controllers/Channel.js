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

// return a list of new users who are not added to a channel for the user logged in
const newChannel = (socket) => {
    socket.on(channelEvents.search, async (searchValue) => {
        const { userId } = socket.decoded
        const newFriends = []
        let newFriend
        try {
        
            if (searchValue.includes("+") || searchValue.includes("-") || searchValue.includes("|") || searchValue.includes("\\") || searchValue.includes("=")){
                console.log(searchValue)
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
    offlineIndicator
}