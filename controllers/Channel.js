const Channel = require("../models/Channel")
const User = require("../models/Users")

//TODO:
// GET CHANNEL AND LAST MESSAGE
//GET SINGLE CHANNEL
// POST CHANNEL, THUS ADD FRIEND OR CREATE GROUP
// DELETE GROUP



const getChannels = async (req, res) => {
    let message = ""
    //?userId fetches all channels (private && public) belonging to the logged user
    try {
        //userId comes the middleware userAuth.js
        const { userId } = req.user
        const userInfo = await User.findOne({ _id: userId }).populate([{
            path: 'channels',
            populate: {
                path: 'privateChannel.members',
                model: 'user'
            }
        }, {
            path: 'channels',
            populate: {
                path: 'messages',
                model: 'message'
            }
        }]).select(["channels"]).lean()
        //channel's last message 
        // const channelName = userInfo

        const userNameAndLastMessage = []
        const channels = userInfo.channels
        channels.forEach(channel => {
            let userName
            // ? future: check for members length or check group channel name
            const memberArr = channel.privateChannel.members.filter(member => {
                // return the other user if a particular user is logged in
                return member._id != req.user.userId
            })
            //getting the last message of the channel whether private or public
            // check for undefined in client
            const lastMessage = channel.messages.pop()
            const usernames = memberArr.map(member => member.username)

            userName = usernames[0]

            const channelsInfo = {
                userName,
                lastMessage
            }

            userNameAndLastMessage.push(channelsInfo)
        })
        message = "ok"
        res.status(200).json({ message, userNameAndLastMessage })
    } catch (err) {
        message = err.message
        console.log(message)
        res.status(500).send(message)
    }
}

const getChannel = async (req, res) => {
    // const { Id } = req.params
    // const oneChannel = await Channel.findById(Id)
    res.status(200).send("oneChannel")
}


const createChannel = async (req, res) => {
    let message = ""
    //pass created channel info this var 👇
    let channelCreated
    let ChannelExists
    try {
        let { member, channelName } = req.body
        //using the userId stored in the 
        const userId = req.user.userId
        const members = [userId, member]
        console.log(members)
        
        //for private channels
        // if (members.length == 2) {
        //     const channels = await Channel.find({}).populate({
        //         path: 'privateChannel'
        //     })
        //     for (let i = 0; i < channels.length; i++) {

        //         const MembersArray = channels[i].privateChannel.members
        //         ChannelExists = members.toString() == MembersArray.toString()
        //     }
        // }

        // if (ChannelExists) {
        //     message = "Channel already exists"
        //     res.status(400).json({ message })
        //     return
        // }
        // if (members.length != 2 & !channelName) {
        //     message = "group name not provided"
        //     res.status(400).send(message)
        //     return
        // } else {
        //     // creates private channel
        //     channelCreated = await Channel.create({
        //         privateChannel: {
        //             members
        //         }
        //     })
        // }
        // for (let i = 0; i < members.length; i++) {
        //     const id = members[i]
        //     const updateUserChannel = await User.findByIdAndUpdate({ _id: id }, { $push: { channels: channelCreated._id } }, { new: true }).lean()
        //     if (!updateUserChannel) {
        //         res.status(400).send("user not found")
        //         return
        //     }
        // }

        message = "channel add successfully"
        res.status(200).json({ message })
        return
    } catch (err) {
        message = err.message
        res.status(500).json({ message })
    }
}
const updateChannel = (req, res) => {
    res.status(200).send("update a channel")
    //only update group chat  --future use--
    //change anything about the user should be done on the user.

}

const deleteChannel = async (req, res) => {

    let message = ""
    //when a user request to delete a group channel, remove the user's Id and modify the user's account to also remove the channel Id from the user's channel list
    try {

        // const { Id } = req.params
        // const deletedChannel = await Channel.findByIdAndDelete(Id)
        // res.status(200).send(deletedChannel)
        message = "delete not aba"
        res.status(200).send()
    } catch (err) {
        message = err.message
        res.status(500).send(message)
    }

}



module.exports = {
    getChannel,
    getChannels,
    createChannel,
    updateChannel,
    deleteChannel
}