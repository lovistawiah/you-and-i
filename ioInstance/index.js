const io = require("socket.io")()
const { authenticateSocket } = require("../Middleware/userAuth")

io.use(authenticateSocket)
io.on("connection", (socket) => {
    console.log(socket.id, "connect")
    console.log(socket.decoded.username)
})


io.on("connection", (socket) => {

})



module.exports = io