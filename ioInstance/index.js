const io = require("socket.io")()
const { authenticateSocket } = require("../Middleware/userAuth")
const { getChannels, newChannel, offlineIndicator } = require("../controllers/Channel")
const { createMessage, getMessages } = require("../controllers/messages")



io.use(authenticateSocket)
io.on("connection", (socket) => {
    // console.log(socket.decoded.username)
    // socket.join(socket.decoded.userId)
    socket.userId = socket.decoded.userId
    offlineIndicator(io, socket)
})


io.on("connection", (socket) => {
    //from controller/messages.js
    createMessage(io, socket)
    getMessages(socket)
})
io.on("connection", (socket) => {
    //from controller/channel.js
    getChannels(socket)
    newChannel(socket)

})



module.exports = io