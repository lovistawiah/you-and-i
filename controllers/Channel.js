const Channel = require("../models/Channel")
const User = require("../models/Users")

const channelEvents = {
    channelAndLastMessage: "channelAndLastMessage",
    addNewChat: "addNewChat",
    search: "search",
    displayNewChats: "displayNewChats"
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
        console.log(userInfo)
        const userNameAndLastMessage = []

        const channels = userInfo.channels
        channels.forEach(channel => {

            if (channel.length == 0) {
                console.log("no channel")
                return
            }

            let username
            // ? future: check for members length or check group channel name
            const memberArr = channel.members.filter(member => {
                // return the other user if a particular user is logged in
                return member._id.toString() != userId
            })
            //getting the last message of the channel whether private or public
            // check for undefined in client
            const lastMessage = channel.messages.pop()
            const usernames = memberArr.map(member => member.username)

            username = usernames[0]

            const channelsInfo = {
                username,
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
                return channel._id
            } else {
                const channel = await Channel.create({ members })
                members.forEach(async memberId => {
                    await User.findByIdAndUpdate(memberId, { $push: { channels: channel._id } })

                })
                return channel._id
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
            // console.log(newFriends)
            socket.emit(channelEvents.displayNewChats, newFriends)
        } catch (err) {
            console.log(err)
        }
    })

}

// const updateChannel = (req, res) => {
//     res.status(200).send("update a channel")
//     //only update group chat  --future use--
//     //change anything about the user should be done on the user.

// }

// const deleteChannel = async (req, res) => {

//     let message = ""
//     //when a user request to delete a group channel, remove the user's Id and modify the user's account to also remove the channel Id from the user's channel list
//     try {

//         // const { Id } = req.params
//         // const deletedChannel = await Channel.findByIdAndDelete(Id)
//         // res.status(200).send(deletedChannel)
//         message = "delete not aba"
//         res.status(200).send()
//     } catch (err) {
//         message = err.message
//         res.status(500).send(message)
//     }

// }



module.exports = {
    getChannel,
    newChannel,
    getChannels,
    createChannel,
}