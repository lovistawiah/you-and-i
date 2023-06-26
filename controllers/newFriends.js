
const User = require("../models/Users")

const newFriends = async (req, res) => {
    // display users that you are not in membership with them or check for userId in members array of all the channels and filter the ones not in members
    try {
        const users = await User.find({})
            .populate({
                path: 'channels',
                populate: {
                    path: 'privateChannel',
                    model: 'user'
                }
            }).select(["username", "channels"])

        users.forEach(user => {
            const username = user.username
            const channels = user.channels
            return {
                username,
                channels,
            }
        })

        let newFriendsList = []
        const loggedUserId = req.user.userId

        for (let i = 0; i < users.length; i++) {
            const { _id, username, channels } = users[i]

            if (channels.length == 0 && _id != loggedUserId) {
                newFriendsList.push({ _id, username })
            }

            if (channels.length > 0) {
                channels.forEach(channel => {
                    if (channel.privateChannel) {
                        const members = channel.privateChannel.members
                        if (!members.includes(loggedUserId) && _id != loggedUserId) {
                            console.log(_id, username)
                            newFriendsList.push({ _id, username })
                        }
                    }
                })
            }
        }
        res.status(200).json({ newFriendsList })
    } catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports = { newFriends }