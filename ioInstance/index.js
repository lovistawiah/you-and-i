const io = require("socket.io")()
const { authenticateSocket } = require("../Middleware/userAuth")
const { getChannels, newChannel, offlineIndicator, typing } = require("../controllers/Channel")
const { createMessage, getMessages, createNewChannelMessage } = require("../controllers/messages")



io.use(authenticateSocket)
io.on("connection", (socket) => {
    socket.join(socket.decoded.userId)
    socket.userId = socket.decoded.userId
    offlineIndicator(io, socket)
    socket.on("disconnect", () => {
        console.log(socket.decoded.username)
    })

})


io.on("connection", (socket) => {
    //from controller/messages.js
    createMessage(io, socket)
    getMessages(socket)
    createNewChannelMessage(socket, io)
    typing(socket)
})
io.on("connection", (socket) => {
    //from controller/channel.js
    getChannels(socket)
    newChannel(socket)

})



module.exports = io