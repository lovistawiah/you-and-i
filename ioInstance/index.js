const io = require("socket.io")()
const { authenticateSocket } = require("../Middleware/userAuth")
const { getChannels, newChannel } = require("../controllers/Channel")
const { createMessage } = require("../controllers/messages")


io.use(authenticateSocket)
io.on("connection", (socket) => {
    console.log(socket.decoded.userId, "connected")
    console.log(socket.decoded.username)

    socket.on("disconnecting", () => {
        console.log(socket.decoded.username, "disconnecting")
    })
})


io.on("connection", (socket) => {
    //from controller/messages.js
    createMessage(socket)
})
io.on("connection", (socket) => {
    //from controller/channel.js
    getChannels(socket)
    newChannel(socket)
})



module.exports = io