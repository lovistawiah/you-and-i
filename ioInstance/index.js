const io = require("socket.io")()
const { authenticateSocket } = require("../Middleware/userAuth")
const { newChats } = require("../controllers/newFriends")

io.use(authenticateSocket)
io.on("connection", (socket) => {
    console.log(socket.id, "connect")
    console.log(socket.decoded.username)
    socket.on("disconnecting", () => {
        console.log(socket.id, "disconnecting")
    })
})


io.on("connection", (socket) => {
    //from newFriends.js
    newChats(socket)
})



module.exports = io