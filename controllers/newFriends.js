const User = require("../models/Users")
const events = {
    search: "search",
    displayNewChats: "displayNewChats",
}
const newChats = (socket) => {

    socket.on(events.search, async (searchValue) => {
        const { userId } = socket.decoded
        const newFriends = []
        try {
            const users = await User.find({ username: { $regex: searchValue, $options: 'i' } }).select(["username"])
            
            if(users){
                users.forEach((user) => {
                    if (user._id.toString() != userId) {
                        newFriends.push(user)
                    }
                })
            }
            socket.emit(events.displayNewChats, newFriends)
        } catch (err) {
            console.log(err)
        }
    })

}

module.exports = { newChats }